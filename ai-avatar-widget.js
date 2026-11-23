/**
 * 陳羿恬 AI 數位履歷分身小元件 (AI Digital Resume Avatar Widget)
 * 精準對齊陳羿恬履歷資料庫：企管專業、出貨組文書實務、產業分析專案與聯絡方式
 * 純前端實現，零 API Key，支援打字流式輸出與錨點導覽高亮連動
 */
(function () {
  'use strict';

  // --- 1. 陳羿恬真實履歷知識庫 (Resume Knowledge Base) ---
  const KNOWLEDGE_BASE = {
    intro: {
      text: `您好！我是 **陳羿恬**。\n\n目前就讀**萬能科技大學企業管理系（進修部）**，具備倉儲物流業出貨組文書與門市服務實務經驗。\n\n我擅長將企管營運思維與現場出貨流程結合，專注於**行政文書、表單對帳、庫存流向控管與數據分析**，致力於為團隊帶來嚴謹、高效且有條理的行政後援！`,
      action: {
        title: "👤 關於羿恬詳細簡歷",
        btnText: "👉 前往「關於我」區塊",
        anchor: "#about"
      }
    },
    industry_project: {
      text: `羿恬主導的**【倉儲文書助理產業分析與數位轉型研究】**專案：\n\n📌 **專案背景**：結合現場出貨文書實務經驗與企業管理理論，剖析台灣電商成長下的倉儲文書數位化趨勢。\n\n📊 **研究關鍵成效與指標**：\n• 📉 **-45%**：數位單據校對時間縮減\n• 📦 **-68%**：現場揀貨出貨錯漏率改善\n• ⚡ **+52%**：跨部門庫存對帳處理效率\n\n📈 頁面中包含經濟部與勞動部統計處數據之 Chart.js 視覺化圖表與數據核實清單！`,
      action: {
        title: "📊 查看完整專案研究與圖表",
        btnText: "👉 前往「專案成果展示區」",
        anchor: "#projects"
      }
    },
    mgmt_skills: {
      text: `羿恬的**企管與行政核心專長**主要涵蓋以下面向：\n\n1️⃣ **現場與出貨文書整合**：熟悉出貨單據整理、出貨標籤列印核對、系統資訊登錄與 ERP/WMS 出貨模組。\n2️⃣ **細心核對與表單優化**：能精準識別異常單據，追求 SOP 標準化與作業流程效率化。\n3️⃣ **跨部門協同與高抗壓**：具備與現場主管、司機及辦公室行政流暢配合的高效溝通力。\n4️⃣ **企管與數據分析思維**：不只單純打字開單，更能運用數據圖表掌握出貨趨勢與營運效能。`,
      action: {
        title: "💼 核心優勢與實績展示",
        btnText: "👉 查看「工作優勢」區塊",
        anchor: "#strengths"
      }
    },
    contact: {
      text: `很高興能為您介紹！如果您希望進一步與羿恬聯繫或安排面試：\n\n📞 **聯絡電話**：0966-960-969\n📫 **電子信箱**：chen0966960969@gmail.com\n⏰ **可配合時段**：每週一、四配合學校排課，其餘時段皆可彈性排班配合。\n💼 **期望職務**：行政工讀／文書助理／倉儲出貨文書\n\n歡迎隨時來信或來電！`,
      action: {
        title: "📬 取得聯繫與工作安排",
        btnText: "👉 前往「工作安排與聯絡資訊」",
        anchor: "#availability"
      }
    },
    fallback: {
      text: `這是一個很棒的問題！我了解羿恬在**企管分析、出貨組文書實務、工作經歷與專案成果**上的完整資料。\n\n建議您可以點選上方快捷膠囊，或直接詢問：\n• 「介紹產業分析專案」\n• 「你的企管核心專長」\n• 「如何聯絡你」\n• 「查看工作經歷」`,
      action: null
    }
  };

  // 智慧關鍵字與語意意圖辨識 (Intent Classifier)
  function classifyIntent(query) {
    const q = query.toLowerCase().trim();

    if (/自我介紹|是誰|背景|介紹一下|你好|嗨|hello|hi|resume|簡歷|陳羿恬|羿恬/.test(q)) {
      return 'intro';
    }
    if (/產業|分析|專案|研究|成果|圖表|chart|數據|物流|倉儲|數位轉型/.test(q)) {
      return 'industry_project';
    }
    if (/專長|技能|能力|企管|管理|會什麼|優勢|特質|strength|skill|能力/.test(q)) {
      return 'mgmt_skills';
    }
    if (/聯絡|連絡|mail|email|信箱|電話|面試|上班|到職|時間|排班|contact/.test(q)) {
      return 'contact';
    }
    if (/經歷|工作|出貨|美廉社|美髮|experience/.test(q)) {
      return 'intro';
    }
    return 'fallback';
  }

  // --- 2. 構建 UI 結構 (Inject Widget DOM) ---
  function initWidget() {
    // 檢查是否已存在，避免重複初始化
    if (document.getElementById('ai-avatar-launcher')) return;

    // 建立浮動按鈕
    const launcher = document.createElement('button');
    launcher.id = 'ai-avatar-launcher';
    launcher.setAttribute('aria-label', '打開陳羿恬的 AI 數位分身');
    launcher.innerHTML = `
      <div class="ai-launcher-badge"></div>
      <svg class="ai-launcher-icon" viewBox="0 0 24 24">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18 2.5 2.5 0 0 0 10 15.5 2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5Z"/>
      </svg>
    `;

    // 建立聊天小視窗
    const windowEl = document.createElement('div');
    windowEl.id = 'ai-avatar-window';
    windowEl.innerHTML = `
      <div class="ai-header">
        <div class="ai-header-profile">
          <div class="ai-avatar-core">
            <svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18 2.5 2.5 0 0 0 10 15.5 2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5Z"/></svg>
          </div>
          <div class="ai-header-info">
            <h4>陳羿恬 AI 數位分身 <span style="font-size: 10px; background: rgba(147, 51, 234, 0.25); color:#d8b4fe; padding: 2px 6px; border-radius: 4px;">Twin</span></h4>
            <div class="ai-header-status">
              <span class="ai-status-dot"></span> 實時在線 • 企管與專案顧問
            </div>
          </div>
        </div>
        <button class="ai-close-btn" id="ai-close-trigger" aria-label="關閉視窗">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- 快速提問標籤區 (Chips) -->
      <div class="ai-chips-wrapper">
        <button class="ai-chip" data-intent="intro">💡 自我介紹</button>
        <button class="ai-chip" data-intent="industry_project">📊 介紹你的產業分析專案</button>
        <button class="ai-chip" data-intent="mgmt_skills">💼 你的企管核心專長</button>
        <button class="ai-chip" data-intent="contact">📬 如何連絡你</button>
      </div>

      <!-- 訊息區 -->
      <div class="ai-messages-list" id="ai-messages"></div>

      <!-- 輸入區 -->
      <div class="ai-footer">
        <form id="ai-input-form" class="ai-input-box" onsubmit="return false;">
          <input type="text" id="ai-user-input" placeholder="詢問羿恬的專案或經歷..." autocomplete="off" />
          <button type="submit" id="ai-send-btn" class="ai-send-btn" aria-label="發送訊息">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(windowEl);

    // --- 3. 綁定事件與邏輯 ---
    let isOpen = false;
    let isTyping = false;
    let hasGreeted = false;

    const messagesContainer = document.getElementById('ai-messages');
    const inputForm = document.getElementById('ai-input-form');
    const inputField = document.getElementById('ai-user-input');
    const closeBtn = document.getElementById('ai-close-trigger');

    // 開關切換
    function toggleChat(force) {
      isOpen = typeof force === 'boolean' ? force : !isOpen;
      if (isOpen) {
        windowEl.classList.add('open');
        launcher.classList.add('active');
        if (!hasGreeted) {
          triggerBotWelcome();
          hasGreeted = true;
        }
        setTimeout(() => inputField.focus(), 300);
      } else {
        windowEl.classList.remove('open');
        launcher.classList.remove('active');
      }
    }

    launcher.addEventListener('click', () => toggleChat());
    closeBtn.addEventListener('click', () => toggleChat(false));

    // 預設歡迎詞
    function triggerBotWelcome() {
      const welcomeText = "你好！我是羿恬的AI分身，隨時為您介紹羿恬的企管專案與產業專案成果，想了解甚麼呢？";
      streamBotMessage(welcomeText, null);
    }

    // 格式化文本
    function formatMessageText(text) {
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#d8b4fe;">$1</strong>')
        .replace(/\n/g, '<br/>');
    }

    // 流式打字機效果 (Streaming Simulation)
    function streamBotMessage(fullText, actionCard) {
      isTyping = true;
      const row = document.createElement('div');
      row.className = 'ai-msg-row bot';

      const bubble = document.createElement('div');
      bubble.className = 'ai-msg-bubble ai-typing-cursor';
      row.appendChild(bubble);
      messagesContainer.appendChild(row);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      let currentIndex = 0;
      const speed = 15;

      function typeNextChar() {
        if (currentIndex < fullText.length) {
          currentIndex += 2;
          const currentSub = fullText.substring(0, Math.min(currentIndex, fullText.length));
          bubble.innerHTML = formatMessageText(currentSub);
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
          setTimeout(typeNextChar, speed);
        } else {
          bubble.classList.remove('ai-typing-cursor');
          bubble.innerHTML = formatMessageText(fullText);

          // 若有導覽卡片，生成 Generative UI 互動按鈕
          if (actionCard) {
            const card = document.createElement('div');
            card.className = 'ai-project-card';
            card.innerHTML = `
              <div class="ai-project-card-title">${actionCard.title}</div>
              <button class="ai-jump-btn" data-target="${actionCard.anchor}">
                ${actionCard.btnText}
              </button>
            `;

            const jumpBtn = card.querySelector('.ai-jump-btn');
            jumpBtn.addEventListener('click', () => {
              handleSmoothScroll(actionCard.anchor);
            });

            bubble.appendChild(card);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }

          isTyping = false;
        }
      }

      typeNextChar();
    }

    // 發送使用者訊息
    function handleUserSubmit(text) {
      if (!text || isTyping) return;

      const userRow = document.createElement('div');
      userRow.className = 'ai-msg-row user';
      userRow.innerHTML = `<div class="ai-msg-bubble">${escapeHtml(text)}</div>`;
      messagesContainer.appendChild(userRow);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      inputField.value = '';

      const intentKey = classifyIntent(text);
      const matchedData = KNOWLEDGE_BASE[intentKey] || KNOWLEDGE_BASE.fallback;

      setTimeout(() => {
        streamBotMessage(matchedData.text, matchedData.action);
      }, 350);
    }

    // 處理膠囊點擊 (Chips)
    document.querySelectorAll('.ai-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const intent = chip.getAttribute('data-intent');
        const matched = KNOWLEDGE_BASE[intent] || KNOWLEDGE_BASE.fallback;
        const chipText = chip.textContent.replace(/^[^\w\s\u4e00-\u9fa5]+/, '').trim();
        
        // 渲染使用者問題
        const userRow = document.createElement('div');
        userRow.className = 'ai-msg-row user';
        userRow.innerHTML = `<div class="ai-msg-bubble">${escapeHtml(chipText)}</div>`;
        messagesContainer.appendChild(userRow);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        setTimeout(() => {
          streamBotMessage(matched.text, matched.action);
        }, 350);
      });
    });

    // 處理表單發送
    inputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = inputField.value.trim();
      if (val) handleUserSubmit(val);
    });

    // 平滑跳轉與紫藤脈衝高亮特效 (Smooth Anchor Jump + Highlight)
    function handleSmoothScroll(targetSelector) {
      const targetEl = document.querySelector(targetSelector);
      if (targetEl) {
        if (window.innerWidth <= 480) {
          toggleChat(false); // 手機版自動收合
        }

        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // 紫藤高亮波紋
        const originalTransition = targetEl.style.transition;
        const originalBoxShadow = targetEl.style.boxShadow;
        targetEl.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
        targetEl.style.boxShadow = '0 0 30px rgba(102, 69, 121, 0.55)';

        setTimeout(() => {
          targetEl.style.boxShadow = originalBoxShadow;
          targetEl.style.transition = originalTransition;
        }, 2200);
      } else {
        console.warn(`[AI Avatar] 未找到目標錨點: ${targetSelector}`);
      }
    }

    function escapeHtml(str) {
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  }

  // DOM 載入後自動掛載
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
