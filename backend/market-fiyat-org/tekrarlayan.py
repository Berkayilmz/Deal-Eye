import pandas as pd

# Excel dosyasını oku
df = pd.read_excel("urunler.xlsx")

# "market" ve "urun" sütunlarına göre tekrar edenleri sil (ilkini tutar)
df_cleaned = df.drop_duplicates(subset=["market", "urun"], keep="first")

# Temizlenmiş veriyi aynı dosyaya yaz
df_cleaned.to_excel("urunler.xlsx", index=False)

print("✅ Tekrar eden satırlar silindi ve dosya güncellendi.")