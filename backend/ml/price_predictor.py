import sys
import json
import pandas as pd
import numpy as np
from xgboost import XGBRegressor

def analyze_weekly(prices_dict):
    
    # Tarihleri sırala ve fiyatları ayıkla
    sorted_items = sorted(prices_dict.items(), key=lambda x: pd.to_datetime(x[0], dayfirst=True))
    dates = [pd.to_datetime(date, dayfirst=True) for date, _ in sorted_items]
    values = [float(price) for _, price in sorted_items]

    df = pd.DataFrame({'date': dates, 'price': values})
    df = df[df['price'] > 0]
    df = df.set_index('date').resample('7D').mean().dropna().reset_index()

    if len(df) < 5:
        return {"error": "Yeterli veri yok"}

    X = []
    y = []
    for i in range(len(df) - 1):
        features = [
            df.iloc[i]['price'],
            df.iloc[i]['price'] - df.iloc[i-1]['price'] if i > 0 else 0,
        ]
        X.append(features)
        y.append(df.iloc[i+1]['price'])

    model = XGBRegressor(n_estimators=100)
    model.fit(X, y)
    last_features = [
        df.iloc[-1]['price'],
        df.iloc[-1]['price'] - df.iloc[-2]['price'],
    ]
    prediction = model.predict([last_features])[0]
    current = df.iloc[-1]['price']
    delta = prediction - current
    percent = (delta / current) * 100

    return {
        "mevcutFiyat": float(round(current, 2)),
        "tahminFiyat": float(round(prediction, 2)),
        "yuzdeDegisim": float(round(percent, 2)),
        "yon": "Zam" if percent > 0.5 else "İndirim" if percent < -0.5 else "Aynı"
    }

if __name__ == "__main__":
    raw_input = sys.stdin.read()
    prices = json.loads(raw_input)
    result = analyze_weekly(prices)
    print(json.dumps(result))