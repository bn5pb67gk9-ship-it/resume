# 羿恬的 AI 數位履歷分身浮動聊天小元件 🤖
> **Cyber-Glassmorphism AI Resume Avatar Widget for GitHub Pages**

這是一個專為「羿恬」的個人履歷網站設計的頂級科技感 **AI 數位履歷分身浮動小元件**。純前端實作（HTML + CSS + JS），**無需任何付費 API Key**，零維護成本、零外洩風險，直接貼上即可在 GitHub Pages 上流暢運作！

---

## 🌟 核心功能特色

1. **科技感呼吸光暈懸浮球**：
   - 常駐於頁面右下角，具備機器人發光圖示、綠色實時在線狀態燈與呼吸波紋脈衝動畫。
2. **Cyber-Glassmorphism 視窗**：
   - 賽博毛玻璃質感、邊框微光流光、自適應手機（底欄抽屜）與電腦（右下彈窗）的響應式 RWD。
3. **主動歡迎語**：
   - 開啟視窗即主動問候：「*你好！我是羿恬的AI分身，隨時為您介紹羿恬的企管專案與產業專案成果，想了解甚麼呢？*」
4. **4 個一鍵點選膠囊標籤 (Quick Chips)**：
   - 💡 **自我介紹**
   - 📊 **介紹你的產業分析專案**
   - 💼 **你的企管核心專長**
   - 📬 **如何連絡你**
5. **Generative UI 專案導覽連動**：
   - 詢問專案時，條理分明輸出核心亮點，並動態生成「👉 前往專案展示區」精美跳轉按鈕。
   - 點擊後**平滑滾動 (Smooth Scroll)** 頁面至對應錨點，並**附帶 2 秒的科技藍高亮脈衝光暈**！
6. **擬真串流打字機效果**：
   - 模擬真實 LLM Token 流式輸出與打字光標，體驗極致絲滑。
7. **開放式智慧意圖辨識**：
   - 訪客自訂打字輸入（如：「你擅長什麼」、「有做過什麼分析」、「怎麼聯繫」）亦能智慧分類並回答。

---

## 📁 專案檔案結構

```
ai-resume-widget/
├── index.html              # 完整展示頁（含羿恬企管履歷區塊與展示測試）
├── ai-avatar-widget.css    # 科技感樣式表 (毛玻璃、動畫、RWD)
├── ai-avatar-widget.js     # 核心小元件邏輯 (知識庫、打字機、導覽連動)
└── README.md               # 整合與客製化說明指南
```

---

## 🚀 如何整合到你現有的 GitHub Pages 網站？

只需 2 步，30 秒極速完成部署：

### 步驟 1：複製檔案
將 `ai-avatar-widget.css` 與 `ai-avatar-widget.js` 放入你 GitHub 倉庫的靜態資源目錄（例如根目錄或 `assets/`）。

### 步驟 2：在 HTML 引入

在你的現有履歷 HTML 檔案中加入：

```html
<!-- 1. 在 <head> 內加入樣式表 -->
<link rel="stylesheet" href="ai-avatar-widget.css">

<!-- 2. 在 </body> 結尾標籤前引入腳本 -->
<script src="ai-avatar-widget.js"></script>
```

---

## ⚙️ 如何客製化問答內容與網頁錨點？

打開 `ai-avatar-widget.js`，找到頂部的 `KNOWLEDGE_BASE` 物件，你可以隨時調整羿恬的回答內容或錨點：

```javascript
const KNOWLEDGE_BASE = {
  // 1. 自我介紹
  intro: {
    text: `您的自訂自我介紹內容...`,
    action: null
  },
  // 2. 產業分析專案
  industry_project: {
    text: `專案亮點與數據成果...`,
    action: {
      title: "🚀 查看專案成果詳情",
      btnText: "👉 前往「產業分析專案展示區」",
      anchor: "#industry-projects" // 對應你網頁中的 HTML id
    }
  },
  // 3. 企管專長
  mgmt_skills: {
    text: `企管專長四大維度...`,
    action: {
      title: "💼 核心專長與認證",
      btnText: "👉 查看「專業技能與實績展示」",
      anchor: "#mgmt-projects" // 對應你網頁中的 HTML id
    }
  },
  // 4. 聯絡方式
  contact: {
    text: `聯絡方式說明...`,
    action: {
      title: "📬 取得聯繫",
      btnText: "👉 前往「聯絡羿恬區塊」",
      anchor: "#contact" // 對應你網頁中的 HTML id
    }
  }
};
```

---

## 💻 本地測試預覽

你可以直接在瀏覽器中雙擊打開 `index.html`，即可完整體驗呼吸光暈懸浮球、點擊展開、膠囊提問、串流打字及專案平滑跳轉連動！
