<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { companyInfo } from '../../data/companyInfo.js'
import { navItems } from '../../data/businessContent.js'

const scrollProgress = ref(0)
const activeSection = ref('hero-vision')
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

function scrollToSection(id) {
  isMobileMenuOpen.value = false
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  isScrolled.value = scrollTop > 16
  scrollProgress.value = docHeight > 0 ? Math.min(100, Math.max(4, (scrollTop / docHeight) * 100)) : 4

  const sectionIds = navItems.map((item) => item.id)
  let current = 'hero-vision'
  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 160) {
        current = id
      }
    }
  }
  activeSection.value = current
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="app-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="container header-inner">
      <a href="#hero" class="brand-logo" @click.prevent="scrollToSection('hero')" aria-label="EBRSoft 홈으로 이동">
        <img
          :src="companyInfo.logoHorizontal"
          :alt="`${companyInfo.brandName} 로고`"
          width="156"
          height="38"
          fetchpriority="high"
        />
      </a>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav" aria-label="주요 섹션 메뉴">
        <template v-for="item in navItems" :key="item.id">
          <button
            v-if="!item.isCta"
            type="button"
            class="nav-pill"
            :class="{ 'is-active': activeSection === item.id }"
            @click="scrollToSection(item.id)"
          >
            {{ item.label }}
          </button>
          <button
            v-else
            type="button"
            class="nav-cta"
            @click="scrollToSection(item.id)"
          >
            {{ item.label }}
          </button>
        </template>
      </nav>

      <!-- Mobile Menu Toggle -->
      <button
        type="button"
        class="mobile-toggle"
        :aria-expanded="isMobileMenuOpen"
        aria-label="메뉴 열기/닫기"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <span class="hamburger-bar" :class="{ open: isMobileMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div v-if="isMobileMenuOpen" class="mobile-drawer">
      <nav class="container mobile-nav-list" aria-label="모바일 메뉴">
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          class="mobile-nav-item"
          :class="{ 'is-active': activeSection === item.id, 'is-cta': item.isCta }"
          @click="scrollToSection(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>
    </div>

    <!-- Brand Gradient Scroll Progress Bar -->
    <div class="scroll-progress-track" aria-hidden="true">
      <div class="scroll-progress-bar" :style="{ width: `${scrollProgress}%` }"></div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--color-border-subtle);
  transition: box-shadow 0.25s var(--ease-out-expo), background-color 0.25s ease;
}

.app-header.is-scrolled {
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 8px 24px -12px rgba(15, 23, 42, 0.08);
}

.header-inner {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand-logo img {
  height: 36px;
  width: auto;
  object-fit: contain;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-pill {
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.nav-pill:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-secondary);
}

.nav-pill.is-active {
  color: var(--color-brand-magenta);
  background: #fdf2f8;
}

.nav-cta {
  margin-left: 6px;
  padding: 9px 20px;
  border-radius: var(--radius-full);
  font-size: 0.92rem;
  font-weight: 700;
  color: #ffffff;
  background: var(--color-bg-dark);
  transition: transform 0.2s ease, background 0.2s ease;
}

.nav-cta:hover {
  background: var(--color-brand-navy);
  transform: translateY(-1px);
}

.scroll-progress-track {
  width: 100%;
  height: 3px;
  background: var(--color-bg-subtle);
}

.scroll-progress-bar {
  height: 100%;
  background: var(--gradient-brand);
  transition: width 0.1s linear;
}

.mobile-toggle {
  display: none;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
}

.hamburger-bar,
.hamburger-bar::before,
.hamburger-bar::after {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-text-primary);
  border-radius: 2px;
  position: relative;
  transition: all 0.25s ease;
}

.hamburger-bar::before,
.hamburger-bar::after {
  content: '';
  position: absolute;
  left: 0;
}

.hamburger-bar::before { top: -7px; }
.hamburger-bar::after { top: 7px; }

.hamburger-bar.open { background: transparent; }
.hamburger-bar.open::before { top: 0; transform: rotate(45deg); }
.hamburger-bar.open::after { top: 0; transform: rotate(-45deg); }

.mobile-drawer {
  background: #ffffff;
  border-top: 1px solid var(--color-border-subtle);
  padding: 16px 0 20px;
}

.mobile-nav-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-nav-item {
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 0.98rem;
  color: var(--color-text-secondary);
}

.mobile-nav-item.is-active {
  background: #fdf2f8;
  color: var(--color-brand-magenta);
}

.mobile-nav-item.is-cta {
  margin-top: 4px;
  text-align: center;
  background: var(--gradient-brand);
  color: #ffffff;
}

@media (max-width: 767px) {
  .desktop-nav {
    display: none;
  }
  .mobile-toggle {
    display: inline-flex;
  }
}
</style>

