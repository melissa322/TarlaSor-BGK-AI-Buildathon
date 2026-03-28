# TarlaSor — Kullanıcı Akışı

## Genel Akış

```
Uygulama Açılır
      ↓
Ana Sayfa
(Toprağımı Analiz Et / Sulama Suyumu Analiz Et)
      ↓
Giriş Ekranı
(Fotoğraf / Belirti Anlat / Lab Değerleri — kullanıcı seçer)
      ↓
Analiz Ekranı
(Yükleniyor animasyonu)
      ↓
Sonuç Ekranı
(Durum + Açıklama + Eylem Önerileri)
      ↓
"Yeni Analiz Yap" → Ana Sayfaya Döner
```

---

## Adım Adım Akış

### 1. Uygulama Açılır → Ana Sayfa
- Kullanıcı TarlaSor'u açar
- Karşısına iki büyük kart çıkar:
  - 🌱 **Toprağımı Analiz Et**
  - 💧 **Sulama Suyumu Analiz Et**
- Alt kısımda "Nasıl Çalışır?" — 3 adım: Gir → Analiz Et → Öğren

### 2. Kart Seçimi → Giriş Ekranı
- Kullanıcı toprak veya su kartına basar
- Giriş ekranı açılır, üç yöntem gösterilir:
  - **Fotoğraf Yükle** — galeriden veya kameradan
  - **Belirti Anlat** — serbest metin veya hızlı etiket seç (Sararan yaprak / Kuruyan toprak / Beyaz leke vb.)
  - **Lab Değerlerini Gir** — pH, EC, SAR gibi alanlar
- Kullanıcı bir veya birden fazla yöntemi kullanabilir
- **"Analiz Et"** butonuna basar

### 3. Analiz Ekranı
- "TarlaSor analiz yapıyor..." mesajı
- Dönen animasyon
- 5-10 saniye beklenir, AI yanıtı işlenir

### 4. Sonuç Ekranı
- **Genel Durum Kartı** — renk kodlu: 
  - 🟢 İyi
  - 🟡 Dikkat
  - 🔴 Kritik
- **Parametre Kartları** — her değer için ayrı kart, bir cümle açıklama
- **Eylem Önerileri** — sıralı madde listesi, sade Türkçe
- **"Yeni Analiz Yap"** butonu → Ana sayfaya döner

### 5. Hakkında Sayfası (Menüden Erişilir)
- TarlaSor nedir
- Nasıl kullanılır
- Geri bildirim formu bağlantısı

---

## Hata Durumları

| Durum | Ne Olur |
|---|---|
| Fotoğraf yüklenemedi | "Fotoğraf yüklenemedi, tekrar deneyin" mesajı |
| Hiçbir giriş yapılmadı | "Analiz Et" butonu pasif kalır |
| AI yanıt vermedi | "Bağlantı hatası, lütfen tekrar deneyin" mesajı |
| Geçersiz lab değeri | İlgili alanın altında kırmızı uyarı çıkar |
