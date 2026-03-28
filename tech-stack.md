# TarlaSor — Teknoloji Seçimi

## Kullanılan Teknolojiler

| Katman | Teknoloji | Neden Seçildi |
|---|---|---|
| Frontend | React + Tailwind CSS | Hızlı geliştirme, mobil uyumlu, bileşen bazlı yapı |
| AI | Gemini API (Google) | Ücretsiz, fotoğraf + metin destekli, Türkçe çıktı verebiliyor |
| Deploy | Lovable | GitHub'a bağlanıp tek tıkla yayınlama, ücretsiz plan yeterli |
| Versiyon Kontrol | GitHub | Tüm dosyaları saklamak ve teslim için |

---

## Neden Bu Teknolojiler?

**React + Tailwind CSS**
Bileşen bazlı çalıştığı için her ekran ayrı ayrı geliştirilebilir. Tailwind ile tasarım hızlı yapılır, mobil uyum kolaydır. Cursor bu ikiliyle çok iyi çalışır.

**Gemini API**
Hem metin hem fotoğraf girdisi destekliyor — TarlaSor'un iki temel giriş yöntemi bu. Google AI Studio'dan ücretsiz API anahtarı alınıyor. Brief'in önerdiği AI aracı.

**Lovable**
GitHub reposuna bağlanıp saniyeler içinde uygulamayı internete alıyor. Ücretsiz plan buildathon için fazlasıyla yeterli. Ayrıca tarayıcıdan görsel düzenleme de yapılabiliyor.

---

## Kurulum Adımları

1. [aistudio.google.com](https://aistudio.google.com) adresinden Gemini API anahtarı al
2. Cursor'da React projesi oluştur
3. `.env` dosyasına API anahtarını ekle: `VITE_GEMINI_API_KEY=...`
4. Geliştirme tamamlanınca GitHub'a push et
5. [lovable.dev](https://lovable.dev) üzerinden GitHub reposunu bağla ve deploy et

---

## Geliştirme Ortamı

- **Editör:** Cursor (AI destekli, agent modu ile hızlı geliştirme)
- **Tarayıcı önizleme:** Localhost:5173 (Vite)
- **Paket yöneticisi:** npm
