<script setup lang="ts">
import { ref } from 'vue'
import { exportAllPages } from '@/utils/pdfExport'

const exporting = ref(false)

async function handleExport() {
  exporting.value = true
  try {
    await exportAllPages('梦环翠海指南-HITWITH-GUIDE.pdf')
  } catch (e) {
    console.error('PDF 导出失败:', e)
  } finally {
    exporting.value = false
  }
}
</script>

<template>
  <div class="no-print fixed top-4 right-4 z-50">
    <button
      :disabled="exporting"
      class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur shadow-lg border border-kare/20 hover:bg-cha hover:text-white hover:border-cha transition-all duration-300 disabled:opacity-50 cursor-pointer"
      style="font-size: 0.75rem;"
      @click="handleExport"
    >
      <span class="font-sans tracking-wider">
        {{ exporting ? '导出中...' : '导出 PDF' }}
      </span>
      <span>{{ exporting ? '⏳' : '📥' }}</span>
    </button>
  </div>
</template>