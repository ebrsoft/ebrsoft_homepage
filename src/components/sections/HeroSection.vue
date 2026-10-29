<script setup>
import { companyInfo } from '../../data/companyInfo.js'
import { heroStats } from '../../data/businessContent.js'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div id="hero" class="hero-split-wrapper">
    <!-- [1번째 영역: 브랜드 비전 (순수 화이트 + EBRSOFT BRAND VISION 버튼 색상 적용 + E·B·R 이니셜 조합 강조)] -->
    <section id="hero-vision" class="vision-banner-section" aria-label="EBRSoft 브랜드 비전">
      <div class="container vision-inner">
        <!-- 제일 상단 EBRSOFT BRAND VISION: '어떻게 연결을 돕나요?' 버튼과 동일한 그라데이션 색상 적용 -->
        <div class="vision-badge-gradient">
          <span class="vision-badge-dot" aria-hidden="true"></span>
          <span class="slogan-eyebrow">EBRSOFT BRAND VISION</span>
        </div>

        <!-- “Experience Beyond Reality” (모바일에서는 “Experience / Beyond Reality” 2줄로 표시) -->
        <p class="slogan-en" aria-label="Experience Beyond Reality">
          <span class="slogan-line">
            <span class="quote-mark">“</span><span class="word-group"><span class="ebr-initial initial-e">E</span>xperience</span>
          </span>
          <span class="slogan-line">
            <span class="word-group"><span class="ebr-initial initial-b">B</span>eyond</span>
            <span class="word-group"><span class="ebr-initial initial-r">R</span>eality</span><span class="quote-mark">”</span>
          </span>
        </p>

        <p class="slogan-ko">{{ companyInfo.sloganKo }}</p>

        <button
          type="button"
          class="scroll-down-pill"
          @click="scrollTo('hero-story')"
          aria-label="아래 연결 스토리 영역으로 이동"
        >
          ↓ 아래로 스크롤하여 연결 스토리 보기
        </button>
      </div>
    </section>

    <!-- [2번째 영역: 분리된 소개 및 연결 스토리 영역] -->
    <section id="hero-story" class="story-intro-section" aria-label="EBRSoft 서비스 소개">
      <div class="container story-inner">
        <span class="story-eyebrow">SEAMLESS HOSPITALITY CONNECTION</span>

        <h1 class="hero-title">
          여행이 시작되는<br class="mobile-br" />
          <strong class="hero-bold-phrase">OTA부터 호텔까지</strong><span class="desktop-comma">,</span><br />
          소중한 예약 정보가<br class="mobile-br" />
          실시간으로 흐르도록<br class="mobile-br" />
          연결을 돕습니다
        </h1>

        <p class="hero-description">
          복잡하게 흩어진 숙박·티켓·투어 데이터를<br class="mobile-br" />
          하나의 표준화된 웹 플랫폼으로 이어,<br />
          고객과 호텔 모두에게<br class="mobile-br" />
          가장 편안한 예약 경험을 만들어 줍니다.
        </p>

        <!-- Point Gradient CTA Button + Secondary Button -->
        <div class="hero-actions">
          <button type="button" class="btn-primary" @click="scrollTo('core')">
            어떻게 연결을 돕나요?
          </button>
          <button type="button" class="btn-secondary" @click="scrollTo('contact')">
            도입 · 제휴 상담 문의
          </button>
        </div>

        <!-- 3 Big Impact Numbers (Original Brand Colors Maintained) -->
        <div class="stats-grid" aria-label="EBRSoft 핵심 실적 지표">
          <div
            v-for="stat in heroStats"
            :key="stat.id"
            class="stat-item"
            :class="`accent-${stat.color}`"
          >
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-sub">{{ stat.sub }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* =========================================================================
   1번째 영역: 순수 화이트 + EBRSOFT BRAND VISION 그라데이션 배지 + E·B·R 이니셜 강조
   ========================================================================= */
.vision-banner-section {
  background: #ffffff;
  min-height: 460px;
  padding: 112px 0 104px;
  border-bottom: 1px solid var(--color-border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.vision-inner {
  max-width: 900px;
}

/* '어떻게 연결을 돕나요?' 버튼과 동일한 브랜드 그라데이션 색상 적용 */
.vision-badge-gradient {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: var(--radius-full);
  background: var(--gradient-brand);
  box-shadow: var(--shadow-brand);
  margin-bottom: 28px;
}

.vision-badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ffffff;
}

.slogan-eyebrow {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #ffffff;
}

/* “Experience Beyond Reality” 첫 문자 E, B, R 만 Bold(900) 유지, 나머지 글자는 Light/Regular(300) 적용 */
.slogan-en {
  font-size: clamp(2.15rem, 5.3vw, 3.95rem);
  font-weight: 300;
  line-height: 1.25;
  letter-spacing: -0.025em;
  color: #090d16;
  margin: 0 0 20px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 0.24em;
}

.slogan-line {
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.24em;
}

.quote-mark {
  color: #94a3b8;
  font-weight: 300;
}

.word-group {
  display: inline-flex;
  align-items: baseline;
  font-weight: 300;
}

.ebr-initial {
  display: inline-block;
  position: relative;
  font-weight: 900;
  padding: 0 2px;
  margin-right: 1px;
}

/* 각 첫 글자 E · B · R 에 브랜드 컬러와 하단 언더라인 바 적용 */
.initial-e {
  color: var(--color-brand-magenta);
}
.initial-b {
  color: var(--color-brand-purple);
}
.initial-r {
  color: var(--color-brand-navy);
}

.ebr-initial::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px;
  height: 4px;
  border-radius: 999px;
}

.initial-e::after { background: var(--color-brand-magenta); }
.initial-b::after { background: var(--color-brand-purple); }
.initial-r::after { background: var(--color-brand-navy); }

.slogan-ko {
  font-size: clamp(1.12rem, 2.2vw, 1.45rem);
  font-weight: 800;
  color: #111827;
  margin: 0;
  letter-spacing: -0.015em;
}

.scroll-down-pill {
  margin-top: 44px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: var(--radius-full);
  background: #f8fafc;
  border: 1px solid var(--color-border);
  color: #475569;
  font-size: 0.82rem;
  font-weight: 700;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.scroll-down-pill:hover {
  border-color: #090d16;
  color: #090d16;
  transform: translateY(2px);
}

/* =========================================================================
   2번째 영역: 분리된 소개 & 연결 스토리 영역 (#f8fafc 소프트 배경)
   ========================================================================= */
.story-intro-section {
  background: #f8fafc;
  padding: 88px 0 84px;
  border-bottom: 1px solid var(--color-border-subtle);
  text-align: center;
}

.story-inner {
  max-width: 880px;
}

.story-eyebrow {
  display: block;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 14px;
}

.hero-title {
  font-size: clamp(1.6rem, 3.3vw, 2.4rem);
  font-weight: 400;
  line-height: 1.44;
  letter-spacing: -0.025em;
  color: #090d16;
}

.hero-bold-phrase {
  font-weight: 800;
  color: #090d16;
}

.mobile-br {
  display: none;
}

.hero-description {
  font-size: clamp(0.98rem, 1.45vw, 1.12rem);
  color: #111827;
  font-weight: 500;
  line-height: 1.72;
  max-width: 680px;
  margin: 20px auto 0;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 36px;
}

.btn-primary {
  padding: 14px 28px;
  border-radius: 12px;
  background: var(--gradient-brand);
  color: #ffffff;
  font-weight: 800;
  font-size: 0.96rem;
  box-shadow: var(--shadow-brand);
  transition: transform 0.2s var(--ease-out-expo), opacity 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  opacity: 0.96;
}

.btn-secondary {
  padding: 14px 26px;
  border-radius: 12px;
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  color: #090d16;
  font-weight: 700;
  font-size: 0.96rem;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.btn-secondary:hover {
  border-color: #090d16;
  transform: translateY(-2px);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 720px;
  margin: 52px auto 0;
  padding-top: 36px;
  border-top: 1px solid var(--color-border);
}

.stat-item {
  background: #ffffff;
  border: 1px solid var(--color-border-subtle);
  border-radius: 16px;
  padding: 18px 14px;
  box-shadow: var(--shadow-xs);
}

.stat-value {
  font-size: clamp(1.65rem, 3.2vw, 2.35rem);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.accent-navy .stat-value { color: var(--color-brand-navy); }
.accent-magenta .stat-value { color: var(--color-brand-magenta); }
.accent-purple .stat-value { color: var(--color-brand-purple); }

.stat-label {
  font-size: 0.92rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-top: 6px;
}

.stat-sub {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-top: 3px;
}

@media (max-width: 767px) {
  .vision-banner-section {
    min-height: 360px;
    padding: 76px 0 68px;
  }
  .slogan-en {
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .story-intro-section {
    padding: 60px 0 56px;
  }
  .mobile-br {
    display: inline;
  }
  .desktop-comma {
    display: none;
  }
  .stats-grid {
    gap: 8px;
    margin-top: 36px;
    padding-top: 28px;
  }
  .stat-item {
    padding: 12px 6px;
  }
  .stat-sub {
    display: none;
  }
}
</style>
