# 現代風格老虎機遊戲

這是一個使用原生JavaScript、CSS動畫和Tailwind CSS建立的現代化老虎機遊戲。遊戲模仿了經典老虎機的基本功能，並採用了流暢的CSS動畫效果優化滾動體驗。

## 功能特色

- 流暢自然的滾輪動畫效果
- 順序停止的滾輪，增強遊戲期待感
- 互動式投注和旋轉控制
- 支付線動畫效果
- 勝利組合獎勵和特效
- 響應式設計，適應各種螢幕尺寸
- 音效回饋
- 鍵盤支援（按 1 投注一枚，按 M 最大投注，按空格或 Enter 旋轉）

## 遊戲規則

1. 使用「下注一枚」按鈕增加投注金額，每次增加 1 點。
2. 使用「最大下注」按鈕一次增加到最大投注額（3 點）。
3. 投注後，按「轉動滾輪」按鈕開始遊戲。
4. 獲勝組合：
   - 三個 7 符號 = 贏得 100 × 投注額
   - 三個 BAR 符號 = 贏得 50 × 投注額
   - 任意三個符號組合（不含空白）= 贏得 5 × 投注額
5. 贏得的點數會自動添加到總點數中。

## 開發流程

1. **原始版本分析**：
   - 分析了[freeslots.com/Slot22.htm](https://www.freeslots.com/Slot22.htm)的典型老虎機遊戲
   - 測試原始遊戲的Bet ONE、Bet MAX和SPIN REELS功能
   - 研究遊戲邏輯和流程

2. **第一版實現**：
   - 基於Three.js實現3D老虎機滾輪效果
   - 使用Tailwind CSS構建現代UI介面
   - 實現基本的投注和獲獎邏輯

3. **重構優化**：
   - 參考[Stackoverflow討論](https://stackoverflow.com/questions/62426257/creating-an-animation-for-a-basic-react-slot-machine)的解決方案
   - 研究[Codepen滾動範例](https://codepen.io/fmressel/pen/vRLerN)的實現方式
   - 使用CSS transitions替代Three.js 3D渲染
   - 優化滾輪動畫及滾動停止效果
   - 改進視覺反饋和使用者體驗

## 技術實現

- **CSS動畫**：使用CSS transitions實現順滑的滾輪動畫
- **Tailwind CSS**：用於快速構建響應式UI
- **原生JavaScript**：控制遊戲邏輯和動畫同步
- **Promise與async/await**：處理滾輪異步停止和結果檢查

## 優勢與劣勢分析

### 優勢
1. **效能提升**
   - CSS動畫由瀏覽器GPU加速，比Three.js 3D渲染更輕量
   - 減少了JavaScript運算，降低CPU使用率
   - 頁面加載速度更快，不需要加載重量級3D渲染庫

2. **使用者體驗改進**
   - 滾動效果更加自然流暢
   - 順序停止的滾輪增加遊戲的戲劇性和期待感
   - 視覺反饋更加豐富，增強用戶互動感

3. **開發維護優勢**
   - 代碼更簡潔，易於理解和維護
   - 減少了對外部資源的依賴
   - 更靈活的自定義和擴展可能性

### 劣勢
1. **視覺局限性**
   - 相較於3D渲染，純CSS動畫在複雜視覺效果上有局限
   - 失去了一些Three.js提供的照明、陰影等3D效果
   - 無法實現真正的3D視角和透視效果

2. **兼容性考慮**
   - 某些CSS動畫特性在舊版瀏覽器上可能存在兼容性問題
   - 不同瀏覽器對CSS transitions的實現可能有細微差異

3. **資源重複**
   - 當前實現保留了部分不使用的Three.js相關代碼
   - 新舊實現方式的混合可能造成資源浪費

## 改進方案

### 短期改進
1. **清理冗餘代碼**
   - 移除未使用的Three.js相關代碼
   - 將CSS樣式重構為模組化、可重用的組件

2. **增強動畫效果**
   - 添加更多中間狀態的過渡效果
   - 實現更自然的加速/減速效果
   - 添加偶發的"接近獲勝"效果（滾輪停止後微調位置）

3. **改進使用者反饋**
   - 添加觸覺反饋（在支持的設備上使用Vibration API）
   - 增強音效系統，提供更豐富的音頻反饋
   - 添加更明顯的獲勝慶祝動畫

### 中長期改進
1. **架構升級**
   - 完全遷移至現代前端框架（如React或Vue）
   - 實現狀態管理，改進遊戲狀態處理
   - 採用組件化設計，提高可維護性

2. **遊戲玩法擴展**
   - 實現多條支付線
   - 添加特殊符號（如通配符、散佈符號）
   - 設計額外的小遊戲或免費旋轉功能

3. **效能與體驗優化**
   - 實現WebWorker處理複雜運算
   - 添加進階動畫效果（例如使用WebGL進行特效渲染）
   - 實現離線支持與本地存儲

4. **多平台支持**
   - 優化觸控設備體驗
   - 考慮PWA實現，實現安裝功能
   - 自適應不同設備性能的動畫效果

## 本地運行

1. 確保您的瀏覽器支援現代CSS特性。
2. 將專案文件放在網頁伺服器中，或使用本地開發伺服器：
   ```
   python3 -m http.server 8000
   ```
3. 訪問 `http://localhost:8000` 開始遊戲。

## 參考資源

- [Stackoverflow 老虎機動畫解決方案](https://stackoverflow.com/questions/62426257/creating-an-animation-for-a-basic-react-slot-machine)
- [Codepen 滾動效果範例](https://codepen.io/fmressel/pen/vRLerN)
- [Tailwind CSS 文檔](https://tailwindcss.com/docs)
- [FreeSlots原始參考遊戲](https://www.freeslots.com/Slot22.htm)

## 開發者

這個專案是作為前端 UI/UX 演示而創建的，展示了現代 Web 技術在遊戲開發中的應用。 

## Prompt

### 1

https://www.freeslots.com/Slot22.htm 
你也是一個資深的 PM
請瀏覽這個網頁
並且測試功能
* Bet ONE
* Bet MAX
* SPIN REELS

分析邏輯後
使用 react + three.js + Tailwind CSS
實作一個完整的 html 實作功能和表演

### 2

@https://codepen.io/fmressel/pen/vRLerN 
滾動範例

@https://stackoverflow.com/questions/62426257/creating-an-animation-for-a-basic-react-slot-machine 
參考文章 主要參觀 8 樓的回覆內容
裡面還有一個可以執行的範例

瀏覽這些文章跟範例
重構這個範例 優化滾動的效果

## MCP

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "--init", "-e", "DOCKER_CONTAINER=true", "mcp/puppeteer"]
    },
    "github": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "github token"
      }
    }
  }
}
```