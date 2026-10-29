<script setup>
import { companyInfo } from '../../data/companyInfo.js'
import SafeEmailCanvas from '../common/SafeEmailCanvas.vue'
</script>

<template>
  <footer class="app-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <img
          :src="companyInfo.logoHorizontal"
          :alt="`${companyInfo.brandName} 로고`"
          width="140"
          height="34"
          loading="lazy"
        />
        <p class="footer-slogan">“{{ companyInfo.sloganEn }}” — {{ companyInfo.sloganKo }}</p>
      </div>

      <div class="footer-info">
        <p><strong>{{ companyInfo.nameKo }} ({{ companyInfo.nameEn }})</strong></p>
        <p class="footer-contact-line">
          <span>이메일:</span>
          <SafeEmailCanvas color="#475569" :font-size="13.5" :font-weight="600" :show-copy-button="false" />
          <span>· 상담시간: {{ companyInfo.contact.businessHours }}</span>
        </p>
        <p class="copyright">{{ companyInfo.copyright }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  padding: 48px 0;
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.footer-brand img {
  height: 32px;
  width: auto;
  object-fit: contain;
}

.footer-slogan {
  font-size: 0.86rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  margin-top: 10px;
}

.footer-info {
  text-align: right;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer-contact-line {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
}

.copyright {
  color: var(--color-text-muted);
  margin-top: 4px;
}

@media (max-width: 767px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .footer-info {
    text-align: left;
  }
  .footer-contact-line {
    justify-content: flex-start;
  }
}
</style>

