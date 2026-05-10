<script setup lang="ts">
</script>

<template>
  <div class="page-card page-cover">
    <!-- 封面图 -->
    <div class="w-full flex-shrink-0" style="height: 55%">
      <img
        src="/cover.png"
        alt="梦环翠海指南封面"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- 标题区 -->
    <div class="flex-1 flex flex-col items-center justify-center px-4 text-center">
      <p class="font-sans text-kare tracking-[0.3em] mb-2" style="font-size: clamp(0.55rem, 1vw, 0.7rem); font-weight: 300;">
        HITWITH
      </p>
      <h1 class="font-sans font-bold text-sumi tracking-[0.12em] leading-tight mb-1" style="font-size: clamp(1.6rem, 3.5vw, 2.6rem);">
        梦环翠海指南
      </h1>
      <p class="font-sans text-cha tracking-[0.25em] mt-1" style="font-size: clamp(0.6rem, 1.1vw, 0.8rem); font-weight: 500;">
        HITWITH GUIDE
      </p>
      <div class="flex items-center gap-3 mt-3">
        <div class="w-5 h-px bg-kare"></div>
        <span class="text-cha" style="font-size: 0.5rem;">◆</span>
        <div class="w-5 h-px bg-kare"></div>
      </div>
      <p class="font-sans text-iwa mt-3" style="font-size: clamp(0.6rem, 1vw, 0.75rem); font-weight: 300;">
        哈工大威海校区 · 周边美食实地探访
      </p>
      <p class="font-sans text-kare tracking-[0.2em] mt-2" style="font-size: clamp(0.5rem, 0.8vw, 0.65rem);">
        VOL.1 · 二〇二六
      </p>
      <!-- 页码 -->
      <p style="font-size: clamp(0.4rem, 0.6vw, 0.5rem); color: #B0A895; font-weight: 300; margin-top: 0.5rem;">— 封面 —</p>
    </div>
  </div>
</template>
