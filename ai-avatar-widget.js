/**
 * 羿恬 AI 數位履歷分身小元件 (AI Digital Resume Avatar Widget)
 * 輕量級純前端實現，零 API Key，支援打字機流式效果、Generative 專案導覽連動卡片與語意意圖辨識
 */
(function () {
  'use strict';

  // --- 1. 羿恬的知識庫與回應邏輯 (Knowledge Base & Answers) ---
  const KNOWLEDGE_BASE = {
    intro: {
      text: `您好！我是 **羿恬**。專注於**企業管理、產業分析與商業策略規劃**。\n\n我擅長將複雜的市場數據轉化為具體的商業決策洞察，具備跨領域溝通、專案管理與策略落地的實務經驗，致力於協助團隊與企業挖掘商業價值。`,
      action: null
    },
    industry_project: {
      text: `羿恬近期主導的**【產業趨勢與市場競爭策略分析】**專案：\n\n📌 **專案目標**：深度剖析新興市場痛點與競爭格局，協助擬定產品進入策略（Go-To-Market）。\n📊 **研究成果**：\n• 蒐集並梳理 50+ 篇國內外產業權威研報與競品矩陣。\n• 建立市場規模與獲利預測模型，提出 3 大差異化突破策略。\n• 產出高階決策簡報，獲得團隊與指導高度認可！`,
      action: {
        title: "🚀 查看專案成果詳情",
        btnText: "👉 前往「產業分析專案展示區」",
        anchor: "#industry-projects"
      }
    },
    mgmt_skills: {
      text: `羿恬的**企管核心專長**主要涵蓋以下四大維度：\n\n1️⃣ **市場研究與競品分析**：市場定位、PESTEL / SWOT 模型、產業鏈價值分析。\n2️⃣ **商業模式與策略規劃**：Business Model Canvas、定價與進入市場策略。\n3️⃣ **專案管理與敏捷推進**：跨部門協作、里程碑管理、風險評估與資源調配。\n4️⃣ **數據洞察與簡報溝通**：精準提煉決策摘要，具備頂級商業提案力。`,
      action: {
        title: "💼 核心專長與認證",
        btnText: "👉 查看「專業技能與實績展示」",
        anchor: "#mgmt-projects"
      }
    },
    contact: {
      text: `很高興與您交流！如果您對羿恬的企管背景或專案有進一步合作或面試意向，歡迎透過以下方式聯繫：\n\n📫 **Email**：可點擊下方區塊直接寄信\n💼 **LinkedIn / 履歷檔案**：歡迎前往聯絡區塊查看更多資料！`,
      action: {
        title: "📬 取得聯繫",
        btnText: "👉 前往「聯絡羿恬與履歷下載區」",
        anchor: "#contact"
      }
    },
    fallback: {
      text: `這是一個很棒的問題！我了解羿恬在**企管專案、產業分析、市場策略與專案管理**上的完整實績。\n\n建議您可以點擊上方的快捷膠囊標籤，或直接詢問：\n• 「介紹產業分析專案」\n• 「企管專長有哪些」\n• 「如何聯繫羿恬」`,
      action: null
    }
  };

  // 智慧關鍵字與語意匹配器 (Intent Classifier)
  function classifyIntent(query) {
    const q = query.toLowerCase().trim();

    if (/自我介紹|是誰|背景|介紹一下|你好|嗨|hello|hi|resume|簡歷/.test(q)) {
      return 'intro';
    }
    if (/產業|分析|研究|專案|成果|case|project|市場/.test(q)) {
      return 'industry_project';
    }
    if (/專長|技能|能力|企管|管理|會什麼|優勢|skill/.test(q)) {
      return 'mgmt_skills';
    }
    if (/聯絡|連絡|mail|email|信箱|電話|面試|合作|contact|line/.test(q)) {
      return 'contact';
    }
    return 'fallback';
  }

  // --- 2. 構建 UI 結構 (Inject DOM Elements) ---
  function initWidget() {
    // 建立浮動按鈕
    const launcher = document.createElement('button');
    launcher.id = 'ai-avatar-launcher';
    launcher.setAttribute('aria-label', '打開 AI 數位履歷分身');
    launcher.innerHTML = `
      <div class="ai-launcher-badge"></div>
      <svg class="ai-launcher-icon" viewBox="0 0 24 24">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18 2.5 2.5 0 0 0 10 15.5 2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5Z"/>
      </svg>
    `;

    // 建立聊天視窗
    const windowEl = document.createElement('div');
    windowEl.id = 'ai-avatar-window';
    windowEl.innerHTML = `
      <div class="ai-header">
        <div class="ai-header-profile">
          <div class="ai-avatar-core">
            <svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18 2.5 2.5 0 0 0 10 15.5 2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5Z"/></svg>
          </div>
          <div class="ai-header-info">
            <h4>羿恬 AI 數位分身 <span style="font-size: 10px; background: rgba(56,189,248,0.2); color:#38bdf8; padding: 2px 6px; border-radius: 4px;">Twin</span></h4>
            <div class="ai-header-status">
              <span class="ai-status-dot"></span> 實時在線 • 企管與專案顧問
            </div>
          </div>
        </div>
        <button class="ai-close-btn" id="ai-close-trigger" aria-label="關閉視窗">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- 快速提問膠囊 (Chips) -->
      <div class="ai-chips-wrapper">
        <button class="ai-chip" data-intent="intro">💡 自我介紹</button>
        <button class="ai-chip" data-intent="industry_project">📊 介紹產業分析專案</button>
        <button class="ai-chip" data-intent="mgmt_skills">💼 企管核心專長</button>
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
          // 觸發預設歡迎詞
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
      const welcomeText = "你好！我是羿恬的 AI 分身，隨時為您介紹羿恬的企管專案與產業專案成果，想了解甚麼呢？";
      streamBotMessage(welcomeText, null);
    }

    // 格式化文本（處理 **粗體** 與換行）
    function formatMessageText(text) {
      let formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#38bdf8;">$1</strong>')
        .replace(/\n/g, '<br/>');
      return formatted;
    }

    // 流式打字機效果 (Simulated Streaming Token by Token)
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
      const speed = 15; // 毫秒/字

      function typeNextChar() {
        if (currentIndex < fullText.length) {
          currentIndex += 2; // 一次吐2個字元更符合現代 LLM 流暢度
          const currentSub = fullText.substring(0, Math.min(currentIndex, fullText.length));
          bubble.innerHTML = formatMessageText(currentSub);
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
          setTimeout(typeNextChar, speed);
        } else {
          // 打字完成，移除光標
          bubble.classList.remove('ai-typing-cursor');
          bubble.innerHTML = formatMessageText(fullText);

          // 若有專案導覽卡片，生成互動按鈕 (Generative UI)
          if (actionCard) {
            const card = document.createElement('div');
            card.className = 'ai-project-card';
            card.innerHTML = `
              <div class="ai-project-card-title">${actionCard.title}</div>
              <button class="ai-jump-btn" data-target="${actionCard.anchor}">
                ${actionCard.btnText}
              </button>
            `;

            // 綁定精準跳轉與平滑滾動 + 高亮閃爍特效
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

      // 渲染使用者氣泡
      const userRow = document.createElement('div');
      userRow.className = 'ai-msg-row user';
      userRow.innerHTML = `<div class="ai-msg-bubble">${escapeHtml(text)}</div>`;
      messagesContainer.appendChild(userRow);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      inputField.value = '';

      // 根據意圖匹配知識庫
      const intentKey = classifyIntent(text);
      const matchedData = KNOWLEDGE_BASE[intentKey] || KNOWLEDGE_BASE.fallback;

      // 稍作擬人延遲後流式回覆
      setTimeout(() => {
        streamBotMessage(matchedData.text, matchedData.action);
      }, 400);
    }

    // 處理膠囊點擊 (Chips Click)
    document.querySelectorAll('.ai-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const intent = chip.getAttribute('data-intent');
        const chipText = chip.textContent.replace(/^[^\w\s\u4e00-\u9fa5]+/, '').trim();
        handleUserSubmit(chipText);
      });
    });

    // 處理表單發送
    inputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = inputField.value.trim();
      if (val) handleUserSubmit(val);
    });

    // 平滑跳轉到目標區塊 (Smooth Anchor Jump + Pulse Glow Effect)
    function handleSmoothScroll(targetSelector) {
      const targetEl = document.querySelector(targetSelector);
      if (targetEl) {
        // 在手機版上如果遮住可以縮小或維持
        if (window.innerWidth <= 480) {
          toggleChat(false); // 手機版跳轉時貼心自動收合視窗
        }

        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // 為目標元素增添科技藍脈衝光暈高亮 2 秒
        const originalTransition = targetEl.style.transition;
        const originalBoxShadow = targetEl.style.boxShadow;
        targetEl.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
        targetEl.style.boxShadow = '0 0 35px rgba(6, 182, 212, 0.7)';
        targetEl.style.borderRadius = '16px';

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
