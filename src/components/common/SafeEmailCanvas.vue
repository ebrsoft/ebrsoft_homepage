<script setup>
import { ref, onMounted, watch } from 'vue'
import { companyInfo } from '../../data/companyInfo.js'

const props = defineProps({
  color: {
    type: String,
    default: '#2b4490'
  },
  fontSize: {
    type: Number,
    default: 16
  },
  fontWeight: {
    type: [String, Number],
    default: 800
  },
  showCopyButton: {
    type: Boolean,
    default: true
  }
})

const canvasRef = ref(null)
const copied = ref(false)

function assembleEmail() {
  // 봇이 정적 분석이나 정규식으로 추출하지 못하도록 런타임에만 조합
  const u = companyInfo.contact.emailUserParts.join('')
  const d = companyInfo.contact.emailDomainParts.join('.')
  const sym = String.fromCharCode(64) // '@'
  return `${u}${sym}${d}`
}

function drawEmailCanvas() {
  const canvas = canvasRef.value
  if (!canvas || typeof canvas.getContext !== 'function') return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const text = assembleEmail()
  const dpr = window.devicePixelRatio || 1
  const fontSpec = `${props.fontWeight} ${props.fontSize}px Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif`

  ctx.font = fontSpec
  const metrics = ctx.measureText(text)
  const width = Math.ceil(metrics.width) + 4
  const height = Math.ceil(props.fontSize * 1.45)

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, width, height)
  ctx.font = fontSpec
  ctx.fillStyle = props.color
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 1, height / 2 + 1)
}

async function copyEmail() {
  try {
    const email = assembleEmail()
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(email)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }
  } catch (_) {
    // ignore clipboard permission errors
  }
}

onMounted(() => {
  drawEmailCanvas()
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      drawEmailCanvas()
    })
  }
})

watch(() => [props.color, props.fontSize, props.fontWeight], drawEmailCanvas)
</script>

<template>
  <span class="safe-email-wrap" role="img" aria-label="대표 이메일 이미지 (클릭하여 주소 복사)">
    <canvas
      ref="canvasRef"
      class="email-canvas"
      @click="copyEmail"
      title="클릭하면 이메일 주소가 복사됩니다"
    ></canvas>
    <button
      v-if="showCopyButton"
      type="button"
      class="copy-chip"
      :class="{ 'is-copied': copied }"
      @click="copyEmail"
    >
      {{ copied ? '✓ 복사됨' : '복사' }}
    </button>
  </span>
</template>

<style scoped>
.safe-email-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  vertical-align: middle;
  user-select: none;
  -webkit-user-select: none;
}

.email-canvas {
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
}

.copy-chip {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #475569;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  transition: all 0.2s ease;
  line-height: 1.4;
}

.copy-chip:hover {
  border-color: #2b4490;
  color: #2b4490;
}

.copy-chip.is-copied {
  background: #090d16;
  border-color: #090d16;
  color: #ffffff;
}
</style>

