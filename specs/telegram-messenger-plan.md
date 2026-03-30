# Telegram-мессенджер ATON — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pixel-perfect Telegram-style messenger UI (two screens) as a single HTML file, matching the ATON design system spec at `/Users/zevaeva/Спецификация/telegram-messenger-spec.md`.

**Architecture:** Single-file HTML/CSS/JS app (same pattern as `aton-ds.html`). Two screens managed via JS show/hide with CSS transitions. All styles inline in `<style>`, all logic in `<script>`. No build tools, no frameworks.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, backdrop-filter, transitions), vanilla JavaScript

**Spec reference:** `/Users/zevaeva/Спецификация/telegram-messenger-spec.md` — all measurements, colors, and behaviors MUST match this file exactly.

**Design system reference:** `/Users/zevaeva/aton-ds.html` — reuse CSS patterns (font-face, CSS variables, button classes) from this file.

---

## File Structure

| File | Purpose |
|------|---------|
| `/Users/zevaeva/telegram-messenger.html` | Single-file app: both screens, all CSS, all JS |

---

### Task 1: HTML scaffold + CSS variables + font setup

**Files:**
- Create: `/Users/zevaeva/telegram-messenger.html`

- [ ] **Step 1: Create the base HTML file with DOCTYPE, meta viewport, font-face, and CSS custom properties**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>ATON Messenger</title>
  <style>
    @font-face {
      font-family: 'Gotham';
      src: local('Gotham'), local('Inter'), local('SF Pro Display');
      font-weight: 500;
      font-style: normal;
    }
    @font-face {
      font-family: 'Gotham';
      src: local('Gotham Bold'), local('Inter Bold'), local('SF Pro Display Bold');
      font-weight: 700;
      font-style: normal;
    }

    :root {
      --c0: #FFFFFF;
      --c1: #202020;
      --c2: #8D9398;
      --c4: #E3E9EF;
      --c5: #EFF3F7;
      --c6: #F8FBFD;
      --c9: #F4A42C;
      --c10: #22C275;
      --c12: #D8013E;
      --c13: #E8E2FF;
      --c14: #7000FF;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Gotham', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
      background: var(--c0);
      color: var(--c1);
      -webkit-font-smoothing: antialiased;
      overflow: hidden;
    }

    .device {
      width: 393px;
      height: 852px;
      position: relative;
      overflow: hidden;
      margin: 0 auto;
      background: var(--c0);
    }
  </style>
</head>
<body>
  <div class="device">
    <!-- Screen 1: Feed -->
    <div id="screen-feed" class="screen screen--active"></div>
    <!-- Screen 2: Profile -->
    <div id="screen-profile" class="screen"></div>
  </div>
  <script></script>
</body>
</html>
```

- [ ] **Step 2: Add screen transition CSS**

Add to `<style>`:

```css
.screen {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background: var(--c0);
  transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1);
}

.screen--active {
  transform: translateX(0);
}

#screen-profile {
  transform: translateX(100%);
}

#screen-profile.screen--active {
  transform: translateX(0);
}

#screen-feed.screen--pushed {
  transform: translateX(-30%);
}
```

- [ ] **Step 3: Open in browser and verify the blank 393x852 device frame renders**

Open `telegram-messenger.html` in browser. Should see a white 393x852 rectangle centered on page.

- [ ] **Step 4: Commit**

```bash
cd /Users/zevaeva && git init telegram-messenger-project 2>/dev/null; cd /Users/zevaeva
git add telegram-messenger.html
git commit -m "feat: scaffold HTML with ATON design tokens and screen transitions"
```

---

### Task 2: Screen 1 — Status bar + Channel header (1.1 + 1.2)

**Files:**
- Modify: `/Users/zevaeva/telegram-messenger.html`

- [ ] **Step 1: Add status bar HTML inside `#screen-feed`**

```html
<!-- Status bar — 54px -->
<div class="status-bar">
  <span class="status-time">9:41</span>
</div>
```

Add CSS:

```css
.status-bar {
  height: 54px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--c1);
}
```

- [ ] **Step 2: Add channel header HTML after status bar**

```html
<!-- Header — 56px -->
<div class="channel-header">
  <div class="channel-header__left" onclick="openProfile()">
    <div class="avatar avatar--36"></div>
    <div class="channel-header__info">
      <div class="channel-header__name">ATON Investments</div>
      <div class="channel-header__subs">12 480 подписчиков</div>
    </div>
  </div>
</div>
```

Add CSS:

```css
.channel-header {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid var(--c4);
}

.channel-header__left {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.avatar {
  border-radius: 50%;
  background: linear-gradient(135deg, var(--c14), var(--c1));
  flex-shrink: 0;
}

.avatar--36 {
  width: 36px;
  height: 36px;
  margin-right: 12px;
}

.avatar--28 {
  width: 28px;
  height: 28px;
  margin-right: 8px;
}

.channel-header__name {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: var(--c1);
}

.channel-header__subs {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: var(--c2);
}
```

- [ ] **Step 3: Verify in browser — status bar 54px + header 56px with avatar gradient and text**

- [ ] **Step 4: Commit**

```bash
git add telegram-messenger.html
git commit -m "feat: add status bar and channel header with avatar"
```

---

### Task 3: Screen 1 — Pinned messages bar (1.3)

**Files:**
- Modify: `/Users/zevaeva/telegram-messenger.html`

- [ ] **Step 1: Add pinned bar HTML after channel header**

```html
<!-- Pinned messages bar — 44px -->
<div class="pinned-bar" onclick="cyclePinnedMessage()">
  <div class="pinned-bar__accent"></div>
  <div class="pinned-bar__content">
    <div class="pinned-bar__label">Закреплённое сообщение <span id="pinned-current">1</span> из <span id="pinned-total">3</span></div>
    <div class="pinned-bar__text" id="pinned-text"></div>
  </div>
  <div class="pinned-bar__arrow">▼</div>
</div>
```

- [ ] **Step 2: Add pinned bar CSS**

```css
.pinned-bar {
  height: 44px;
  background: var(--c6);
  display: flex;
  align-items: center;
  padding: 0 16px 0 0;
  cursor: pointer;
  position: relative;
}

.pinned-bar__accent {
  width: 3px;
  height: 100%;
  background: var(--c14);
  flex-shrink: 0;
}

.pinned-bar__content {
  flex: 1;
  overflow: hidden;
  padding: 0 12px;
}

.pinned-bar__label {
  font-size: 11px;
  font-weight: 600;
  color: var(--c14);
  line-height: 14px;
}

.pinned-bar__text {
  font-size: 13px;
  font-weight: 500;
  color: var(--c1);
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: opacity 0.2s;
}

.pinned-bar__arrow {
  font-size: 11px;
  color: var(--c2);
  flex-shrink: 0;
}
```

- [ ] **Step 3: Add pinned messages data and cycling logic in `<script>`**

```javascript
const pinnedMessages = [
  '📊 Рынок сегодня: индекс МосБиржи +1.8%',
  '🔥 Новая инвестидея: Сбербанк — целевая цена 340₽',
  '📈 Еженедельный дайджест: топ-5 акций недели'
];
let pinnedIndex = 0;

function updatePinnedDisplay() {
  document.getElementById('pinned-current').textContent = pinnedIndex + 1;
  document.getElementById('pinned-total').textContent = pinnedMessages.length;
  const textEl = document.getElementById('pinned-text');
  textEl.style.opacity = '0';
  setTimeout(() => {
    textEl.textContent = pinnedMessages[pinnedIndex];
    textEl.style.opacity = '1';
  }, 100);
}

function cyclePinnedMessage() {
  pinnedIndex = (pinnedIndex + 1) % pinnedMessages.length;
  updatePinnedDisplay();
}

updatePinnedDisplay();
```

- [ ] **Step 4: Verify in browser — pinned bar shows message, clicking cycles through 3 messages with fade**

- [ ] **Step 5: Commit**

```bash
git add telegram-messenger.html
git commit -m "feat: add pinned messages bar with cycling animation"
```

---

### Task 4: Screen 1 — Feed area with text+image post

**Files:**
- Modify: `/Users/zevaeva/telegram-messenger.html`

- [ ] **Step 1: Add feed container HTML after pinned bar**

```html
<!-- Feed — scrollable -->
<div class="feed" id="feed">
  <!-- Posts will go here -->
</div>
```

Add CSS:

```css
.feed {
  position: absolute;
  top: 154px; /* 54 + 56 + 44 */
  bottom: 114px; /* 80 + 34 */
  left: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  -webkit-overflow-scrolling: touch;
}
```

- [ ] **Step 2: Add post common styles**

```css
.post {
  margin-bottom: 20px;
}

.post__author {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.post__author-name {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: var(--c1);
}

.post__author-time {
  font-size: 12px;
  font-weight: 500;
  color: var(--c2);
  margin-left: 8px;
}

.post__image {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--c5), var(--c4));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c2);
  font-size: 13px;
  font-weight: 500;
}

.post__text {
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: var(--c1);
}

.post__text b {
  font-weight: 700;
}

.post__text-secondary {
  color: var(--c2);
}

.post__metrics {
  display: flex;
  gap: 16px;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c2);
}
```

- [ ] **Step 3: Add first post (text + image) HTML inside `.feed`**

```html
<!-- Post 1: Text + Image -->
<div class="post">
  <div class="post__author">
    <div class="avatar avatar--28"></div>
    <span class="post__author-name">ATON Investments</span>
    <span class="post__author-time">14:30</span>
  </div>
  <div class="post__image" style="height: 180px;">
    📈 Инфографика: разбор Сбера
  </div>
  <div class="post__text">
    <b>Сбербанк: целевая цена 340₽</b><br>
    <span class="post__text-secondary">Разбираем отчётность за Q4 и перспективы на 2026 год. Консенсус аналитиков позитивный.</span>
  </div>
  <div class="post__metrics">
    <span>👁 4.2K</span>
    <span>💬 128</span>
  </div>
</div>
```

- [ ] **Step 4: Verify in browser — feed scrolls, post shows avatar, image placeholder, text, metrics**

- [ ] **Step 5: Commit**

```bash
git add telegram-messenger.html
git commit -m "feat: add scrollable feed with text+image post"
```

---

### Task 5: Screen 1 — Text-only post + Carousel post

**Files:**
- Modify: `/Users/zevaeva/telegram-messenger.html`

- [ ] **Step 1: Add text-only post HTML after first post**

```html
<!-- Post 2: Text only -->
<div class="post">
  <div class="post__author">
    <div class="avatar avatar--28"></div>
    <span class="post__author-name">ATON Investments</span>
    <span class="post__author-time">12:15</span>
  </div>
  <div class="post__text">
    <b>Дивидендный сезон 2026</b><br>
    <span class="post__text-secondary">Собрали топ-10 компаний с самой высокой дивидендной доходностью на ближайший квартал. Лидеры: Лукойл (12.4%), Сургутнефтегаз (11.8%), МТС (9.2%).</span>
  </div>
  <div class="post__metrics">
    <span>👁 3.8K</span>
    <span>💬 94</span>
  </div>
</div>
```

- [ ] **Step 2: Add carousel post HTML**

```html
<!-- Post 3: Carousel -->
<div class="post">
  <div class="post__author">
    <div class="avatar avatar--28"></div>
    <span class="post__author-name">ATON Investments</span>
    <span class="post__author-time">10:00</span>
  </div>
  <div class="carousel" id="carousel-1">
    <div class="carousel__track">
      <div class="carousel__slide" style="background: linear-gradient(135deg, #7000FF20, #E8E2FF);">
        📊 Слайд 1: Обзор рынка
      </div>
      <div class="carousel__slide" style="background: linear-gradient(135deg, #E8E2FF, #EFF3F7);">
        📈 Слайд 2: Динамика индексов
      </div>
      <div class="carousel__slide" style="background: linear-gradient(135deg, #EFF3F7, #7000FF20);">
        🏦 Слайд 3: Топ секторов
      </div>
    </div>
    <div class="carousel__dots" id="dots-carousel-1"></div>
  </div>
  <div class="post__text" style="margin-top: 8px;">
    <b>Еженедельный обзор рынка</b><br>
    <span class="post__text-secondary">3 ключевых графика, которые стоит увидеть</span>
  </div>
  <div class="post__metrics">
    <span>👁 6.1K</span>
    <span>💬 215</span>
  </div>
</div>
```

- [ ] **Step 3: Add carousel CSS**

```css
.carousel {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  margin-bottom: 8px;
}

.carousel__track {
  display: flex;
  transition: transform 0.3s ease-out;
  touch-action: pan-y;
}

.carousel__slide {
  min-width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--c1);
}

.carousel__dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 8px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.carousel__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  transition: background 0.2s;
}

.carousel__dot--active {
  background: var(--c14);
}
```

- [ ] **Step 4: Add carousel swipe JS**

```javascript
function initCarousel(carouselEl) {
  const track = carouselEl.querySelector('.carousel__track');
  const slides = track.children;
  const dotsContainer = carouselEl.querySelector('.carousel__dots');
  let current = 0;
  let startX = 0;
  let diff = 0;

  // Create dots
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('div');
    dot.className = 'carousel__dot' + (i === 0 ? ' carousel__dot--active' : '');
    dotsContainer.appendChild(dot);
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, slides.length - 1));
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('.carousel__dot').forEach((d, i) => {
      d.classList.toggle('carousel__dot--active', i === current);
    });
  }

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    track.style.transition = 'none';
  });

  track.addEventListener('touchmove', (e) => {
    diff = e.touches[0].clientX - startX;
    track.style.transform = `translateX(calc(-${current * 100}% + ${diff}px))`;
  });

  track.addEventListener('touchend', () => {
    track.style.transition = 'transform 0.3s ease-out';
    if (Math.abs(diff) > 50) {
      goTo(current + (diff < 0 ? 1 : -1));
    } else {
      goTo(current);
    }
    diff = 0;
  });
}

document.querySelectorAll('.carousel').forEach(initCarousel);
```

- [ ] **Step 5: Verify — text post renders, carousel swipes between 3 slides with dot indicators**

- [ ] **Step 6: Commit**

```bash
git add telegram-messenger.html
git commit -m "feat: add text-only post and carousel post with swipe"
```

---

### Task 6: Screen 1 — Poll post

**Files:**
- Modify: `/Users/zevaeva/telegram-messenger.html`

- [ ] **Step 1: Add poll post HTML after carousel post**

```html
<!-- Post 4: Poll -->
<div class="post">
  <div class="post__author">
    <div class="avatar avatar--28"></div>
    <span class="post__author-name">ATON Investments</span>
    <span class="post__author-time">09:00</span>
  </div>
  <div class="post__text" style="margin-bottom: 8px;">
    <b>Какой сектор будет лидером в Q2 2026?</b>
  </div>
  <div class="poll" id="poll-1" data-voted="false">
    <div class="poll__option" data-percent="45" onclick="votePoll(this)">
      <div class="poll__bar"></div>
      <span class="poll__text">IT и технологии</span>
      <span class="poll__percent">45%</span>
    </div>
    <div class="poll__option" data-percent="30" onclick="votePoll(this)">
      <div class="poll__bar"></div>
      <span class="poll__text">Нефть и газ</span>
      <span class="poll__percent">30%</span>
    </div>
    <div class="poll__option" data-percent="25" onclick="votePoll(this)">
      <div class="poll__bar"></div>
      <span class="poll__text">Финансы</span>
      <span class="poll__percent">25%</span>
    </div>
  </div>
  <div class="poll__votes">482 голоса</div>
  <div class="post__metrics">
    <span>👁 5.4K</span>
  </div>
</div>
```

- [ ] **Step 2: Add poll CSS**

```css
.poll {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.poll__option {
  background: var(--c5);
  border-radius: 10px;
  padding: 10px 14px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.poll__bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: var(--c13);
  border-radius: 10px;
  transition: width 0.3s ease-out;
}

.poll__text {
  position: relative;
  font-size: 13px;
  font-weight: 500;
  color: var(--c1);
}

.poll__percent {
  position: relative;
  font-size: 13px;
  font-weight: 600;
  color: var(--c1);
  opacity: 0;
  transition: opacity 0.3s;
}

.poll--voted .poll__percent {
  opacity: 1;
}

.poll--voted .poll__option {
  cursor: default;
}

.poll--voted .poll__bar {
  width: var(--bar-width);
}

.poll__votes {
  font-size: 12px;
  font-weight: 500;
  color: var(--c2);
  margin-top: 6px;
}
```

- [ ] **Step 3: Add poll voting JS**

```javascript
function votePoll(optionEl) {
  const poll = optionEl.closest('.poll');
  if (poll.classList.contains('poll--voted')) return;

  poll.classList.add('poll--voted');
  poll.querySelectorAll('.poll__option').forEach(opt => {
    const percent = opt.getAttribute('data-percent');
    opt.style.setProperty('--bar-width', percent + '%');
  });
}
```

- [ ] **Step 4: Verify — poll options render, clicking any option animates all bars and shows percentages**

- [ ] **Step 5: Commit**

```bash
git add telegram-messenger.html
git commit -m "feat: add poll post with animated voting"
```

---

### Task 7: Screen 1 — CTA floating bar (1.5)

**Files:**
- Modify: `/Users/zevaeva/telegram-messenger.html`

- [ ] **Step 1: Add CTA bar HTML at the end of `#screen-feed` (after `.feed`, not inside it)**

```html
<!-- CTA floating bar -->
<div class="cta-bar">
  <button class="cta-btn cta-btn--main">Открыть счёт</button>
  <button class="cta-btn cta-btn--secondary">Связаться</button>
</div>
```

- [ ] **Step 2: Add CTA bar CSS**

```css
.cta-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 12px 16px 46px 16px; /* 12 top + 34 safe area = 46 bottom */
  display: flex;
  gap: 8px;
}

.cta-btn {
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 16px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
  transition: transform 0.1s;
}

.cta-btn:active {
  transform: scale(0.97);
}

.cta-btn--main {
  background: var(--c1);
  color: var(--c0);
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.15);
}

.cta-btn--secondary {
  background: var(--c5);
  color: var(--c1);
}
```

- [ ] **Step 3: Verify — two buttons 50/50 at bottom, blur visible when scrolling feed content underneath**

- [ ] **Step 4: Commit**

```bash
git add telegram-messenger.html
git commit -m "feat: add floating CTA bar with blur backdrop"
```

---

### Task 8: Screen 2 — Profile: gradient cover + header (2.1)

**Files:**
- Modify: `/Users/zevaeva/telegram-messenger.html`

- [ ] **Step 1: Add profile screen HTML inside `#screen-profile`**

```html
<!-- Status bar — 54px (transparent over gradient) -->
<div class="profile-cover">
  <div class="profile-cover__back" onclick="closeProfile()">← Назад</div>
  <div class="profile-cover__bottom">
    <div class="profile-cover__avatar">A</div>
    <div class="profile-cover__name">ATON Investments</div>
    <div class="profile-cover__meta">12 480 подписчиков · Канал</div>
  </div>
</div>
```

- [ ] **Step 2: Add profile cover CSS**

```css
.profile-cover {
  height: 200px;
  background: linear-gradient(135deg, #7000FF 0%, #4A00B0 40%, #202020 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  position: relative;
}

.profile-cover__back {
  position: absolute;
  top: 54px;
  left: 16px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}

.profile-cover__back:active {
  opacity: 0.6;
}

.profile-cover__bottom {
  display: flex;
  flex-direction: column;
}

.profile-cover__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
}

.profile-cover__name {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  line-height: 28px;
}

.profile-cover__meta {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
}
```

- [ ] **Step 3: Verify — gradient cover shows with back button at safe area, avatar "A", name, subscribers**

- [ ] **Step 4: Commit**

```bash
git add telegram-messenger.html
git commit -m "feat: add profile screen gradient cover"
```

---

### Task 9: Screen 2 — Description + menu items (2.2 + 2.3)

**Files:**
- Modify: `/Users/zevaeva/telegram-messenger.html`

- [ ] **Step 1: Add description and menu HTML after `.profile-cover` inside `#screen-profile`**

```html
<!-- Channel description -->
<div class="profile-desc">
  Инвестиционные идеи, аналитика и обзоры рынка от экспертов ATON. Управляем капиталом с 1991 года.
</div>

<!-- Menu items -->
<div class="profile-menu">
  <div class="profile-menu__item">
    <span class="profile-menu__text">О компании</span>
    <span class="profile-menu__arrow">›</span>
  </div>
  <div class="profile-menu__item">
    <span class="profile-menu__text">О приложении</span>
    <span class="profile-menu__arrow">›</span>
  </div>
  <div class="profile-menu__item profile-menu__item--last">
    <span class="profile-menu__text profile-menu__text--red">Выйти из аккаунта</span>
  </div>
</div>
```

- [ ] **Step 2: Add description and menu CSS**

```css
.profile-desc {
  padding: 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: var(--c2);
  border-bottom: 1px solid var(--c4);
}

.profile-menu {
  padding: 0 16px;
}

.profile-menu__item {
  padding: 16px 0;
  border-bottom: 1px solid var(--c4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.profile-menu__item:active {
  opacity: 0.6;
}

.profile-menu__item--last {
  border-bottom: none;
}

.profile-menu__text {
  font-size: 16px;
  font-weight: 500;
  color: var(--c1);
}

.profile-menu__text--red {
  color: var(--c12);
}

.profile-menu__arrow {
  font-size: 18px;
  color: var(--c2);
}
```

- [ ] **Step 3: Verify — description with gray text, 3 menu items, "Выйти" in red without arrow/border**

- [ ] **Step 4: Commit**

```bash
git add telegram-messenger.html
git commit -m "feat: add profile description and menu items"
```

---

### Task 10: Navigation — screen transitions

**Files:**
- Modify: `/Users/zevaeva/telegram-messenger.html`

- [ ] **Step 1: Add navigation JS functions**

```javascript
function openProfile() {
  document.getElementById('screen-feed').classList.add('screen--pushed');
  document.getElementById('screen-profile').classList.add('screen--active');
}

function closeProfile() {
  document.getElementById('screen-profile').classList.remove('screen--active');
  document.getElementById('screen-feed').classList.remove('screen--pushed');
}
```

- [ ] **Step 2: Verify — clicking avatar/name on feed opens profile (slides from right), "← Назад" returns to feed**

- [ ] **Step 3: Commit**

```bash
git add telegram-messenger.html
git commit -m "feat: add screen transitions between feed and profile"
```

---

### Task 11: Final polish — verify against spec

**Files:**
- Modify: `/Users/zevaeva/telegram-messenger.html`

- [ ] **Step 1: Pixel-check all measurements against spec**

Open spec at `/Users/zevaeva/Спецификация/telegram-messenger-spec.md` and verify:
- Status bar: 54px height
- Header: 56px height, avatar 36x36, gradient, 1px border
- Pinned bar: 44px, bg #F8FBFD, left border 3px #7000FF
- Feed: top 154px, bottom 114px
- Post spacing: 20px margin-bottom
- Post avatars: 28x28
- Image radius: 12px
- Poll gaps: 6px, radius 10px, bar color #E8E2FF
- CTA: bottom 0, padding 12px 16px 46px, buttons 48px height, radius 16px, gap 8px
- Profile cover: 200px, gradient exact, back at top:54px left:16px
- Profile avatar: 64x64, border 2px
- Menu items: padding 16px 0, border-bottom 1px #E3E9EF

- [ ] **Step 2: Fix any discrepancies found**

- [ ] **Step 3: Cross-check button styles against aton-ds.html — ensure .btn-main shadow, radius, font match**

Reference from `aton-ds.html`:
- `.btn-main`: bg var(--c1), box-shadow 0px 15px 30px rgba(0,0,0,0.15), border-radius 16px, font 16px/22px weight 500
- `.btn-secondary`: bg var(--c5), no shadow, same radius/font

- [ ] **Step 4: Verify all animations**
- Pinned message fade-crossfade (200ms opacity transition)
- Poll bar animation (300ms ease-out width transition)
- Carousel swipe (0.3s ease-out transform)
- Screen transitions (0.35s cubic-bezier)
- Button press (scale 0.97 on :active)

- [ ] **Step 5: Commit**

```bash
git add telegram-messenger.html
git commit -m "fix: final polish — verify all measurements and animations against spec"
```

---

## Spec Coverage Check

| Spec Section | Task |
|---|---|
| 1.1 Status bar 54px | Task 2 |
| 1.2 Header 56px + avatar + name | Task 2 |
| 1.3 Pinned messages bar 44px | Task 3 |
| 1.4 Feed — text+image post | Task 4 |
| 1.4 Feed — text-only post | Task 5 |
| 1.4 Feed — carousel post | Task 5 |
| 1.4 Feed — poll post | Task 6 |
| 1.5 CTA floating bar | Task 7 |
| 2.1 Profile gradient cover | Task 8 |
| 2.2 Profile description | Task 9 |
| 2.3 Profile menu items | Task 9 |
| Transitions feed ↔ profile | Task 10 |
| Pinned cycling animation | Task 3 |
| Poll vote animation | Task 6 |
| Carousel swipe | Task 5 |
| Pixel-perfect verification | Task 11 |
