export const detectCategory = (urunAdi) => {
    const name = urunAdi.toLowerCase()
  
    if (name.includes('dond')) return 'Dondurulmuş'
    if (/(çiçek|orkide|saksı|gül)/.test(name)) return 'Çiçek'
    if (/(kaktüs|toprak|bitki|sulama|bahçe|torf|gübre)/.test(name)) return 'Bitki'
  
    const meyveler = [
      'elma', 'muz', 'portakal', 'mandalina', 'kavun', 'karpuz', 'armut', 'erik',
      'çilek', 'nar', 'avokado', 'kivi', 'greyfurt', 'yaban mersini', 'ananas',
      'şeftali', 'kayısı', 'vişne', 'üzüm', 'ayva', 'malta eriği', 'çileği'
    ]
  
    const sebzeler = [
      'patates', 'soğan', 'biber', 'domates', 'kabak', 'salatalık', 'roka', 'marul',
      'lahana', 'karnabahar', 'ıspanak', 'pırasa', 'bezelye', 'fasulye', 'bamya',
      'kereviz', 'turp', 'salata', 'yeşillik'
    ]
  
    const hasMeyve = meyveler.some(k => name.includes(k))
    const hasSebze = sebzeler.some(k => name.includes(k))
  
    if (hasMeyve && hasSebze) return 'Sebze'
    if (hasSebze) return 'Sebze'
    if (hasMeyve) return 'Meyve'
  
    return 'Diğer'
  }