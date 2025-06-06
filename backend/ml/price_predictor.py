import sys
import json
import pandas as pd
import numpy as np
import warnings
from xgboost import XGBRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_percentage_error
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Input
from tensorflow.keras.optimizers import Adam

warnings.filterwarnings("ignore")


def fill_zeros_with_next(prices):
    prices_list = list(prices.items())
    filled = []
    next_valid = None
    for i in reversed(range(len(prices_list))):
        date, price = prices_list[i]
        price = float(price)
        if price != 0:
            next_valid = price
        elif next_valid is not None:
            price = next_valid
        filled.append((date, price))
    filled.reverse()
    return dict(filled)


def get_trend(series):
    if len(series) < 2:
        return 0.0
    X = np.arange(len(series)).reshape(-1, 1)
    y = np.array(series)
    model = LinearRegression().fit(X, y)
    return model.coef_[0]


def lstm_predict(prices_list):
    data = np.array(prices_list).reshape(-1, 1)
    if len(data) < 10:
        return None  # LSTM için yeterli veri yok

    X = []
    y = []
    for i in range(len(data) - 7):
        X.append(data[i:i+7])
        y.append(data[i+7])
    X, y = np.array(X), np.array(y)

    model = Sequential([
        Input(shape=(7, 1)),
        LSTM(32, activation='relu'),
        Dense(1)
    ])
    model.compile(optimizer=Adam(learning_rate=0.01), loss='mse')
    model.fit(X, y, epochs=50, verbose=0)

    last_seq = data[-7:].reshape(1, 7, 1)
    pred = model.predict(last_seq, verbose=0)[0][0]
    return float(pred)


def analyze_weekly(prices_dict):
    prices_dict = fill_zeros_with_next(prices_dict)
    sorted_items = sorted(prices_dict.items(), key=lambda x: pd.to_datetime(x[0], dayfirst=True))
    dates = [pd.to_datetime(date, dayfirst=True) for date, _ in sorted_items]
    values = [float(price) for _, price in sorted_items]
    df = pd.DataFrame({'date': dates, 'price': values})
    df['week'] = df['date'].dt.to_period('W').apply(lambda r: r.start_time)

    weekly_stats = df.groupby('week').agg(
        OrtalamaFiyat=('price', 'mean'),
        ZamSayisi=('price', lambda x: (np.diff(x) > 0).sum()),
        IndirimSayisi=('price', lambda x: (np.diff(x) < 0).sum()),
        OrtalamaZamYuzde=('price', lambda x: np.mean([(x.iloc[i+1] - x.iloc[i]) / x.iloc[i] * 100
                                                       for i in range(len(x)-1) if x.iloc[i+1] > x.iloc[i]])
                          if any(x.iloc[i+1] > x.iloc[i] for i in range(len(x)-1)) else 0.0),
        OrtalamaIndirimYuzde=('price', lambda x: np.mean([(x.iloc[i] - x.iloc[i+1]) / x.iloc[i] * 100
                                                           for i in range(len(x)-1) if x.iloc[i+1] < x.iloc[i]])
                              if any(x.iloc[i+1] < x.iloc[i] for i in range(len(x)-1)) else 0.0),
        FiyatVaryans=('price', 'std')
    ).reset_index()

    if len(weekly_stats) < 3:
        return {"error": "Yeterli haftalık veri yok"}

    weekly_stats['FiyatDegisimi'] = weekly_stats['OrtalamaFiyat'].pct_change().fillna(0)
    weekly_stats['Momentum'] = (weekly_stats['FiyatDegisimi'] > 0).astype(int).rolling(2).sum().fillna(0)
    weekly_stats['Volatilite'] = weekly_stats['OrtalamaZamYuzde'] + weekly_stats['OrtalamaIndirimYuzde']
    weekly_stats['Trend'] = get_trend(weekly_stats['OrtalamaFiyat'])

    features = [
        'OrtalamaFiyat', 'ZamSayisi', 'IndirimSayisi',
        'OrtalamaZamYuzde', 'OrtalamaIndirimYuzde',
        'FiyatDegisimi', 'Momentum', 'Volatilite',
        'FiyatVaryans', 'Trend'
    ]

    train_data = weekly_stats.iloc[:-1]
    test_data = weekly_stats.iloc[-1]

    X_train = train_data[features].iloc[:-1]
    y_train = train_data['OrtalamaFiyat'].shift(-1).dropna().values

    if len(X_train) != len(y_train):
        return {"error": "Veri uyumsuzluğu"}

    model = XGBRegressor(n_estimators=100)
    model.fit(X_train, y_train)

    X_test = test_data[features].values.reshape(1, -1)
    prediction_xgb = model.predict(X_test)[0]
    current = test_data['OrtalamaFiyat']
    delta = prediction_xgb - current
    percent = (delta / current) * 100

    y_true = train_data['OrtalamaFiyat'].iloc[1:].values
    y_pred = model.predict(X_train)
    mape = mean_absolute_percentage_error(y_true, y_pred) * 100
    yorum = (
        "Mükemmel" if mape < 5 else
        "İyi" if mape < 10 else
        "Kabul Edilebilir" if mape < 20 else
        "Zayıf"
    )

    # LSTM tahmini
    lstm_pred = lstm_predict(values)

    return {
        "mevcutFiyat": float(round(current, 2)),
        "tahminFiyat_XGB": float(round(prediction_xgb, 2)),
        "tahminFiyat_LSTM": float(round(lstm_pred, 2)) if lstm_pred else None,
        "yuzdeDegisim": float(round(percent, 2)),
        "yon": "Zam" if percent > 0.5 else "İndirim" if percent < -0.5 else "Aynı",
        "geriyeDonukMAPE": round(mape, 2),
        "modelBasari": yorum
    }


if __name__ == "__main__":
    raw_input = sys.stdin.read()
    prices = json.loads(raw_input)
    result = analyze_weekly(prices)
    sys.stdout.write(json.dumps(result))