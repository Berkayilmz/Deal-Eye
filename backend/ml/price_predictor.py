import sys
import json
import pandas as pd
import numpy as np
import warnings
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Input
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

def get_dynamic_threshold(price):
    if price < 20:
        return 10
    elif price < 50:
        return 7
    elif price < 100:
        return 5
    else:
        return 3

def lstm_predict(prices_list):
    data = np.array(prices_list).reshape(-1, 1)
    if len(data) < 14:
        return None

    scaler = MinMaxScaler()
    data_scaled = scaler.fit_transform(data)

    X, y = [], []
    for i in range(len(data_scaled) - 7):
        X.append(data_scaled[i:i + 7])
        y.append(data_scaled[i + 7])
    X, y = np.array(X), np.array(y)

    model = Sequential()
    model.add(Input(shape=(7, 1)))
    model.add(LSTM(64, activation='relu', return_sequences=True))
    model.add(Dropout(0.2))
    model.add(LSTM(32, activation='relu'))
    model.add(Dense(1))

    model.compile(optimizer=Adam(learning_rate=0.01), loss='mse')
    model.fit(X, y, epochs=50, verbose=0)

    last_seq = data_scaled[-7:].reshape(1, 7, 1)
    pred_scaled = model.predict(last_seq, verbose=0)[0][0]
    pred = scaler.inverse_transform([[pred_scaled]])[0][0]
    return float(pred)

def analyze_weekly(prices_dict):
    prices_dict = fill_zeros_with_next(prices_dict)
    sorted_items = sorted(prices_dict.items(), key=lambda x: pd.to_datetime(x[0], dayfirst=True))
    dates = [pd.to_datetime(date, dayfirst=True) for date, _ in sorted_items]
    values = [float(price) for _, price in sorted_items]

    df = pd.DataFrame({'date': dates, 'price': values})
    df['daily_diff'] = df['price'].diff().fillna(0)
    df['dayofweek'] = df['date'].dt.dayofweek
    df['month'] = df['date'].dt.month
    df['day_since_start'] = (df['date'] - df['date'].min()).dt.days
    df['price_rolling_mean'] = df['price'].rolling(window=7).mean().bfill()
    df['season'] = df['month'].apply(lambda x: (
        'ilkbahar' if x in [3, 4, 5] else
        'yaz' if x in [6, 7, 8] else
        'sonbahar' if x in [9, 10, 11] else
        'kış'
    ))

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
        FiyatVaryans=('price', 'std'),
        OrtalamaDailyDiff=('daily_diff', 'mean'),
        OrtalamaRolling=('price_rolling_mean', 'mean')
    ).reset_index()

    if len(weekly_stats) < 3:
        return {"error": "Yeterli haftalık veri yok"}

    weekly_stats['FiyatDegisimi'] = weekly_stats['OrtalamaFiyat'].pct_change().fillna(0)
    weekly_stats['Momentum'] = (weekly_stats['FiyatDegisimi'] > 0).astype(int).rolling(2).sum().fillna(0)
    weekly_stats['Volatilite'] = weekly_stats['OrtalamaZamYuzde'] + weekly_stats['OrtalamaIndirimYuzde']
    weekly_stats['Trend'] = get_trend(weekly_stats['OrtalamaFiyat'])

    current = weekly_stats.iloc[-1]['OrtalamaFiyat']
    lstm_pred = lstm_predict(values)
    if lstm_pred is None:
        return {"error": "LSTM için yeterli veri yok"}

    delta = lstm_pred - current
    percent = (delta / current) * 100

    threshold = get_dynamic_threshold(current)
    if percent > threshold:
        yon = "Zam"
    elif percent < -threshold:
        yon = "İndirim"
    else:
        yon = "Aynı"

    return {
        "mevcutFiyat": float(round(current, 2)),
        "tahminFiyat_LSTM": float(round(lstm_pred, 2)),
        "yuzdeDegisim": float(round(percent, 2)),
        "yon": yon
    }

if __name__ == "__main__":
    raw_input = sys.stdin.read()
    prices = json.loads(raw_input)
    result = analyze_weekly(prices)
    sys.stdout.write(json.dumps(result))