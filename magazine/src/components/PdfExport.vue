<script setup lang="ts">
defineProps<{ exporting?: boolean }>()
defineEmits<{ export: [] }>()
</script>

<template>
  <div class="no-print fixed top-4 right-4 z-50">
    <button
      :disabled="exporting"
      class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur shadow-lg border border-kare/20 hover:bg-cha hover:text-white hover:border-cha transition-all duration-300 disabled:opacity-50 cursor-pointer"
      style="font-size: 0.75rem;"
      @click="$emit('export')"
    >
      <span class="font-sans tracking-wider">
        {{ exporting ? '导出中...' : '导出 PDF' }}
      </span>
      <span>{{ exporting ? '⏳' : '📥' }}</span>
    </button>
  </div>
</template>