import pandas as pd
import json

# Excel dosyasını oku
df = pd.read_excel("products.xlsx")

# NaN olan hücreleri 0 ile doldur
df.fillna(0, inplace=True)

# JSON veri yapısını oluştur
json_data = []

for _, row in df.iterrows():
    product = {
        "urunId": int(row["urunId"]),
        "market": row["market"],
        "urun": row["urun"],
        "img": row["img"],
        "prices": {}
    }
    
    for col in df.columns:
        if col not in ["urunId", "market", "urun", "img"]:
            try:
                raw = str(row[col]).replace("₺", "").replace(",", ".").strip()
                price = float(raw)
            except:
                price = 0.0
            product["prices"][str(col)] = price

    json_data.append(product)

# JSON dosyasına yaz
with open("products.json", "w", encoding="utf-8") as f:
    json.dump(json_data, f, ensure_ascii=False, indent=2)

print("✅ JSON dosyası oluşturuldu: products.json")