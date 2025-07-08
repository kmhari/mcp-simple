# 台灣中央氣象局 MCP 伺服器

這個專案提供一個與台灣中央氣象局 (CWA) API 進行對接的 Model Context Protocol (MCP) 伺服器，讓你能夠簡單地獲取台灣地區的天氣資料。

[中文版](README.md) | [English](README_EN.md)

## ✨ 功能特色

- 獲取台灣各縣市未來 3 天的天氣預報資料
- 獲取台灣各縣市未來 1 週的天氣預報資料
- 獲取過去三天的雨量資料
- 自動資料清理與格式轉換
- 錯誤處理機制與重試邏輯
- 簡化的 API 輸出，僅包含必要資訊

## 🚀 安裝說明

### Claude Desktop 設定

1. **安裝 Claude Desktop**
   - 下載 [Claude Desktop](https://claude.ai/download)
   - 確保您使用的是最新版本 (選單: Claude -> 檢查更新...)

2. **設定 MCP 伺服器**

   ```json
   {
     "mcpServers": {
       "taiwan-weather": {
         "command": "npx",
         "args": [
           "taiwan-cwa-mcp-server"
         ],
         "env": {
           "CWA_API_KEY": "您的API金鑰"
         }
       }
     }
   }
   ```

   - 將 `您的API金鑰` 替換為從中央氣象局取得的 API 金鑰

### 從本地開發版本啟動

```json
{
  "mcpServers": {
    "taiwan-weather": {
      "command": "npx",
      "args": [
        "tsx",
        "/您的專案目錄路徑/src/server.ts"
      ],
      "env": {
        "CWA_API_KEY": "您的API金鑰",
        "MAX_RETRIES": "3",
        "TIMEOUT_MS": "10000"
      }
    }
  }
}
```

## 🛠️ 可用工具

### get_3_days_weather

獲取指定縣市未來 3 天的天氣預報資料。

**參數:**

- `location_name` (字串): 縣市名稱，必須是有效的台灣縣市名稱

有效的縣市名稱包括：宜蘭縣, 花蓮縣, 臺東縣, 澎湖縣, 金門縣, 連江縣, 臺北市, 新北市, 桃園市, 臺中市, 臺南市, 高雄市, 基隆市, 新竹縣, 新竹市, 苗栗縣, 彰化縣, 南投縣, 雲林縣, 嘉義縣, 嘉義市, 屏東縣

### get_1_week_weather

獲取指定縣市未來 1 週的天氣預報資料。

**參數:**

- `location_name` (字串): 縣市名稱，必須是有效的台灣縣市名稱

有效的縣市名稱包括：宜蘭縣, 花蓮縣, 臺東縣, 澎湖縣, 金門縣, 連江縣, 臺北市, 新北市, 桃園市, 臺中市, 臺南市, 高雄市, 基隆市, 新竹縣, 新竹市, 苗栗縣, 彰化縣, 南投縣, 雲林縣, 嘉義縣, 嘉義市, 屏東縣

### get_historical_rainfall

獲取過去三天的雨量資料。

## 🧪 開發說明

### 環境變數配置

本專案使用 `.env` 檔案進行配置。請參考 `.env.example` 並建立自己的 `.env` 檔案：

```text
# API 金鑰設定
CWA_API_KEY=YOUR_API_KEY_HERE

# API 請求設定
MAX_RETRIES=3
RETRY_DELAY_BASE=2
TIMEOUT_MS=10000
```

### 使用 `fastmcp dev` 測試

最快速的測試和調試方法是使用 `fastmcp dev`：

```bash
npm run dev  # 或 npx fastmcp dev src/server.ts
```

這將在終端中運行伺服器與 [`mcp-cli`](https://github.com/wong2/mcp-cli) 一起測試和調試。

### 使用 `MCP Inspector` 檢查

另一種方法是使用官方的 [`MCP Inspector`](https://modelcontextprotocol.io/docs/tools/inspector) 在網頁界面檢查伺服器：

```bash
npm run inspect  # 或 npx fastmcp inspect src/server.ts
```

## 中央氣象局 API 資源

要使用本專案，你需要先從中央氣象局取得 API 金鑰：

- [中央氣象局開放資料平台](https://opendata.cwa.gov.tw/index)
- [中央氣象局 API 文件](https://opendata.cwa.gov.tw/dist/opendata-swagger.html)
- [中央氣象局 API 金鑰申請教學](https://www.hlbh.hlc.edu.tw/resource/openfid.php?id=38959)

## 資料格式

### 天氣預報資料格式

```json
[
  {
    "ElementName": "溫度",
    "Time": [
      ["2025-04-11T00:00", "21"],
      ["2025-04-11T01:00", "21"],
      ...
    ]
  },
  {
    "ElementName": "相對濕度",
    "Time": [
      ["2025-04-11T00:00", "90"],
      ["2025-04-11T01:00", "89"],
      ...
    ]
  },
  ...
]
```

### 雨量資料格式

```json
{
  "rain_labels": ["Now", "Past10Min", "Past1hr", "Past3hr", "Past6Hr", "Past12hr", "Past24hr", "Past2days", "Past3days"],
  "stations": [
    {
      "name": "測站名稱",
      "time": "觀測時間",
      "loc": "縣市,鄉鎮",
      "geo": [緯度, 經度],
      "rain": [當前, 過去10分鐘, 過去1小時, 過去3小時, 過去6小時, 過去12小時, 過去24小時, 過去2天, 過去3天]
    },
    ...
  ]
}
```

## 🤝 貢獻

歡迎問題報告和功能請求！
請訪問[問題頁面](https://github.com/stephen9412/taiwan-cwa-mcp-server/issues)。

## 📄 授權

[MIT 授權](LICENSE) - Copyright (c) 2025 Stephen J. Li
