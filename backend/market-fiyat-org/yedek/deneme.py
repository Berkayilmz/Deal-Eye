from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

from datetime import datetime
import time
import pandas as pd
import os
import json

# Tarayıcı ayarları
options = webdriver.ChromeOptions()
browser = webdriver.Chrome(options=options)
browser.maximize_window()
wait = WebDriverWait(browser, 5)

URL = "https://marketfiyati.org.tr/kategori/Meyve%20ve%20Sebze"
browser.get(URL)
time.sleep(2)

browser.find_element(By.CSS_SELECTOR, "#address").send_keys("İYAŞ PARK AVM")
first_option = WebDriverWait(browser, 5).until(
    EC.visibility_of_element_located((By.CSS_SELECTOR, ".dropdown-item"))
)
first_option.click()
time.sleep(2)

browser.find_element(By.CSS_SELECTOR, "#mf-id-13").click()
time.sleep(1)

target = browser.find_element(By.CSS_SELECTOR, "#mf-id-24")
browser.execute_script("arguments[0].scrollIntoView(true);", target)
ActionChains(browser).move_to_element(target).click().perform()
time.sleep(2)

browser.find_element(By.CSS_SELECTOR, "#mf-id-14").click()
time.sleep(2)

# Veri toplama
products_data = []
today = datetime.today().strftime("%d-%m-%Y")

def extract_products(market_name):
    products = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "tubitak-product-summary")))
    for i, product in enumerate(products, start=1):
        try:
            browser.execute_script("arguments[0].scrollIntoView(true);", product)
            time.sleep(0.3)

            try:
                img = product.find_element(By.CSS_SELECTOR, "div.image-container img").get_attribute("src")
            except:
                img = ""
            try:
                title = product.find_element(By.CSS_SELECTOR, "h2.product-name").get_attribute("title")
            except:
                title = ""

            price = ""
            try:
                price_elem = WebDriverWait(product, 5).until(
                    EC.visibility_of_element_located((By.CSS_SELECTOR, "div.product-price span.fw-bold"))
                )
                price = price_elem.text.strip()
            except:
                try:
                    price_div = product.find_element(By.CSS_SELECTOR, "div.product-price")
                    price = price_div.find_element(By.TAG_NAME, "span").text.strip()
                except:
                    try:
                        price = product.find_element(By.CSS_SELECTOR, "div.product-price").text.split("\n")[0].strip()
                    except Exception as e:
                        print(f"⚠️ Fiyat çekilemedi: {e}")
                        price = ""

            if title and not any(p["market"] == market_name and p["urun"] == title for p in products_data):
                print(f"🔹 [{market_name}] Ürün {i}: {title} | {price}")
                products_data.append({
                    "market": market_name,
                    "urun": title,
                    "img": img,
                    today: price
                })

        except Exception as e:
            print(f"❌ Ürün hatası: {e}")

# Market filtre değerleri
market_values = ["migros", "a101", "carrefour", "sok", "hakmar", "bim", "tarim_kredi"]

for i, market_value in enumerate(market_values, start=1):
    try:
        print(f"\n🔄 {i}. market ({market_value}) işleniyor...")
        browser.get(URL)
        time.sleep(2)

        checkbox = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, f"input[type='checkbox'][value='{market_value}']")))
        browser.execute_script("arguments[0].scrollIntoView({block: 'center'});", checkbox)
        time.sleep(0.5)
        browser.execute_script("arguments[0].click();", checkbox)
        time.sleep(2)

        sayfa = 1
        while True:
            print(f"📄 {sayfa}. sayfa ürünleri:")
            extract_products(market_value)

            try:
                next_button = browser.find_element(By.CSS_SELECTOR, "li.pagination-next.ng-star-inserted")
                if "disabled" in next_button.get_attribute("class"):
                    break
                next_link = next_button.find_element(By.TAG_NAME, "a")
                browser.execute_script("arguments[0].click();", next_link)
                sayfa += 1
                time.sleep(2)
            except Exception as e:
                print("❌ Sayfa geçiş hatası:", e)
                break

    except Exception as e:
        print(f"❌ {market_value} marketinde hata: {e}")

browser.quit()

# 📁 Dosya yolları
excel_path = "products.xlsx"
json_path = "products.json"

# --- Excel Güncelle ---
if os.path.exists(excel_path):
    df = pd.read_excel(excel_path)
    for row in products_data:
        match = (df["market"] == row["market"]) & (df["urun"] == row["urun"])
        if df[match].shape[0] > 0:
            df.loc[match, today] = row[today]
        else:
            df = pd.concat([df, pd.DataFrame([row])], ignore_index=True)
else:
    df = pd.DataFrame(products_data)

df.fillna(0, inplace=True)
df.to_excel(excel_path, index=False)
print("✅ Veriler Excel'e kaydedildi: products.xlsx")

# --- JSON Güncelle ---
if os.path.exists(json_path):
    with open(json_path, "r", encoding="utf-8") as f:
        json_data = json.load(f)
else:
    json_data = []

existing_ids = [item.get("urunId", 0) for item in json_data]
next_id = max(existing_ids, default=0) + 1

for row in products_data:
    existing = next((item for item in json_data if item["market"] == row["market"] and item["urun"] == row["urun"]), None)
    price_value = row[today].replace("₺", "").replace(",", ".").strip()
    try:
        price_value = float(price_value)
    except:
        price_value = 0

    if existing:
        existing["prices"][today] = price_value
    else:
        json_data.append({
            "urunId": next_id,
            "market": row["market"],
            "urun": row["urun"],
            "img": row["img"],
            "prices": {
                today: price_value
            }
        })
        next_id += 1

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(json_data, f, ensure_ascii=False, indent=2)

print("✅ Veriler JSON'a kaydedildi: products.json")