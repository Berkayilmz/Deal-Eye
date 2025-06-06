import pandas as pd
import numpy as np
from datetime import datetime
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split

# Dosya yolu
input_path = "products.xlsx"
output_path = "tahmin-raporu.xlsx"

# Excel dosyasını oku
df = pd.read_excel(input_path)

# Tarih sütunlarını tanı
date_cols = [col for col in df.columns if "-" in str(col) or isinstance(col, datetime)]

# 0 olanları bir sonraki geçerli değerle doldur
def fill_zeros_with_next(prices):
    for i in range(len(prices)):
        if prices[i] == 0:
            for j in range(i + 1, len(prices)):
                if prices[j] != 0:
                    prices[i] = prices[j]
                    break
    return prices

# Haftalık analiz fonksiyonu
def analyze_price_trends(prices):
    result = []
    cleaned = []
    for p in prices:
        if isinstance(p, str):
            p = p.replace("₺", "").replace(",", ".").strip()
        try:
            cleaned.append(float(p))
        except:
            cleaned.append(0)

    weeks = [cleaned[i:i+7] for i in range(0, len(cleaned), 7)]

    for hafta in weeks:
        hafta = [p for p in hafta if p != 0]
        if len(hafta) < 2:
            result.append({"Ortalama": np.nan, "Zam": 0, "İndirim": 0})
            continue
        fiyatlar = np.array(hafta, dtype=np.float64)
        diff = np.diff(fiyatlar)
        result.append({
            "Ortalama": np.mean(fiyatlar),
            "Zam": np.sum(diff > 0),
            "İndirim": np.sum(diff < 0),
        })
    return result

# Eğitim verisini hazırla
records = []
for _, row in df.iterrows():
    fiyatlar = row[date_cols].fillna(0).values.tolist()
    fiyatlar = fill_zeros_with_next(fiyatlar)
    weekly_stats = analyze_price_trends(fiyatlar)

    if len(weekly_stats) < 5:
        continue

    haftalar = weekly_stats[:5]
    if any(pd.isna(h["Ortalama"]) for h in haftalar):
        continue

    current_avg = haftalar[3]["Ortalama"]
    future_avg = haftalar[4]["Ortalama"]

    if future_avg > current_avg:
        label = 2  # Zam
    elif future_avg < current_avg:
        label = 0  # İndirim
    else:
        label = 1  # Sabit

    record = {
        "id": row.get("id", None),
        "market": row.get("market", ""),
        "urun": row.get("urun", ""),
        "img": row.get("img", ""),
        "H1": haftalar[0]["Ortalama"],
        "H2": haftalar[1]["Ortalama"],
        "H3": haftalar[2]["Ortalama"],
        "H4": haftalar[3]["Ortalama"],
        "Current": current_avg,
        "Trend": label
    }
    records.append(record)

df_train = pd.DataFrame(records)

if df_train.empty:
    print("❌ Eğitim verisi oluşturulamadı. Yeterli veri yok.")
else:
    X = df_train[["H1", "H2", "H3", "H4", "Current"]]
    y = df_train["Trend"]

    # Eğitim ve tahmin
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = XGBClassifier(objective="multi:softmax", num_class=3, eval_metric="mlogloss")
    model.fit(X_train, y_train)

    df_train["Prediction"] = model.predict(X)
    df_train["Tahmin"] = df_train["Prediction"].map({0: "İndirim", 1: "Sabit", 2: "Zam"})

    # Excel'e yaz
    df_train.to_excel(output_path, index=False)
    print(f"✅ Tahmin raporu oluşturuldu: {output_path}")