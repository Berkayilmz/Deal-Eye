const { spawn } = require('child_process');
const path = require('path');

exports.predictPriceTrend = async (req, res) => {
  try {
    console.log("📦 Gelen prices:", req.body.prices);
    const prices = req.body.prices;
    if (!prices || typeof prices !== 'object') {
      return res.status(400).json({ error: 'Geçersiz price verisi' });
    }

    const scriptPath = path.join(__dirname, '..', 'ml', 'price_predictor.py');
    const py = spawn('python', [scriptPath]);

    let result = '';
    py.stdin.write(JSON.stringify(prices));
    py.stdin.end();

    py.stdout.on('data', data => {
      result += data.toString();
    });

    py.stderr.on('data', data => {
      console.error('stderr:', data.toString());
    });

    py.on('close', code => {
      console.log('Tahmin sonucu:', result);
      try {
        const parsed = JSON.parse(result);
        res.json(parsed);
      } catch (err) {
        console.error('Tahmin sonucu parse edilemedi:', err);
        res.status(500).json({ error: 'Tahmin yapılamadı' });
      }
    });

  } catch (err) {
    console.error('Sunucu hatası:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};