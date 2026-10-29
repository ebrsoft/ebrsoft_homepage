<script setup>
import { ref } from 'vue'
import { nextVisionCards, roadmapMilestones } from '../../data/businessContent.js'

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
  activeSlide.value = Math.min(nextVisionCards.length - 1, Math.max(0, index))
}
</script>

<template>
  <section id="vision" class="vision-section">
    <div class="container">
      <div class="section-header-row">
        <div class="section-header">
          <span class="section-eyebrow">NEXT VISION</span>
          <h2 class="section-title">더 쉬운 연결을 위한 차세대 트래블테크 라인업</h2>
          <p class="section-subtitle">
            검증된 실시간 연동 기술을 바탕으로,<br class="mobile-br" />
            지역 관광부터 티켓 발권·AI 수익 관리까지<br class="mobile-br" />
            여행 생태계의 연결을 넓혀갑니다.
          </p>
        </div>

        <div class="carousel-controls" aria-label="차세대 비전 카드 좌우 이동">
          <button type="button" class="carousel-arrow" aria-label="이전 비전 카드" @click="slideBy(-1)">‹</button>
          <button type="button" class="carousel-arrow" aria-label="다음 비전 카드" @click="slideBy(1)">›</button>
        </div>
      </div>

      <!-- 3 Poster-Style Card News (Original Colors + Mobile Horizontal Carousel) -->
      <div
        ref="carouselRef"
        class="vision-grid carousel-track"
        @scroll.passive="onCarouselScroll"
      >
        <article
          v-for="card in nextVisionCards"
          :key="card.id"
          class="vision-card carousel-slide"
          :class="`accent-${card.accent}`"
        >
          <div class="card-body">
            <div class="card-meta">
              <span class="step-badge">{{ card.step }}</span>
              <span class="status-text">{{ card.status }}</span>
            </div>
            <h3 class="card-title">{{ card.title }}</h3>
            <p v-if="card.quoteLines" class="card-quote">
              <template v-for="(line, idx) in card.quoteLines" :key="idx">
                {{ line }}<br v-if="idx < card.quoteLines.length - 1" class="mobile-br" />
              </template>
            </p>
            <p v-else class="card-quote">{{ card.quote }}</p>
            <p v-if="card.descriptionLines" class="card-desc">
              <template v-for="(line, idx) in card.descriptionLines" :key="idx">
                {{ line }}<br v-if="idx < card.descriptionLines.length - 1" class="mobile-br" />
              </template>
            </p>
            <p v-else class="card-desc">{{ card.description }}</p>
          </div>
          <div class="card-tags">
            <span v-for="tag in card.tags" :key="tag" class="tag-item">{{ tag }}</span>
          </div>
        </article>
      </div>

      <div class="carousel-dots" aria-hidden="true">
        <span
          v-for="(card, idx) in nextVisionCards"
          :key="card.id"
          class="dot"
          :class="{ active: activeSlide === idx }"
        ></span>
      </div>

      <!-- Compact 2026~2030 Growth Roadmap Strip -->
      <div class="roadmap-strip" aria-label="2026~2030 성장 로드맵">
        <div
          v-for="(item, idx) in roadmapMilestones"
          :key="idx"
          class="roadmap-step"
        >
          <span class="roadmap-period">{{ item.period }}</span>
          <p class="roadmap-title">{{ item.title }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vision-section {
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

.vision-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.vision-card {
  background: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.25s var(--ease-out-expo), box-shadow 0.25s ease;
}

.vision-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.step-badge {
  padding: 5px 12px;
  border-radius: var(--radius-sm);
  font-size: 0.78rem;
  font-weight: 800;
}

.accent-navy .step-badge {
  background: #eff6ff;
  color: var(--color-brand-navy);
}

.accent-magenta .step-badge {
  background: #fdf2f8;
  color: var(--color-brand-magenta-dark);
}

.accent-purple .step-badge {
  background: #f5f3ff;
  color: var(--color-brand-purple);
}

.status-text {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--color-text-muted);
}

.card-title {
  font-size: 1.35rem;
  font-weight: 900;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.card-quote {
  font-size: 0.94rem;
  font-weight: 800;
  margin-top: 8px;
}

.accent-navy .card-quote { color: var(--color-brand-navy); }
.accent-magenta .card-quote { color: var(--color-brand-magenta-dark); }
.accent-purple .card-quote { color: var(--color-brand-purple); }

.card-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-top: 12px;
  line-height: 1.62;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid var(--color-border-subtle);
}

.tag-item {
  font-size: 0.82rem;
  font-weight: 800;
}

.accent-navy .tag-item { color: var(--color-brand-navy); }
.accent-magenta .tag-item { color: var(--color-brand-magenta-dark); }
.accent-purple .tag-item { color: var(--color-brand-purple); }

.roadmap-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 40px;
  padding: 24px;
  border-radius: var(--radius-md);
  background: #ffffff;
  border: 1px solid var(--color-border);
}

.roadmap-step {
  padding-left: 14px;
  border-left: 3px solid var(--color-brand-purple);
}

.roadmap-step:first-child { border-left-color: var(--color-brand-navy); }
.roadmap-step:nth-child(2) { border-left-color: var(--color-brand-magenta); }

.roadmap-period {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-brand-magenta);
}

.roadmap-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-top: 4px;
}

@media (max-width: 960px) {
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
  .roadmap-strip {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .roadmap-strip {
    grid-template-columns: 1fr;
  }
}
</style>
