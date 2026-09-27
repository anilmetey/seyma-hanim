# Psikolog Şeyma Meriç Abul - Web Sitesi (Production)

Bu proje, **Psikolog Şeyma Meriç Abul**'un klinik psikolojik danışmanlık hizmetleri için sıfırdan geliştirilmiş, production kalitesinde, modern, erişilebilir (WCAG AA) ve mobil öncelikli (mobile-first) bir web sitesidir. 

**Tamamen saf HTML5, CSS3 ve Vanilla ES6 JavaScript** ile hazırlanmış olup hiçbir harici framework yükü veya derleme adımı gerektirmez; **GitHub Pages** üzerinde doğrudan yayına alınabilir.

---

## 🌟 Proje ve Tasarım Özellikleri

1. **4 Kritik Soruya Anında Yanıt (Hero Bölümü):**
   - **İşletme ne yapıyor?** Adana Seyhan'da bilimsel, etik ve gizlilik ilkelerine bağlı klinik psikolojik danışmanlık.
   - **Kime hizmet ediyor?** Yetişkinler, çiftler, çocuklar, ergenler ve online danışanlar.
   - **Kullanıcı neden ilgilenmeli?** Fatih Sultan Mehmet Vakıf Üniversitesi Psikoloji lisansı, Cerrahpaşa Tıp Fakültesi Psikiyatri Kliniği stajı, Bilişsel Davranışçı Terapi (BDT) ve MEB onaylı Aile Danışmanlığı uzmanlığı.
   - **Kullanıcı ne yapmalı?** Hızlı online randevu oluşturma, WhatsApp ile doğrudan danışma ve tek tıkla arama.

2. **Gerçek Bilgiler & Sıfır Uydurma İçerik:**
   - Eskişehir doğumlu özgeçmiş, FSMVÜ mezuniyeti, Cerrahpaşa klinik stajı.
   - Orijinal sitedeki gerçek danışan yorumları (*T.....M*, *E....B....S...*, *M...D...*).
   - Gerçek iletişim ve adres bilgileri (*Baysan Sitesi, Döşeme Mah., 60075. Sk. No:4/A1 Blok, Seyhan / Adana*).
   - Gerçek telefon ve e-posta (*0 553 935 03 17*, *psychseyma@gmail.com*).

3. **Özel Design System (AI/SaaS Klişelerinden Uzak):**
   - Mor/neon/aşırı gradyan klişeleri yerine güven veren, huzurlu derin zümrüt/ardıç yeşili (`#1e3d3b`) ve sıcak terracotta/toprak tonları (`#c48a58`).
   - WCAG AAA ve AA kontrast standartlarına tam uyum.
   - Okunabilirliği yüksek `Inter` gövde ve `Merriweather` başlık tipografisi.
   - 4px/8px skala temelli tutarlı spacing ve 6px/10px/16px border-radius.

4. **Kullanıcı Deneyimi (UX) & Form Güvenliği:**
   - İsim, Türkiye formatlı telefon numarası ve KVKK onay kontrolü.
   - Client-side canlı doğrulama ve açıklayıcı Türkçe hata mesajları.
   - Buton loading spinner durumu ve çift gönderim koruması (duplicate submission protection).
   - Başarılı gönderim sonrası WhatsApp üzerinden tek tıkla randevu teyit bağlantısı.

5. **SEO & Semantik Altyapı:**
   - Semantik HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
   - Her sayfaya özel benzersiz `<title>`, `<meta name="description">` ve `<link rel="canonical">`.
   - Open Graph ve Twitter kartı meta etiketleri.
   - Schema.org Structured Data (`LocalBusiness`, `MedicalWebPage`, `ProfilePage`, `FAQPage`).
   - `robots.txt` ve `sitemap.xml`.

---

## 📁 Sayfa Mimarisi

| Dosya | Açıklama |
|---|---|
| `index.html` | Ana Sayfa (Hero, Değerler, Hizmetler Özeti, Biyografi, Danışan Yorumları, SSS Özeti, Randevu Formu) |
| `hakkimda.html` | Hakkımda & Özgeçmiş (Cerrahpaşa stajı, 11 sertifikasyon, klinik ortamı ve ilkeler) |
| `hizmetler.html` | Terapiler & Hizmetler Genel Bakış ve 4 Adımlı Terapi Süreci |
| `bireysel-terapi.html` | Yetişkin Terapisi Detay (Depresyon, anksiyete, panik atak, OKB, fobiler) |
| `cift-terapisi.html` | Evlilik ve Çift Terapisi Detay (İlişki çatışmaları, iletişim, MEB Aile Danışmanlığı) |
| `cocuk-ergen-terapisi.html` | Çocuk & Ergen Terapisi Detay (Oyun terapisi, çocuk resim analizi, sınav kaygısı, ebeveyn danışmanlığı) |
| `online-terapi.html` | Güvenli Online Terapi Detay (Şifreli seanslar, teknik gereksinimler, yurt dışı erişimi) |
| `sss.html` | Sık Sorulan Sorular (Filtreli/Akordeon, Schema.org FAQPage entegreli) |
| `iletisim.html` | İletişim, İnteraktif Randevu Formu, Çalışma Saatleri ve Google Haritası |
| `gizlilik-politikasi.html` | 6698 Sayılı KVKK Aydınlatma Metni, Mesleki Gizlilik İlkeleri ve Çerez Politikası |
| `404.html` | Kullanıcı dostu ve şefkatli 404 Sayfa Bulunamadı sayfası |
| `robots.txt` | Arama motoru tarayıcı direktifleri |
| `sitemap.xml` | Arama motorları için eksiksiz site haritası |
| `assets/css/style.css` | Modüler, değişkenli ve responsive design system |
| `assets/js/main.js` | Mobil menü çekmecesi, SSS akordeonu, form doğrulama ve etkileşimler |
| `assets/images/` | Orijinal siteden optimize edilerek kaydedilmiş gerçek klinik ve seans görselleri |

---

## 🚀 GitHub Pages Üzerinde Yayına Alma (2 Dakikada)

1. Proje dizinindeki tüm dosyaları GitHub üzerindeki reponuza gönderin:
   ```bash
   git add .
   git commit -m "feat: Psikolog Seyma Meric production website"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git
   git push -u origin main
   ```

2. GitHub repository sayfanıza gidin:
   - **Settings** (Ayarlar) sekmesine tıklayın.
   - Sol menüden **Pages** bölümünü seçin.
   - **Branch** olarak `main` ve klasör olarak `/ (root)` seçin.
   - **Save** butonuna basın.

3. Siteniz 1-2 dakika içinde `https://KULLANICI_ADINIZ.github.io/REPO_ADINIZ/` adresinde canlıya alınacaktır.
   *(Özel alan adı bağlamak isterseniz Settings > Pages altındaki "Custom domain" kısmına `seymameric.com.tr` yazabilirsiniz).*
