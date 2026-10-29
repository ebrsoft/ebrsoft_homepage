<script setup>
import { computed, ref } from 'vue'
import { clients } from '../../data/businessContent.js'
import { getVisibleClients } from '../../utils/validation.js'

const activeClients = computed(() => getVisibleClients(clients, false))
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
  activeSlide.value = Math.min(activeClients.value.length - 1, Math.max(0, index))
}
</script>

<template>
  <section id="clients" class="clients-section">
    <div class="container">
      <div class="section-header-row">
        <div class="section-header">
          <span class="section-eyebrow">TRUSTED BY</span>
          <h2 class="section-title">함께 연결의 가치를 만드는 주요 고객사</h2>
          <p class="section-subtitle">
            글로벌 채널 매니저부터 숙박 플랫폼,<br class="mobile-br" />
            대한민국 대표 호텔·리조트까지<br />
            EBRSoft의 실시간 연동 기술과 함께하고 있습니다.
          </p>
        </div>

        <div class="carousel-controls" aria-label="고객사 카드 좌우 이동">
          <button type="button" class="carousel-arrow" aria-label="이전 고객사" @click="slideBy(-1)">‹</button>
          <button type="button" class="carousel-arrow" aria-label="다음 고객사" @click="slideBy(1)">›</button>
        </div>
      </div>

      <div
        ref="carouselRef"
        class="clients-grid carousel-track"
        @scroll.passive="onCarouselScroll"
      >
        <article
          v-for="client in activeClients"
          :key="client.id"
          class="client-card carousel-slide"
          :class="`accent-${client.accent}`"
        >
          <div class="client-card-top">
            <span class="client-category">{{ client.category }}</span>
            <span class="client-en">{{ client.nameEn }}</span>
          </div>
          <h3 class="client-name">{{ client.name }}</h3>
          <p v-if="client.summaryLines" class="client-summary">
            <template v-for="(line, idx) in client.summaryLines" :key="idx">
              {{ line }}<br v-if="idx < client.summaryLines.length - 1" class="mobile-br" />
            </template>
          </p>
          <p v-else class="client-summary">{{ client.summary }}</p>
          <p v-if="client.detailLines" class="client-detail">
            <template v-for="(line, idx) in client.detailLines" :key="idx">
              {{ line }}<br v-if="idx < client.detailLines.length - 1" />
            </template>
          </p>
          <p v-else class="client-detail">{{ client.detail }}</p>
        </article>
      </div>

      <div class="carousel-dots" aria-hidden="true">
        <span
          v-for="(c, idx) in activeClients"
          :key="c.id"
          class="dot"
          :class="{ active: activeSlide === idx }"
        ></span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.clients-section {
  padding: 96px 0;
  background: var(--color-bg-primary);
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

.clients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 24px;
}

.client-card {
  background: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  box-shadow: var(--shadow-card);
  transition: transform 0.25s var(--ease-out-expo), box-shadow 0.25s ease, border-color 0.25s ease;
  position: relative;
  overflow: hidden;
}

.client-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--color-brand-navy);
}

.client-card.accent-magenta::before {
  background: var(--color-brand-magenta);
}

.client-card.accent-purple::before {
  background: var(--color-brand-purple);
}

.client-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

.client-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 14px;
}

.client-category {
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 800;
  background: var(--color-bg-secondary);
  color: var(--color-brand-navy);
}

.accent-magenta .client-category {
  background: #fdf2f8;
  color: var(--color-brand-magenta-dark);
}

.accent-purple .client-category {
  background: #f5f3ff;
  color: var(--color-brand-purple);
}

.client-en {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--color-text-muted);
}

.client-name {
  font-size: 1.35rem;
  font-weight: 900;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.client-summary {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-brand-navy);
  margin-top: 8px;
}

.accent-magenta .client-summary {
  color: var(--color-brand-magenta-dark);
}

.accent-purple .client-summary {
  color: var(--color-brand-purple);
}

.client-detail {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-top: 8px;
  line-height: 1.6;
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
    background: var(--color-bg-secondary);
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
}
</style>
