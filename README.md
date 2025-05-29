# 🛒 Deal-Eye: Market Fiyat Takip ve Tahmin Sistemi

## 🎓 Bitirme Projesi – 2025

Deal-Eye, marketfiyati.org.tr üzerinden fiyat verisi toplayarak, geçmişe dayalı analiz ve geleceğe yönelik tahmin yapan, verileri MongoDB’de saklayarak kullanıcıya modern ve sade bir arayüzle sunan **tam entegre piyasa izleme ve öngörü platformudur**.

---

## 📦 Proje Bileşenleri

### 1. 🕸 Veri Toplama – `Selenium` ile Web Scraping
Market fiyat verileri `Selenium` ve `Python` kullanılarak aşağıdaki süreçle elde edilir:
- Kullanıcı lokasyonuna en yakın market seçilir.
- Sebze-meyve kategorisindeki ürünler filtrelenir.
- Ürün adı, fiyat ve görsel verileri alınır.
- Tüm sayfalarda gezinilerek tam liste elde edilir.
- Sonuçlar `products.json` ve `products.xlsx` olarak kaydedilir.
- Fiyat verisi olmayan ürünler için o günkü fiyat `0.0` olarak atanır.

---

### 2. 📊 Fiyat Tahmin Modülleri (Python)

#### 🔮 Günlük Tahmin (Daily Prediction)
- Girdi: Son 14 günlük fiyat
- Kullanılan Modeller: `XGBoost`, `Linear Regression`, `Polynomial Regression`
- MAE (mean absolute error) üzerinden ağırlıklı tahmin modeli

#### 📈 Zaman Serisi ile Günlük Tahmin
- Kayan pencere (`sliding window`) tekniği ile geçmiş 5 günü baz alır
- `TimeSeriesSplit` ile `XGBoost` modeli eğitilir
- MAE ve MAPE gibi metriklerle değerlendirme yapılır

#### 📅 Haftalık Zam/İndirim Tahmini
- Haftalık bazda ortalama fiyat, zam/indirim sayısı ve yüzdesi çıkarılır
- Tahmin modelleri:
  - Fiyat: `VotingRegressor` (XGBoost + Random Forest + Ridge)
  - Olasılık: `XGBClassifier`
- Çıktılar: Zam ihtimali, tahmini zam oranı, başarı skoru, sinyal vb.

---

## 🗃️ Veritabanı – MongoDB

Tüm ürünler ve fiyat geçmişi aşağıdaki yapıyla MongoDB'de saklanır:

```json
{
  "urunId": 101,
  "market": "Migros",
  "urun": "Domates",
  "img": "https://...",
  "prices": {
    "27-05-2025": 22.5,
    "28-05-2025": 22.9,
    "29-05-2025": 0.0  // veri yoksa 0.0 atanır
  }
}
```

Veritabanına veri aktarımı ve güncelleme işlemleri `Node.js` ile gerçekleştirilir.

---

## 🖥️ Arayüz – React.js (Vite)

Deal-Eye’in arayüzü **React** ile inşa edilmiştir:

- Modern kullanıcı deneyimi: `Tailwind CSS` + `Heroicons` + `Chart.js`
- Sayfalar:
  - Ana Sayfa: Ürün listesi, arama ve filtreleme
  - Market Sayfası: Sadece seçilen marketin ürünleri
  - Ürün Detay Sayfası: Fiyat geçmişi, grafik, tahmin kutusu
- API istekleri `fetch` ile backend’den çekilir
- Mobil uyumlu responsive tasarım

---

## 🔧 Teknolojiler

| Amaç                  | Teknoloji         |
|-----------------------|------------------|
| Frontend              | React (Vite)     |
| Stil & UI             | Tailwind CSS     |
| Grafikler             | Chart.js         |
| Backend API           | Node.js + Express|
| Database              | MongoDB (Mongoose) |
| Web scraping          | Python + Selenium|
| Tahmin modelleri      | XGBoost, Sklearn |
| JSON/Excel işleme     | Pandas, NumPy    |

---

## 📁 Klasör Yapısı (Özet)

```
Deal-Eye/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── market-fiyat-org/   ← JSON ve Excel dosyaları
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   └── index.html
│
└── README.md
```

---

## 🚀 Kurulum

```bash
git clone https://github.com/kullanici/deal-eye.git
cd deal-eye
npm install

# Terminal 1 - backend başlat
cd backend
npm install
npm run dev

# Terminal 2 - frontend başlat
cd client
npm install
npm run dev
```

---

## 👤 Geliştirici

**Berkay Yılmaz**  
Bitirme Projesi – Süleyman Demirel Üniversitesi  
Yıl: 2025