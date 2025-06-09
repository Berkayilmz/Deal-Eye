# 🍎 Deal-Eye: Market Fiyat Takip ve Tahmin Sistemi

## 🎓 Bitirme Projesi – 2025

**Deal-Eye**, marketfiyati üzerinden fiyat verisi toplayarak, geçmişe dayalı analiz ve geleceğe yönelik tahmin yapan, verileri MongoDB’de saklayan ve kullanıcıya modern bir arayüzle sunan **tam entegre bir piyasa izleme ve öngörü platformudur**.

---

## 📦 Proje Bileşenleri

### 1. 🔸 Veri Toplama – Selenium ile Web Scraping

- Kullanıcı lokasyonuna en yakın market seçilir.
- Sebze-meyve kategorisindeki ürünler filtrelenir.
- Ürün adı, fiyat ve görsel verileri alınır.
- Tüm sayfalarda gezinilerek tam liste elde edilir.
- Sonuçlar `products.json` ve `products.xlsx` olarak kaydedilir.
- Fiyat verisi olmayan ürünler için o günkü fiyat `0.0` olarak atanır.

---

### 2. 📊 Fiyat Tahmin Sistemi Entegrasyonu

Kullanıcı bir ürünün detay sayfasına girdiğinde, o ürünün geçmiş fiyat verileri kullanılarak **gelecek fiyat trendi** (zam/indirim/aynı kalır) tahmin edilir ve kullanıcıya grafiksel olarak sunulur.

---

### ⟳ Çalışma Akışı

1. **Frontend (React.js)**:  
   - Kullanıcı `/product/:id` sayfasını ziyaret eder.
   - Sayfa `useEffect` içinde `fetchProductById` fonksiyonu ile MongoDB'den ürün ve fiyat verilerini çeker.
   - `prices` objesi, JSON formatında `POST` isteğiyle backend API'sine (`/api/predict/price`) gönderilir.

2. **Backend (Express + Python)**:  
   - Express route, gelen isteği Python betiği `price_predictor.py`’a yönlendirir.
   - Python betiği:
     - Zam/İndirim Trend Analizi: Haftalık segmentlere ayrılmış veriler üzerinden geçmiş zam ve indirim oranları, fiyat varyansı ve haftalık ortalamalar hesaplanır
     - Eğilim ve Momentum: Ortalama fiyatlar üzerinden regresyonla genel trend çıkartılır; son iki haftadaki fiyat değişim ivmesi belirlenir
     - LSTM ile Tahmin: Son 14 günlük fiyat dizisi, LSTM modeline verilir ve gelecek haftaya ait fiyat tahmini yapılır

3. **Frontend Gösterimi**:
   - `Tahmin kutusu` bileşeni tahmin sonucunu alır ve arayüzde görüntüler.

---

### 📀 API İsteği Örneği

```json
POST /api/predict/price
Content-Type: application/json

{
  "prices": {
    "01-06-2025": 22.0,
    "02-06-2025": 22.5,
    "03-06-2025": 23.0
  }
}
```

---

### 🔢 Kullanılan Yöntemler

| Bileşen                | Teknoloji / Yöntem                        |
|------------------------|-------------------------------------------|
| Model Tipi             | LSTM (Long Short-Term Memory)             |
| Framework              | TensorFlow + Keras                        |
| Veri Ölçekleme         | MinMaxScaler                              |
| Trend Hesaplama        | Linear Regression (scikit-learn)          |
| Dinamik Eşik          | Fiyat bazlı yüzdelik eşik mantığı            |
| Tahmin Değerlendirme   | Yüzde Değişim, MAPE, Directional Accuracy  |
| API Arayüzü            | Express.js -> Python (child_process)      |
| Frontend Bağlantı     | Fetch                                     |

---

### 🔎 Ek Notlar

- Gelecekte tahmin doğruluklarının düzenli raporlanması için otomatik MAPE takibi entegre edilebilir.
- Daha gerçekçi tahmin için mevsimsellik ve ürün türü analizleri planlanabilir.

---

## 📃 Veritabanı – MongoDB

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
    "29-05-2025": 0.0
  }
}
```

Veriler, `Node.js` ve `Mongoose` ile MongoDB'ye yazılır ve güncellenir.

---

## 💻 Arayüz ve Teknolojiler

### 🔝 Kullanıcı Arayüzü – React.js (Vite)

Deal-Eye'in arayüzü modern ve kullanıcı dostu olacak şekilde React (Vite) framework'üyle geliştirilmektedir. Arayüz aşağıdaki özellikleri içerir:

- ⚡ **Hızlı ve reaktif yapı**: Vite ile optimize edilmiş geliştirme deneyimi
- 🎨 **Tasarım**: Tailwind CSS ile sade ve modern arayüz, Heroicons simge desteği
- 📊 **Grafikler**: Fiyat geçmişi ve tahmin grafikleri için Chart.js kullanımı
- 📱 **Responsive tasarım**: Tüm cihazlarda uyumlu ve mobil erişime uygun
- 🔍 **Sayfalar**:
  - **Ana Sayfa**: Tüm ürünleri listeler, arama ve kategori filtreleme
  - **Market Sayfası**: Seçilen markete ait ürünler görüntülenir
  - **Ürün Detay Sayfası**: Fiyat geçmişi grafikleri ve tahmin kutusu yer alır
- 🌐 **Veri bağlantısı**: API istekleri `fetch` ile backend üzerinden alınır

---

### 🔧 Kullanılan Teknolojiler

| Amaç                     | Teknoloji                      |
|--------------------------|-------------------------------|
| Frontend Framework       | React (Vite)                  |
| Stil & UI                | Tailwind CSS                  |
| Simge Seti               | Heroicons                     |
| Grafikler                | Chart.js                      |
| Backend API              | Node.js + Express             |
| Veritabanı               | MongoDB + Mongoose            |
| Web Scraping             | Python + Selenium             |
| Tahmin Modelleri         | XGBoost, Random Forest, Ridge, LSTM |
| Zaman Serisi Analizi     | TimeSeriesSplit (sklearn), LSTM |
| Model Değerlendirme      | MAE, MAPE, Directional Accuracy |
| Veri Dönüşümü & Temizleme| Pandas, NumPy                 |
| Dosya Formatları         | JSON, Excel (openpyxl)        |

---

## 📁 Klasör Yapısı (Özet)

```
Deal-Eye/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── market-fiyat-org/
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

# Terminal 1 - Backend başlat
cd backend
npm install
npm run dev

# Terminal 2 - Frontend başlat
cd client
npm install
npm run dev
```

---

## 👤 Geliştirici

**Berkay Yılmaz**  
Bitirme Projesi – Süleyman Demirel Üniversitesi  
Yıl: 2025

---

