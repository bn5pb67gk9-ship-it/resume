# 陳羿恬 | 個人履歷網站 AI 數位分身浮動元件
> **100% 保留原有淡雅紫藤紙張質感樣式，無縫嵌入 AI 數位履歷分身**

本專案完全以你目前的網站 [https://bn5pb67gk9-ship-it.github.io/resume/](https://bn5pb67gk9-ship-it.github.io/resume/) 為基準製作，**100% 保持你原有的美感、排版、色彩（#664579 / 薰衣草紙質風）與 Chart.js 動態圖表**，僅新增右下角的 AI 浮動小元件。

---

## 🎯 檔案更新重點

1. **`index.html`**：
   - 完整保留你的原始履歷內容（工作經歷、倉儲文書助理專案、3 個 Chart.js 圖表、數據核實清單、聯絡方式）。
   - 僅在 `</head>` 前加入 `<link rel="stylesheet" href="ai-avatar-widget.css">`。
   - 僅在 `</body>` 前加入 `<script src="ai-avatar-widget.js"></script>`。

2. **`ai-avatar-widget.css`**：
   - 採獨立命名空間（Scoped CSS），**完全不會污染或改變你原本網頁的任何標籤與樣式**。
   - 顏色特別調校融合你的主題色（`#664579` 尊爵紫藤 + 科技微光），科技感十足且自然優雅。
   - 支援手機（底部抽屜）與電腦（右下面板）自適應 RWD。

3. **`ai-avatar-widget.js`**：
   - **完全對齊你的真實履歷資料庫**：
     - **自我介紹**：介紹萬能科大企管系進修部、出貨組文書實務，引導跳轉至 `#about`。
     - **產業分析專案**：精準介紹你的「**倉儲文書助理產業分析與數位轉型研究**」（含 -45% 單據校對、-68% 揀貨錯漏改善、+52% 對帳效率），按鈕直接平滑滾動至 `#projects` 並發光高亮！
     - **企管核心專長**：介紹現場與文書整合、SOP 優化、跨部門溝通與數據思維，引導跳轉至 `#strengths`。
     - **如何連絡你**：提供電話 `0966-960-969`、Email `chen0966960969@gmail.com`，引導跳轉至 `#availability`。
   - **純前端實作**：免申請 API Key，模擬即時串流打字效果，零成本無外洩風險。

---

## 🚀 如何同步到你的 GitHub 倉庫？

你只需要將以下三個檔案上傳並覆蓋至你的 GitHub 倉庫（`bn5pb67gk9-ship-it/resume`）：

1. **`index.html`**
2. **`ai-avatar-widget.css`**
3. **`ai-avatar-widget.js`**

上傳完成後，GitHub Pages 會自動重新部署，即可在保留原有完整樣式的同時，擁有專屬的 AI 數位分身！
