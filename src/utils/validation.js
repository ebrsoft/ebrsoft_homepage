/**
 * 문의하기 폼 입력값 유효성 검증 유틸리티 및 고객사 필터링 헬퍼
 */

/**
 * 실제 화면에 노출할 고객사(visible === true)만 반환합니다.
 * @param {Array} clientList
 * @param {boolean} includeHidden 미리보기용 전체 표시 여부
 */
export function getVisibleClients(clientList = [], includeHidden = false) {
  if (!Array.isArray(clientList)) return []
  if (includeHidden) return clientList
  return clientList.filter((client) => client && client.visible === true)
}

/**
 * 이메일 형식 유효성 검사
 * @param {string} email
 */
export function isValidEmail(email = '') {
  const trimmed = String(email).trim()
  if (!trimmed) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}

/**
 * 연락처(전화번호) 형식 유효성 검사
 * @param {string} phone
 */
export function isValidPhone(phone = '') {
  const digits = String(phone).replace(/[^0-9]/g, '')
  return digits.length >= 8 && digits.length <= 12
}

/**
 * 문의 폼 전체 검증
 * @param {{ category?: string, company?: string, name?: string, phone?: string, email?: string, message?: string }} form
 * @returns {{ valid: boolean, errors: Record<string, string> }}
 */
export function validateInquiryForm(form = {}) {
  const errors = {}

  if (!form.category || !String(form.category).trim()) {
    errors.category = '문의 유형을 선택해 주세요.'
  }
  if (!form.company || String(form.company).trim().length < 2) {
    errors.company = '기업 또는 기관명을 2자 이상 입력해 주세요.'
  }
  if (!form.name || String(form.name).trim().length < 2) {
    errors.name = '담당자 성함을 입력해 주세요.'
  }
  if (!isValidPhone(form.phone)) {
    errors.phone = '올바른 연락처 번호를 입력해 주세요.'
  }
  if (!isValidEmail(form.email)) {
    errors.email = '올바른 이메일 주소를 입력해 주세요.'
  }
  if (!form.message || String(form.message).trim().length < 10) {
    errors.message = '문의 내용을 10자 이상 입력해 주세요.'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

