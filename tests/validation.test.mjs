import test from 'node:test'
import assert from 'node:assert/strict'
import { clients } from '../src/data/businessContent.js'
import { getVisibleClients, isValidEmail, isValidPhone, validateInquiryForm } from '../src/utils/validation.js'

test('getVisibleClients returns only TL린칸, 루밍허브, 한화호텔앤드리조트 by default for production', () => {
  const visible = getVisibleClients(clients)
  assert.equal(visible.length, 3)
  assert.deepEqual(
    visible.map((c) => c.name),
    ['TL린칸 (TL-Lincoln)', '루밍허브 (RoomingHub)', '한화호텔앤드리조트']
  )
})

test('getVisibleClients includes 켄싱턴호텔앤드리조트 and 인스파이어인티그레이티드리조트 when includeHidden is true', () => {
  const all = getVisibleClients(clients, true)
  assert.equal(all.length, 5)
  assert.ok(all.some((c) => c.name === '켄싱턴호텔앤드리조트'))
  assert.ok(all.some((c) => c.name === '인스파이어인티그레이티드리조트'))
})

test('validateInquiryForm validates required fields and formats accurately', () => {
  const invalidResult = validateInquiryForm({
    category: '',
    company: 'A',
    name: '',
    phone: '123',
    email: 'invalid-email',
    message: '짧음'
  })
  assert.equal(invalidResult.valid, false)
  assert.ok(invalidResult.errors.category)
  assert.ok(invalidResult.errors.company)
  assert.ok(invalidResult.errors.name)
  assert.ok(invalidResult.errors.phone)
  assert.ok(invalidResult.errors.email)
  assert.ok(invalidResult.errors.message)

  const validResult = validateInquiryForm({
    category: 'TL린칸 · 호텔 PMS · OTA 연동 및 유지보수',
    company: '이비알소프트 파트너호텔',
    name: '홍길동',
    phone: '010-1234-5678',
    email: 'partner@hotel.co.kr',
    message: 'Opera PMS와 TL린칸 실시간 연동 구축 및 유지보수 상담을 요청합니다.'
  })
  assert.equal(validResult.valid, true)
  assert.deepEqual(validResult.errors, {})
})

