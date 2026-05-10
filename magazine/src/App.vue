<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { locations } from '@/data/locations'
import CoverPage from './components/CoverPage.vue'
import TocPage from './components/TocPage.vue'
import MagazinePage from './components/MagazinePage.vue'
import BackCover from './components/BackCover.vue'
import PdfExport from './components/PdfExport.vue'
import { exportAllPages } from '@/utils/pdfExport'

const currentSpread = ref(0)

const totalSpreads = computed(() => 2 + Math.ceil((locations.length - 1) / 2) + 1)

function nextSpread() { if (currentSpread.value < totalSpreads.value - 1) currentSpread.value++ }
function prevSpread() { if (currentSpread.value > 0) currentSpread.value-- }

const pageRange = computed(() => {
  const s = currentSpread.value
  if (s === 0) return '封面'
  if (s >= totalSpreads.value - 1) return '尾页'
  const start = (s - 1) * 2 + 1
  const end = Math.min(start + 1, locations.length + 1)
  return `${start} – ${end}`
})

// PDF 导出：临时渲染所有页
const exportMode = ref(false)
const exporting = ref(false)

async function handleExport() {
  exportMode.value = true
  exporting.value = true
  await nextTick()
  await new Promise(r => setTimeout(r, 500))
  try {
    await exportAllPages('梦环翠海指南-HITWITH-GUIDE.pdf')
  } catch (e) {
    console.error('PDF 导出失败:', e)
  } finally {
    exportMode.value = false
    exporting.value = false
  }
}

defineExpose({ handleExport })
</script>

<template>
  <div class="app-shell">
    <!-- PDF 按钮 -->
    <PdfExport :exporting="exporting" @export="handleExport" />

    <!-- 杂志视口 -->
    <div class="magazine-viewport">
      <!-- 正常模式：仅显示当前跨页 -->
      <Transition name="flip" mode="out-in">
        <div v-if="currentSpread === 0" key="cover" class="spread-row spread-solo">
          <CoverPage />
        </div>
        <div v-else-if="currentSpread === 1" key="spread1" class="spread-row">
          <TocPage :locations="locations" />
          <MagazinePage :location="locations[0]" :page-num="1" />
        </div>
        <div v-else-if="currentSpread < totalSpreads - 1" :key="'spread'+currentSpread" class="spread-row">
          <MagazinePage
            v-for="loc in locations.slice((currentSpread-2)*2+1, (currentSpread-2)*2+3)"
            :key="loc.id" :location="loc" :page-num="loc.id"
          />
        </div>
        <div v-else key="back" class="spread-row spread-solo">
          <MagazinePage :location="locations[locations.length-1]" :page-num="locations.length" />
          <BackCover />
        </div>
      </Transition>
    </div>

    <!-- PDF 导出时隐藏渲染所有页 -->
    <div v-if="exportMode" style="position:absolute;left:-9999px;top:0;width:1060px;display:flex;flex-wrap:wrap;gap:12px;padding:12px;">
      <CoverPage />
      <TocPage :locations="locations" />
      <MagazinePage v-for="loc in locations" :key="'exp-'+loc.id" :location="loc" :page-num="loc.id" />
      <BackCover />
    </div>

    <!-- 翻页导航 -->
    <div class="nav-bar no-print">
      <button :disabled="currentSpread <= 0" class="nav-btn" @click="prevSpread">◂</button>
      <span class="nav-label">{{ pageRange }}</span>
      <button :disabled="currentSpread >= totalSpreads - 1" class="nav-btn" @click="nextSpread">▸</button>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.magazine-viewport {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px 12px 0;
}

.spread-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: flex-start;
}

.spread-solo {
  max-width: 500px;
}

.spread-row .page-card {
  width: clamp(300px, 45vw, 500px);
  max-width: 500px;
  aspect-ratio: 1 / 1.414;
  background: #FAFAF7;
  overflow: hidden;
  box-shadow: 0 2px 20px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

/* 翻页过渡动画 */
.flip-enter-active,
.flip-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.flip-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.flip-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

/* 导航栏 */
.nav-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px 18px;
}
.nav-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  color: #D4C5B2;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}
.nav-btn:hover:not(:disabled) {
  background: #8B7355;
  border-color: #8B7355;
  color: #fff;
}
.nav-btn:disabled {
  opacity: 0.2;
  cursor: default;
}
.nav-label {
  color: #8B7355;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  min-width: 60px;
  text-align: center;
}
</style>


