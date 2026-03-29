import { useState, useEffect } from "react";
import Groq from "groq-sdk";
import wheatPattern from "./assets/wheat-pattern.png";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function App() {
  const [ekran, setEkran] = useState("anasayfa");
  const [analiz, setAnaliz] = useState("toprak");
  const [metin, setMetin] = useState("");
  const [labDegerleri, setLabDegerleri] = useState({ ph: "", ec: "", sar: "", organik: "", klor: "", sodyum: "" });
  const [sonuc, setSonuc] = useState(null);
  const [, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");
  const [noktalar, setNoktalar] = useState(0);

  useEffect(() => {
    if (ekran === "yukleniyor") {
      const t = setInterval(() => setNoktalar(n => (n + 1) % 4), 500);
      return () => clearInterval(t);
    }
  }, [ekran]);

  async function analizeEt() {
    if (!metin && !Object.values(labDegerleri).some(v => v)) {
      setHata("Lütfen en az bir bilgi girin.");
      return;
    }
    setHata("");
    setYukleniyor(true);
    setEkran("yukleniyor");

    const labMetin = Object.entries(labDegerleri)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");

    const prompt = `Sen Türkiye'deki çiftçilere yardımcı olan bir toprak ve su kalitesi uzmanısın. Teknik terim kullanmadan, sade Türkçeyle yanıt ver. Her zaman somut ve uygulanabilir öneriler sun.

Analiz türü: ${analiz === "toprak" ? "Toprak Analizi" : "Sulama Suyu Analizi"}
${metin ? `Çiftçinin anlattıkları: ${metin}` : ""}
${labMetin ? `Lab değerleri: ${labMetin}` : ""}

Lütfen SADECE JSON formatında yanıt ver, başka hiçbir şey yazma:
{
  "genel_durum": "iyi" veya "dikkat" veya "kritik",
  "genel_mesaj": "bir cümle özet",
  "parametreler": [{"ad": "parametre adı", "durum": "iyi" veya "dikkat" veya "kritik", "aciklama": "sade bir cümle"}],
  "eylemler": ["önce bunu yap", "sonra bunu yap", "bunu kullan"]
}`;

    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.3,
      });
      const text = completion.choices[0]?.message?.content || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const data = JSON.parse(clean);
      setSonuc(data);
      setEkran("sonuc");
    } catch {
      setHata("Bağlantı hatası, lütfen tekrar deneyin.");
      setEkran("giris");
    } finally {
      setYukleniyor(false);
    }
  }

  const durumRenk = (d) => d === "iyi" ? "#86efac" : d === "dikkat" ? "#fcd34d" : "#fca5a5";
  const durumBg = (d) => d === "iyi" ? "rgba(134,239,172,0.15)" : d === "dikkat" ? "rgba(252,211,77,0.15)" : "rgba(252,165,165,0.15)";
  const durumEmoji = (d) => d === "iyi" ? "✓" : d === "dikkat" ? "!" : "✕";
  const durumYazi = (d) => d === "iyi" ? "İyi" : d === "dikkat" ? "Dikkat" : "Kritik";

  const arkaPlanGradient =
    "radial-gradient(circle at 50% 28%, rgba(255,180,80,0.18), transparent 58%), linear-gradient(180deg, #2b0f05, #1a0a03)";

  const s = {
    app: {
      minHeight: "100vh",
      width: "100%",
      color: "#f5e6d3",
      fontFamily: "'Segoe UI', sans-serif",
      margin: 0,
      padding: 0,
    },
    sayfa: {
      maxWidth: 520,
      margin: "0 auto",
      padding: "32px 20px",
      minHeight: "100vh",
    },
    baslik: {
      fontSize: 38,
      fontWeight: 800,
      color: "#ffb450",
      margin: 0,
      letterSpacing: -1,
    },
    altyazi: {
      color: "#a07850",
      fontSize: 15,
      marginTop: 4,
      marginBottom: 36,
    },
    kart: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(212,139,58,0.3)",
      borderRadius: 18,
      padding: "22px 20px",
      marginBottom: 14,
      cursor: "pointer",
      transition: "all 0.2s",
    },
    kartBaslik: {
      fontSize: 18,
      fontWeight: 700,
      color: "#f5e6d3",
      margin: 0,
    },
    kartAltyazi: {
      fontSize: 13,
      color: "#a07850",
      margin: "6px 0 0",
    },
    geriBtn: {
      background: "none",
      border: "none",
      color: "#d48b3a",
      fontSize: 15,
      cursor: "pointer",
      marginBottom: 20,
      padding: 0,
    },
    etiketler: {
      fontSize: 11,
      fontWeight: 700,
      color: "#a07850",
      letterSpacing: 1,
      marginBottom: 8,
      marginTop: 20,
    },
    textarea: {
      width: "100%",
      minHeight: 100,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(212,139,58,0.3)",
      borderRadius: 12,
      padding: 14,
      color: "#f5e6d3",
      fontSize: 14,
      resize: "vertical",
      boxSizing: "border-box",
      outline: "none",
    },
    chipBtn: {
      padding: "6px 14px",
      background: "rgba(212,139,58,0.12)",
      border: "1px solid rgba(212,139,58,0.3)",
      borderRadius: 20,
      color: "#d4b896",
      fontSize: 12,
      cursor: "pointer",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(212,139,58,0.3)",
      borderRadius: 10,
      color: "#f5e6d3",
      fontSize: 14,
      boxSizing: "border-box",
      outline: "none",
    },
    analizBtn: {
      width: "100%",
      padding: "16px",
      background: "linear-gradient(135deg, #d48b3a, #b8722e)",
      border: "none",
      borderRadius: 14,
      color: "#fff",
      fontSize: 17,
      fontWeight: 700,
      cursor: "pointer",
      marginTop: 8,
      letterSpacing: 0.5,
    },
    sonucBtn: {
      width: "100%",
      padding: "14px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(212,139,58,0.3)",
      borderRadius: 14,
      color: "#f5e6d3",
      fontSize: 15,
      cursor: "pointer",
      marginTop: 14,
    },
  };

  return (
    <div style={{ ...s.app, position: "relative" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { margin: 0; padding: 0; min-height: 100vh; min-height: 100dvh; background: #1a0a03; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        .fade { animation: fadeIn 0.4s ease both; }
        .kartHover:hover { background: rgba(255,255,255,0.1) !important; border-color: rgba(212,139,58,0.6) !important; transform: translateY(-2px); }
        .spinner { width: 48px; height: 48px; border: 4px solid rgba(212,139,58,0.2); border-top-color: #d48b3a; border-radius: 50%; animation: spin 0.9s linear infinite; margin: 0 auto 20px; }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
        input::placeholder, textarea::placeholder { color: #6b4f35; }
      `}</style>

      {/* 1) Renk zemin  2) Buğday PNG (overlay + yüksek opaklık — ayrı katman, blur yok) */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: arkaPlanGradient,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage: `url(${wheatPattern})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "center top",
          backgroundSize: "clamp(56px, 16vmin, 104px) auto",
          opacity: 0.48,
          mixBlendMode: "overlay",
          transform: "translateZ(0)",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>

      {/* ANA SAYFA */}
      {ekran === "anasayfa" && (
        <div style={s.sayfa} className="fade">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 56, marginBottom: 10 }}>🌾</div>
            <h1 style={s.baslik}>TarlaSor</h1>
            <p style={s.altyazi}>Tarlana sor, cevabını al</p>
          </div>

          <div className="kartHover" style={{ ...s.kart, borderColor: "rgba(134,200,100,0.4)" }}
            onClick={() => { setAnaliz("toprak"); setEkran("giris"); }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 32 }}>🌱</span>
              <div>
                <p style={s.kartBaslik}>Toprağımı Analiz Et</p>
                <p style={s.kartAltyazi}>Belirti anlat, fotoğraf çek veya lab değeri gir</p>
              </div>
            </div>
          </div>

          <div className="kartHover" style={{ ...s.kart, borderColor: "rgba(100,150,220,0.4)" }}
            onClick={() => { setAnaliz("su"); setEkran("giris"); }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 32 }}>💧</span>
              <div>
                <p style={s.kartBaslik}>Sulama Suyumu Analiz Et</p>
                <p style={s.kartAltyazi}>Sulama suyunun bitkiye etkisini öğren</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 32, background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "16px 20px" }}>
            <p style={{ color: "#a07850", fontSize: 13, marginBottom: 14, textAlign: "center" }}>Nasıl Çalışır?</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {[["📝", "Bilgi Gir"], ["🤖", "AI Analiz Eder"], ["✅", "Öneri Al"]].map(([emoji, yazi]) => (
                <div key={yazi} style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{emoji}</div>
                  <div style={{ fontSize: 12, color: "#d4b896" }}>{yazi}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GİRİŞ */}
      {ekran === "giris" && (
        <div style={s.sayfa} className="fade">
          <button style={s.geriBtn} onClick={() => setEkran("anasayfa")}>← Geri</button>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f5e6d3", marginBottom: 4 }}>
            {analiz === "toprak" ? "🌱 Toprak Analizi" : "💧 Su Analizi"}
          </h2>
          <p style={{ color: "#a07850", fontSize: 13, marginBottom: 20 }}>
            {analiz === "toprak" ? "Toprağınla ilgili ne gözlemliyorsun?" : "Sulama suyu hakkında ne fark ettin?"}
          </p>

          <p style={s.etiketler}>BELİRTİ ANLAT</p>
          <textarea style={s.textarea} value={metin} onChange={e => setMetin(e.target.value)}
            placeholder={analiz === "toprak" ? "Örnek: Yapraklarım sararıyor, toprak bembeyaz oldu..." : "Örnek: Sulama sonrası bitkiler solmaya başladı..."} />

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
            {(analiz === "toprak"
              ? ["Sararan yaprak", "Beyaz leke", "Kuruyan toprak", "Solgun bitki"]
              : ["Su kokuyor", "Bitkiler soldu", "Toprak sertleşti", "Verim düştü"]
            ).map(e => (
              <button key={e} style={s.chipBtn} onClick={() => setMetin(m => m ? m + ", " + e : e)}>{e}</button>
            ))}
          </div>

          <p style={s.etiketler}>LAB DEĞERLERİ (varsa)</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {(analiz === "toprak"
              ? [["ph", "pH"], ["ec", "EC (dS/m)"], ["sar", "SAR"], ["organik", "Organik Madde %"]]
              : [["ph", "pH"], ["ec", "EC (dS/m)"], ["sar", "SAR"], ["klor", "Klor (mg/L)"], ["sodyum", "Sodyum (mg/L)"]]
            ).map(([key, label]) => (
              <div key={key}>
                <p style={{ fontSize: 11, color: "#a07850", marginBottom: 5 }}>{label}</p>
                <input type="number" style={s.input} value={labDegerleri[key]}
                  onChange={e => setLabDegerleri(v => ({ ...v, [key]: e.target.value }))} />
              </div>
            ))}
          </div>

          {hata && <p style={{ color: "#fca5a5", fontSize: 13, marginTop: 12 }}>{hata}</p>}
          <button style={s.analizBtn} onClick={analizeEt}>Analiz Et →</button>
        </div>
      )}

      {/* YÜKLENİYOR */}
      {ekran === "yukleniyor" && (
        <div style={{ ...s.sayfa, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} className="fade">
          <div className="spinner" />
          <h2 style={{ color: "#d48b3a", fontSize: 20, marginBottom: 8 }}>TarlaSor analiz yapıyor</h2>
          <p style={{ color: "#a07850", fontSize: 14, letterSpacing: 2 }}>{"●".repeat(noktalar + 1)}</p>
        </div>
      )}

      {/* SONUÇ */}
      {ekran === "sonuc" && sonuc && (
        <div style={s.sayfa} className="fade">
          <button style={s.geriBtn} onClick={() => setEkran("anasayfa")}>← Ana Sayfa</button>

          <div style={{ background: durumBg(sonuc.genel_durum), border: `2px solid ${durumRenk(sonuc.genel_durum)}`, borderRadius: 18, padding: 20, marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 50, height: 50, borderRadius: "50%", background: durumRenk(sonuc.genel_durum), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#1a1a1a", flexShrink: 0 }}>
              {durumEmoji(sonuc.genel_durum)}
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 16, color: "#f5e6d3" }}>
                {sonuc.genel_durum === "iyi" ? "Durum İyi" : sonuc.genel_durum === "dikkat" ? "Dikkat Gerekiyor" : "Acil Müdahale"}
              </p>
              <p style={{ color: "#a07850", fontSize: 13, marginTop: 2 }}>{sonuc.genel_mesaj}</p>
            </div>
          </div>

          {sonuc.parametreler?.map((p, i) => (
            <div key={i} className="fade" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,139,58,0.2)", borderRadius: 14, padding: 16, marginBottom: 10, animationDelay: `${i * 0.08}s` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600, color: "#f5e6d3" }}>{p.ad}</span>
                <span style={{ background: durumRenk(p.durum), color: "#1a1a1a", padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                  {durumYazi(p.durum)}
                </span>
              </div>
              <p style={{ color: "#a07850", fontSize: 13, marginTop: 8 }}>{p.aciklama}</p>
            </div>
          ))}

          {sonuc.eylemler?.length > 0 && (
            <div style={{ background: "rgba(212,139,58,0.1)", border: "2px solid rgba(212,139,58,0.5)", borderRadius: 14, padding: 20, marginTop: 8 }}>
              <p style={{ fontWeight: 700, color: "#d48b3a", marginBottom: 12, fontSize: 15 }}>🛠 Ne Yapmalısınız?</p>
              {sonuc.eylemler.map((e, i) => (
                <p key={i} style={{ color: "#f5e6d3", fontSize: 14, marginBottom: 8 }}>
                  <span style={{ color: "#d48b3a", fontWeight: 700 }}>{i + 1}.</span> {e}
                </p>
              ))}
            </div>
          )}

          <button style={s.sonucBtn} onClick={() => { setSonuc(null); setMetin(""); setLabDegerleri({ ph: "", ec: "", sar: "", organik: "", klor: "", sodyum: "" }); setEkran("anasayfa"); }}>
            Yeni Analiz Yap
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
