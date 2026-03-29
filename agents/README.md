# TarlaSor AI Agent

TarlaSor'un AI motoru Groq API üzerinde çalışan Llama 3.3 70B modelini kullanır.

## Nasıl Çalışır?
1. Kullanıcı belirti, fotoğraf veya lab değeri girer
2. Agent bu bilgileri toplar, bağlam oluşturur
3. Groq API'ye structured prompt gönderir
4. JSON formatında durum, parametre analizi ve eylem önerileri alır
5. Sonuçlar sade Türkçe olarak kullanıcıya gösterilir

## Model
- Provider: Groq
- Model: llama-3.3-70b-versatile
- Temperature: 0.3
