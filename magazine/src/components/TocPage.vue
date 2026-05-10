<script setup lang="ts">
import type { Location } from '@/types'

defineProps<{ locations: Location[] }>()
</script>

<template>
  <div class="page-card">
    <div class="page-inner" style="justify-content: center;">
      <!-- 标题 -->
      <div class="text-center flex-shrink-0 mb-2">
        <h2 class="font-sans font-bold text-sumi tracking-widest" style="font-size: clamp(1.1rem, 2vw, 1.4rem);">目 录</h2>
        <div class="w-6 h-px bg-cha mx-auto mt-2 mb-1"></div>
        <p class="font-sans text-iwa tracking-wider" style="font-size: clamp(0.55rem, 0.9vw, 0.65rem);">INDEX</p>
      </div>

      <!-- 列表 -->
      <div class="flex-1 overflow-hidden flex flex-col justify-center">
        <div
          v-for="loc in locations"
          :key="loc.id"
          class="flex items-center gap-1.5 py-1.5 border-b border-kare/20 last:border-b-0"
        >
          <span class="font-sans text-kare font-bold flex-shrink-0 w-5 text-right" style="font-size: clamp(0.6rem, 1vw, 0.75rem);">
            {{ String(loc.id).padStart(2, '0') }}
          </span>
          <span class="font-sans text-sumi font-medium truncate flex-1" style="font-size: clamp(0.6rem, 1vw, 0.75rem);">
            {{ loc.name }}
          </span>
          <span class="font-sans text-iwa flex-shrink-0" style="font-size: clamp(0.5rem, 0.8vw, 0.6rem);">
            {{ loc.category }}
          </span>
          <span
            v-for="s in 3"
            :key="s"
            class="flex-shrink-0"
            :style="{ color: s <= loc.stars ? '#C4A35A' : '#D4C5B2', fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }"
          >◆</span>
        </div>
      </div>

      <p class="text-center font-sans text-kare tracking-wider mt-2 flex-shrink-0" style="font-size: clamp(0.5rem, 0.8vw, 0.6rem);">
        全 {{ locations.length }} 店 · 群友实地探访
      </p>
    </div>
  </div>
</template>
