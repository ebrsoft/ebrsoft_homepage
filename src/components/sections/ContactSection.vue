<script setup>
import { reactive, ref } from 'vue'
import { inquiryCategories } from '../../data/businessContent.js'
import { companyInfo } from '../../data/companyInfo.js'
import { validateInquiryForm } from '../../utils/validation.js'

const form = reactive({
  category: inquiryCategories[0],
  company: '',
  name: '',
  phone: '',
  email: '',
  message: ''
})

const errors = ref({})
const confirmDialogRef = ref(null)
const submittedSummary = ref(null)

// 현재 실제 메일 발송 서버(SMTP/API) 연동 전이므로 true로 설정하여
// Validation 이전에 '서비스 준비중입니다' 안내 모달을 먼저 표시합니다.
const isMailServicePreparing = true

function selectCategory(cat) {
  form.category = cat
  if (errors.value.category) {
    delete errors.value.category
  }
}

function handleSubmit() {
  // 메일 발송 연동 전에는 Validation 검사 이전에 '준비중입니다' 안내 모달을 바로 노출
  if (isMailServicePreparing) {
    errors.value = {}
    submittedSummary.value = null
    if (confirmDialogRef.value && typeof confirmDialogRef.value.showModal === 'function') {
      confirmDialogRef.value.showModal()
    }
    return
  }

  const result = validateInquiryForm(form)
  errors.value = result.errors

  if (!result.valid) {
    return
  }

  submittedSummary.value = { ...form }
  if (confirmDialogRef.value && typeof confirmDialogRef.value.showModal === 'function') {
    confirmDialogRef.value.showModal()
  }

  form.company = ''
  form.name = ''
  form.phone = ''
  form.email = ''
  form.message = ''
}

function closeDialog() {
  if (confirmDialogRef.value && typeof confirmDialogRef.value.close === 'function') {
    confirmDialogRef.value.close()
  }
}
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container contact-inner">
      <div class="contact-intro">
        <span class="section-eyebrow">CONTACT US</span>
        <h2 class="section-title">EBRSoft와 함께 새로운 연결을 시작해 보세요</h2>
        <p class="contact-desc">
          TL린칸·호텔 PMS·OTA 실시간 연동 개발과 유지보수, 맞춤형 엔터프라이즈 웹 구축 및 차세대 솔루션 제휴까지 전문 엔지니어가 빠르게 답변해 드립니다.
        </p>

        <div class="direct-contact-card">
          <div class="direct-item">
            <span class="direct-label">이메일 문의</span>
            <a :href="`mailto:${companyInfo.contact.email}`" class="direct-value">{{ companyInfo.contact.email }}</a>
          </div>
          <div class="direct-item">
            <span class="direct-label">상담 시간</span>
            <span class="direct-value">{{ companyInfo.contact.businessHours }}</span>
          </div>
        </div>
      </div>

      <!-- Validated Inquiry Form -->
      <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
        <div class="form-group">
          <label class="form-label">문의 분야 선택</label>
          <div class="category-chips" role="radiogroup" aria-label="문의 분야">
            <button
              v-for="cat in inquiryCategories"
              :key="cat"
              type="button"
              class="category-chip"
              :class="{ active: form.category === cat }"
              :aria-pressed="form.category === cat"
              @click="selectCategory(cat)"
            >
              {{ cat }}
            </button>
          </div>
          <p v-if="errors.category" class="error-msg">{{ errors.category }}</p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="inq-company" class="form-label">기업 · 기관명 *</label>
            <input
              id="inq-company"
              v-model="form.company"
              type="text"
              placeholder="예: OO호텔앤드리조트 / OO시청"
              required
            />
            <p v-if="errors.company" class="error-msg">{{ errors.company }}</p>
          </div>

          <div class="form-group">
            <label for="inq-name" class="form-label">담당자 성함 / 직함 *</label>
            <input
              id="inq-name"
              v-model="form.name"
              type="text"
              placeholder="예: 홍길동 매니저"
              required
            />
            <p v-if="errors.name" class="error-msg">{{ errors.name }}</p>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="inq-phone" class="form-label">연락처 *</label>
            <input
              id="inq-phone"
              v-model="form.phone"
              type="tel"
              placeholder="예: 010-1234-5678"
              required
            />
            <p v-if="errors.phone" class="error-msg">{{ errors.phone }}</p>
          </div>

          <div class="form-group">
            <label for="inq-email" class="form-label">이메일 *</label>
            <input
              id="inq-email"
              v-model="form.email"
              type="email"
              placeholder="예: partner@company.co.kr"
              required
            />
            <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
          </div>
        </div>

        <div class="form-group">
          <label for="inq-message" class="form-label">문의 상세 내용 *</label>
          <textarea
            id="inq-message"
            v-model="form.message"
            rows="4"
            placeholder="연동 희망 시스템(Opera PMS, TL린칸, OTA 등)이나 문의하실 내용을 자유롭게 작성해 주세요."
            required
          ></textarea>
          <p v-if="errors.message" class="error-msg">{{ errors.message }}</p>
        </div>

        <button type="submit" class="submit-btn">
          상담 및 제휴 문의 보내기 →
        </button>
      </form>
    </div>

    <!-- Native HTML <dialog> Confirmation / Preparing Modal -->
    <dialog ref="confirmDialogRef" class="confirm-dialog" @click.self="closeDialog">
      <div v-if="isMailServicePreparing" class="dialog-content">
        <div class="dialog-badge">서비스 준비중</div>
        <h3>온라인 문의 발송 기능 준비중입니다</h3>
        <p>
          현재 자동 메일 발송 기능을 준비하고 있습니다.<br />
          빠른 상담 및 제휴 문의는 아래 대표 이메일로 연락해 주시면 신속히 안내해 드리겠습니다.<br /><br />
          <a :href="`mailto:${companyInfo.contact.email}`" class="direct-value">{{ companyInfo.contact.email }}</a>
        </p>
        <button type="button" class="dialog-close-btn" @click="closeDialog">확인</button>
      </div>
      <div v-else-if="submittedSummary" class="dialog-content">
        <div class="dialog-badge">접수 완료</div>
        <h3>문의가 정상적으로 접수되었습니다</h3>
        <p>
          <strong>{{ submittedSummary.company }}</strong> ({{ submittedSummary.name }} 님)의
          <strong>[{{ submittedSummary.category }}]</strong> 문의 내용을 확인 후 기재해 주신 연락처로 빠르게 안내해 드리겠습니다.
        </p>
        <button type="button" class="dialog-close-btn" @click="closeDialog">확인</button>
      </div>
    </dialog>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 96px 0;
  background: var(--color-bg-primary);
}

.contact-inner {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 48px;
  align-items: start;
}

.contact-desc {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-top: 14px;
  line-height: 1.68;
}

.direct-contact-card {
  margin-top: 32px;
  padding: 24px;
  border-radius: var(--radius-md);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.direct-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.direct-label {
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--color-text-muted);
}

.direct-value {
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-brand-navy);
}

.contact-form {
  background: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 36px 32px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 0.88rem;
  font-weight: 800;
  color: var(--color-text-primary);
}

.category-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-chip {
  padding: 8px 14px;
  border-radius: var(--radius-full);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.category-chip.active {
  background: #fdf2f8;
  border-color: var(--color-brand-magenta);
  color: var(--color-brand-magenta-dark);
}

input,
textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  font-size: 0.94rem;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-brand-navy);
  background: #ffffff;
}

.error-msg {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-accent-rose);
}

.submit-btn {
  margin-top: 6px;
  padding: 16px 28px;
  border-radius: var(--radius-full);
  background: var(--gradient-brand);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 800;
  box-shadow: var(--shadow-brand);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  opacity: 0.96;
}

.confirm-dialog {
  margin: auto;
  border: none;
  border-radius: var(--radius-lg);
  padding: 0;
  max-width: 440px;
  width: calc(100% - 32px);
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25);
}

.confirm-dialog::backdrop {
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(4px);
}

.dialog-content {
  padding: 32px 28px;
  text-align: center;
}

.dialog-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  background: #fdf2f8;
  color: var(--color-brand-magenta);
  font-size: 0.8rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.dialog-content h3 {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.dialog-content p {
  font-size: 0.92rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.dialog-close-btn {
  margin-top: 22px;
  width: 100%;
  padding: 12px;
  border-radius: var(--radius-full);
  background: var(--color-bg-dark);
  color: #ffffff;
  font-weight: 800;
}

@media (max-width: 900px) {
  .contact-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>

