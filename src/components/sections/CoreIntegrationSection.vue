<script setup>
import { ref } from 'vue'
import { coreFlowNodes, techStackPills } from '../../data/businessContent.js'

const showStructureDetail = ref(false)
const carouselRef = ref(null)
const activeSlide = ref(0)

function slideBy(dir) {
  if (!carouselRef.value) return
  const width = carouselRef.value.clientWidth * 0.85
  carouselRef.value.scrollBy({ left: dir * width, behavior: 'smooth' })
}

function onCarouselScroll() {
  if (!carouselRef.value) return
  const el = carouselRef.value
  const index = Math.round(el.scrollLeft / (el.clientWidth * 0.8))
  activeSlide.value = Math.min(2, Math.max(0, index))
}
</script>

<template>
  <section id="core" class="core-section">
    <div class="container">
      <div class="section-header-row">
        <div class="section-header">
          <span class="section-eyebrow">HOW WE HELP</span>
          <h2 class="section-title">서로 다른 시스템을 하나로 이어주는 든든한 가교</h2>
          <p class="section-subtitle">
            호텔 현장 시스템(PMS)부터 채널 매니저(CMS), 국내외 10대 OTA까지<br />
            객실 재고와 요금 정보가 막힘없이 흐르도록 돕습니다.
          </p>
        </div>

        <div class="carousel-controls" aria-label="카드 좌우 이동">
          <button type="button" class="carousel-arrow" aria-label="이전 카드" @click="slideBy(-1)">‹</button>
          <button type="button" class="carousel-arrow" aria-label="다음 카드" @click="slideBy(1)">›</button>
        </div>
      </div>

      <!-- 3-Block Visual Flow Diagram (Original Colors + Mobile Horizontal Carousel) -->
      <div
        ref="carouselRef"
        class="flow-grid carousel-track"
        role="region"
        aria-label="실시간 정보 연결 구조"
        @scroll.passive="onCarouselScroll"
      >
        <!-- Left: Hotel PMS -->
        <article class="flow-card carousel-slide">
          <span class="flow-eyebrow">{{ coreFlowNodes.left.eyebrow }}</span>
          <h3 class="flow-title">{{ coreFlowNodes.left.title }}</h3>
          <span class="flow-badge navy">{{ coreFlowNodes.left.badge }}</span>
          <ul class="flow-list">
            <li v-for="(item, idx) in coreFlowNodes.left.items" :key="idx">{{ item }}</li>
          </ul>
        </article>

        <!-- Center: EBRSoft x TL-Lincoln Hub -->
        <article class="flow-card center-hub carousel-slide">
          <div class="connector-arrows" aria-hidden="true">⟷</div>
          <span class="flow-eyebrow hub-eyebrow">{{ coreFlowNodes.center.eyebrow }}</span>
          <h3 class="flow-title hub-title">{{ coreFlowNodes.center.title }}</h3>
          <span class="flow-badge white">{{ coreFlowNodes.center.badge }}</span>
          <ul class="flow-list hub-list">
            <li v-for="(item, idx) in coreFlowNodes.center.items" :key="idx">{{ item }}</li>
          </ul>
        </article>

        <!-- Right: 10+ Major OTAs -->
        <article class="flow-card carousel-slide">
          <span class="flow-eyebrow">{{ coreFlowNodes.right.eyebrow }}</span>
          <h3 class="flow-title">{{ coreFlowNodes.right.title }}</h3>
          <span class="flow-badge magenta">{{ coreFlowNodes.right.badge }}</span>
          <div class="channel-tags">
            <span
              v-for="ch in coreFlowNodes.right.channels"
              :key="ch"
              class="channel-chip"
            >
              {{ ch }}
            </span>
          </div>
        </article>
      </div>

      <div class="carousel-dots" aria-hidden="true">
        <span v-for="idx in 3" :key="idx" class="dot" :class="{ active: activeSlide === idx - 1 }"></span>
      </div>

      <!-- Optional One-Click Expand: Why standardization matters -->
      <div class="standard-toggle-wrap">
        <button
          type="button"
          class="standard-toggle-btn"
          :aria-expanded="showStructureDetail"
          @click="showStructureDetail = !showStructureDetail"
        >
          <span>💡 왜 EBRSoft의 ‘객실유형 · 요금플랜 분리 표준화’가 특별한가요?</span>
          <span class="toggle-icon">{{ showStructureDetail ? '접기 ▲' : '핵심 비교 보기 ▼' }}</span>
        </button>

        <div v-if="showStructureDetail" class="comparison-box">
          <div class="comp-card legacy">
            <div class="comp-badge rose">기존 일반 쇼핑몰식 OTA 구조</div>
            <h4>객실과 옵션이 뒤섞인 단일 상품 나열</h4>
            <p>
              객실 유형과 요금 플랜(룸온리·조식포함) 구분 없이 낱개 상품으로 등록되어, 호텔 시스템과 실시간 재고 공유가 어렵고 수동 조정이나 대기 예약이 발생합니다.
            </p>
          </div>
          <div class="comp-card ebrs">
            <div class="comp-badge indigo">EBRSoft 표준화 연결 구조</div>
            <h4>[객실 유형 통합 재고] + [요금 플랜 분리 관리]</h4>
            <p>
              호텔의 실제 운영 방식 그대로 상위 객실 유형에서 통합 재고를 관리하고, 하위 요금 플랜별로 가격과 판매 상태를 실시간 연동하여 오버부킹 없이 자동화합니다.
            </p>
          </div>
        </div>
      </div>

      <!-- Enterprise LTS Tech Stack Pill Row -->
      <div class="tech-pill-area" aria-label="기반 엔터프라이즈 기술 스택">
        <span class="tech-label">기반 웹·연동 기술:</span>
        <span
          v-for="tech in techStackPills"
          :key="tech.label"
          class="tech-pill"
          :class="tech.category"
        >
          {{ tech.label }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.core-section {
  padding: 96px 0;
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border-subtle);
}

.section-header-row {
  margin-bottom: 48px;
}

.section-header {
  text-align: center;
}

.carousel-controls,
.carousel-dots {
  display: none;
}

.flow-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: stretch;
}

.flow-card {
  background: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px 26px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.25s var(--ease-out-expo), box-shadow 0.25s ease;
}

.flow-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

.center-hub {
  background: var(--gradient-brand);
  color: #ffffff;
  border: none;
  box-shadow: var(--shadow-brand);
  position: relative;
}

.connector-arrows {
  font-size: 0.9rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  opacity: 0.85;
  margin-bottom: 4px;
}

.flow-eyebrow {
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: var(--color-text-muted);
}

.hub-eyebrow {
  color: #fbcfe8;
}

.flow-title {
  font-size: 1.32rem;
  font-weight: 800;
  margin-top: 8px;
  color: var(--color-text-primary);
}

.hub-title {
  color: #ffffff;
  font-size: 1.42rem;
}

.flow-badge {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 14px;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 700;
}

.flow-badge.navy {
  background: #eff6ff;
  color: var(--color-brand-navy);
}

.flow-badge.magenta {
  background: #fdf2f8;
  color: var(--color-brand-magenta-dark);
}

.flow-badge.white {
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
}

.flow-list {
  list-style: none;
  margin-top: 20px;
  text-align: left;
  width: 100%;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.flow-list li::before {
  content: '• ';
  font-weight: 900;
  color: var(--color-brand-navy);
}

.hub-list {
  color: rgba(255, 255, 255, 0.92);
}

.hub-list li::before {
  color: #fbcfe8;
}

.channel-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.channel-chip {
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.standard-toggle-wrap {
  max-width: 840px;
  margin: 28px auto 0;
  text-align: center;
}

.standard-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  border-radius: var(--radius-full);
  background: #ffffff;
  border: 1px solid var(--color-border);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.standard-toggle-btn:hover {
  border-color: var(--color-brand-navy);
  color: var(--color-brand-navy);
}

.toggle-icon {
  color: var(--color-brand-magenta);
  font-weight: 800;
}

.comparison-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
  text-align: left;
}

.comp-card {
  padding: 22px;
  border-radius: var(--radius-md);
  background: #ffffff;
  border: 1px solid var(--color-border);
}

.comp-card.ebrs {
  border-color: rgba(43, 68, 144, 0.35);
  background: #f8faff;
}

.comp-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.76rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.comp-badge.rose {
  background: #ffe4e6;
  color: #be123c;
}

.comp-badge.indigo {
  background: #e0e7ff;
  color: var(--color-brand-navy);
}

.comp-card h4 {
  font-size: 1rem;
  font-weight: 800;
  margin-bottom: 6px;
}

.comp-card p {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
}

.tech-pill-area {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 36px;
  padding-top: 28px;
  border-top: 1px solid var(--color-border);
}

.tech-label {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--color-text-secondary);
  margin-right: 4px;
}

.tech-pill {
  padding: 6px 14px;
  border-radius: var(--radius-full);
  background: #ffffff;
  border: 1px solid var(--color-border);
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.tech-pill.integration,
.tech-pill.messaging {
  color: var(--color-brand-magenta-dark);
  border-color: #fbcfe8;
  background: #fdf2f8;
}

.tech-pill.frontend {
  color: var(--color-brand-navy);
  border-color: #c7d2fe;
  background: #eef2ff;
}

@media (max-width: 900px) {
  .section-header-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    margin-bottom: 24px;
  }
  .carousel-controls {
    display: flex;
    gap: 8px;
  }
  .carousel-arrow {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #ffffff;
    border: 1px solid var(--color-border);
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--color-brand-navy);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .carousel-track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    gap: 16px;
    padding: 4px 4px 14px;
    scrollbar-width: none;
  }
  .carousel-track::-webkit-scrollbar {
    display: none;
  }
  .carousel-slide {
    flex: 0 0 86%;
    scroll-snap-align: center;
  }
  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 8px;
  }
  .dot {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #cbd5e1;
    transition: all 0.2s ease;
  }
  .dot.active {
    width: 22px;
    background: var(--color-brand-magenta);
  }
  .comparison-box {
    grid-template-columns: 1fr;
  }
}
</style>
