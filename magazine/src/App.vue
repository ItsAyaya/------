<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted, watch, defineAsyncComponent } from 'vue'
import { locations } from '@/data/locations'
import { exportAllPages } from '@/utils/pdfExport'

const CoverPage = defineAsyncComponent(() => import('./components/CoverPage.vue'))
const TocPage = defineAsyncComponent(() => import('./components/TocPage.vue'))
const MagazinePage = defineAsyncComponent(() => import('./components/MagazinePage.vue'))
const BackCover = defineAsyncComponent(() => import('./components/BackCover.vue'))
const PdfExport = defineAsyncComponent(() => import('./components/PdfExport.vue'))

const isMobile = ref(false)
let mql: MediaQueryList | null = null
const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
  isMobile.value = e.matches
}

onMounted(() => {
  mql = window.matchMedia('(max-width: 768px)')
  handleResize(mql)
  mql.addEventListener('change', handleResize)
})

onUnmounted(() => {
  if (mql) mql.removeEventListener('change', handleResize)
})

const allPages = computed(() => {
  const arr: any[] = []
  arr.push({ id: 'cover', type: 'cover' })
  arr.push({ id: 'toc', type: 'toc' })
  locations.forEach((loc) => {
    arr.push({ id: `loc-${loc.id}`, type: 'location', loc: loc })
  })
  arr.push({ id: 'back', type: 'back' })
  return arr
})

const spreadLayout = computed(() => {
  if (isMobile.value) {
    return allPages.value.map(p => [p])
  } else {
    const spreads = []
    spreads.push([allPages.value[0]])
    for (let i = 1; i < allPages.value.length; i += 2) {
      const chunk = [allPages.value[i]]
      if (allPages.value[i+1]) {
        chunk.push(allPages.value[i+1])
      }
      spreads.push(chunk)
    }
    return spreads
  }
})

const currentSpread = ref(0)
const totalSpreads = computed(() => spreadLayout.value.length)

// Ensure currentSpread stays within bounds on resize
watch(totalSpreads, (newTotal) => {
  if (currentSpread.value >= newTotal) {
    currentSpread.value = Math.max(0, newTotal - 1)
  }
})

function nextSpread() {
  if (currentSpread.value < totalSpreads.value - 1) currentSpread.value++
}
function prevSpread() {
  if (currentSpread.value > 0) currentSpread.value--
}

const pageRange = computed(() => {
  const currentItems = spreadLayout.value[currentSpread.value] || []
  if (currentItems.length === 0) return ''
  
  function getLabel(item: any) {
    if (item.type === 'cover') return '封面'
    if (item.type === 'back') return '尾页'
    if (item.type === 'toc') return '目录'
    if (item.type === 'location') return item.loc.id
    return ''
  }
  
  if (currentItems.length === 1) return String(getLabel(currentItems[0]))
  return `${getLabel(currentItems[0])} – ${getLabel(currentItems[1])}`
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
      <!-- 正常模式：动态跨页 -->
      <Transition name="flip" mode="out-in">
        <div :key="'spread-' + currentSpread" class="spread-row" :class="{'spread-solo': spreadLayout[currentSpread]?.length === 1}">
          <template v-for="page in spreadLayout[currentSpread]" :key="page.id">
            <CoverPage v-if="page.type === 'cover'" />
            <TocPage v-else-if="page.type === 'toc'" :locations="locations" />
            <MagazinePage v-else-if="page.type === 'location'" :location="page.loc" :page-num="page.loc.id" />
            <BackCover v-else-if="page.type === 'back'" />
          </template>
        </div>
      </Transition>
    </div>

    <!-- PDF 导出时隐藏渲染所有页（确保与可见页同宽高比） -->
    <div v-if="exportMode" id="pdf-export-container" style="position:absolute;left:-9999px;top:0;display:flex;flex-wrap:wrap;gap:12px;padding:12px;">
      <div style="width:500px;aspect-ratio:1/1.414;flex-shrink:0;display:flex;"><CoverPage /></div>
      <div style="width:500px;aspect-ratio:1/1.414;flex-shrink:0;display:flex;"><TocPage :locations="locations" /></div>
      <div v-for="loc in locations" :key="'exp-'+loc.id" style="width:500px;aspect-ratio:1/1.414;flex-shrink:0;display:flex;">
        <MagazinePage :location="loc" :page-num="loc.id" />
      </div>
      <div style="width:500px;aspect-ratio:1/1.414;flex-shrink:0;display:flex;"><BackCover /></div>
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
  perspective: 1200px;
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

@media (max-width: 768px) {
  .spread-row .page-card {
    width: clamp(280px, 90vw, 500px);
  }
}

/* 翻页过渡动画 */
.flip-enter-active,
.flip-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}
.flip-enter-from {
  opacity: 0;
  transform: translateX(60px) scale(0.96) translateZ(-40px);
}
.flip-leave-to {
  opacity: 0;
  transform: translateX(-60px) scale(0.96) translateZ(-40px);
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


