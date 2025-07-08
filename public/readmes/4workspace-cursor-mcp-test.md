# Cursor MCP (Model Control Protocol) Kurulum ve Kullanım Kılavuzu

Bu repository, Cursor IDE'de MCP (Model Control Protocol) entegrasyonunun nasıl kurulacağını ve kullanılacağını açıklamaktadır.

## MCP Nedir?

MCP (Model Control Protocol), Cursor IDE'de GitHub entegrasyonu gibi çeşitli servisleri kullanmanızı sağlayan bir protokoldür. Bu protokol sayesinde doğrudan IDE üzerinden GitHub işlemlerini gerçekleştirebilirsiniz.

## Kurulum Adımları

### 1. GitHub Personal Access Token Oluşturma

1. GitHub hesabınızda Settings > Developer settings > Personal access tokens > Tokens (classic) bölümüne gidin
2. "Generate new token" butonuna tıklayın
3. Token için gerekli izinleri seçin:
   - `repo` (tüm repo işlemleri için)
   - `workflow`
   - `read:org`
4. Token'ı oluşturun ve güvenli bir yerde saklayın

### 2. MCP Konfigürasyonu

1. Cursor IDE'de `.cursor` klasörü içinde `mcp.json` dosyası oluşturun
2. Aşağıdaki yapılandırmayı ekleyin:

```json
{
  "name": "GitHub Integration",
  "model": "github",
  "apiKey": "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN",
  "baseUrl": "https://api.github.com",
  "options": {
    "repository": "YOUR_USERNAME/YOUR_REPO",
    "branch": "main"
  },
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@smithery-ai/github",
        "--config",
        "{\"githubPersonalAccessToken\":\"YOUR_GITHUB_PERSONAL_ACCESS_TOKEN\"}"
      ]
    }
  }
}
```

## Kullanım

MCP kurulumundan sonra Cursor IDE üzerinden şu işlemleri yapabilirsiniz:

- Repository oluşturma
- Dosya oluşturma/düzenleme
- Issue oluşturma ve yönetme
- Pull request oluşturma
- Commit ve push işlemleri
- Repository fork'lama
- Branch oluşturma
- Ve daha fazlası...

## Güvenlik Notları

- GitHub Personal Access Token'ınızı asla public repolarda paylaşmayın
- Token'ı güvenli bir şekilde saklayın
- Sadece ihtiyacınız olan izinleri verin
- Token'ı düzenli aralıklarla yenileyin

## Sorun Giderme

Eğer MCP ile ilgili sorunlar yaşıyorsanız:

1. Token'ın geçerli olduğundan emin olun
2. İzinlerin doğru ayarlandığını kontrol edin
3. `mcp.json` dosyasının doğru formatta olduğunu kontrol edin
4. Cursor IDE'yi yeniden başlatmayı deneyin

## Katkıda Bulunma

Bu repository'ye katkıda bulunmak için:

1. Repository'yi fork'layın
2. Yeni bir branch oluşturun
3. Değişikliklerinizi yapın
4. Pull request açın

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.