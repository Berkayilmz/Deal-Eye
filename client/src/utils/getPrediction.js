export const getPrediction = async (prices) => {
    try {
      const response = await fetch('http://localhost:8000/api/predict/price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prices })
      })
  
      if (!response.ok) {
        throw new Error('Tahmin isteği başarısız')
      }
  
      const result = await response.json()
      return result
    } catch (error) {
      console.error('Tahmin API Hatası:', error.message)
      return null
    }
  }