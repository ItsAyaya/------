<script setup lang="ts">
import { ref } from 'vue'
import type { Location } from '@/types'

defineProps<{ location: Location; pageNum?: number }>()

const lightboxSrc = ref('')
function openLightbox(src: string) { lightboxSrc.value = src }
function closeLightbox() { lightboxSrc.value = '' }
</script>

<template>
  <div class="page-card">
    <div class="page-inner">
      <!-- 页码 -->
      <div v-if="pageNum" class="text-center flex-shrink-0" style="font-size:clamp(0.4rem,0.6vw,0.5rem);color:#B0A895;font-weight:300;">— {{ pageNum }} —</div>

      <!-- 店名 -->
      <div class="text-center flex-shrink-0 mt-0.5">
        <p style="font-size:clamp(0.5rem,0.8vw,0.6rem);font-weight:300;color:#8B7355;letter-spacing:0.2em;">{{ location.category }}</p>
        <h2 style="font-size:clamp(1rem,1.8vw,1.35rem);font-weight:700;margin-top:0.3em;">{{ location.name }}</h2>
        <div style="width:1.5em;height:1px;background:#8B7355;margin:0.3em auto;"></div>
        <div style="display:flex;justify-content:center;align-items:center;gap:0.2em;">
          <span v-for="s in 3" :key="s" :style="{color:s<=location.stars?'#C4A35A':'#D4C5B2',fontSize:'clamp(0.55rem,0.9vw,0.7rem)'}">◆</span>
          <span style="font-size:clamp(0.45rem,0.7vw,0.55rem);color:#6B6B6B;margin-left:0.3em;">{{ location.stars===3?'三星':location.stars===2?'二星':'一星' }}推荐</span>
        </div>
      </div>

      <!-- 地址（点击跳转高德地图搜索） -->
      <div class="flex-shrink-0 text-center mt-1">
        <a
          :href="`https://uri.amap.com/search?keyword=${encodeURIComponent(location.mapKeyword)}`"
          target="_blank"
          rel="noopener"
          style="font-size:clamp(0.45rem,0.7vw,0.55rem);color:#6B6B6B;text-decoration:none;cursor:pointer;transition:color 0.2s;"
          class="addr-link"
        >📍 {{ location.address }}</a>
      </div>

      <!-- 照片缩略图 -->
      <div v-if="location.photos.length>0" class="flex-shrink-0 mt-1">
        <div class="photo-thumbs" :class="'cols-'+Math.min(location.photos.length,4)">
          <div
            v-for="(photo,pidx) in location.photos" :key="pidx"
            class="thumb-item" :class="{ 'thumb-first': pidx===0 && location.photos.length>=5 }"
            @click="openLightbox(photo.src)"
          >
            <img :src="photo.src" :alt="photo.caption||location.name" loading="lazy"
              @error="(e)=>((e.target as HTMLImageElement).style.display='none')" />
          </div>
        </div>
      </div>
      <div v-else class="flex-shrink-0 mt-1 text-center">
        <span style="font-size:clamp(0.4rem,0.6vw,0.5rem);color:#6B6B6B;">📋 暂无实拍</span>
      </div>

      <!-- 分隔 -->
      <div class="flex items-center gap-2 flex-shrink-0 my-1">
        <div style="flex:1;height:1px;background:rgba(212,197,178,0.3);"></div>
        <span style="font-size:clamp(0.45rem,0.7vw,0.55rem);color:#8B7355;letter-spacing:0.1em;">评 价</span>
        <div style="flex:1;height:1px;background:rgba(212,197,178,0.3);"></div>
      </div>

      <!-- 评论 -->
      <div style="flex:1;overflow:hidden;display:flex;flex-direction:column;min-height:0;">
        <div style="display:flex;align-items:center;gap:0.3em;flex-shrink:0;">
          <img :src="location.reviewerAvatar" :alt="location.reviewerName"
            style="width:clamp(18px,3.5%,24px);height:clamp(18px,3.5%,24px);border-radius:50%;background:#F5EDE3;flex-shrink:0;"
            @error="(e)=>((e.target as HTMLImageElement).style.display='none')" />
          <span style="font-size:clamp(0.55rem,0.9vw,0.65rem);font-weight:500;">{{ location.reviewerName }}</span>
        </div>
        <p style="font-size:clamp(0.5rem,0.8vw,0.62rem);line-height:1.6;margin-top:0.25em;overflow:hidden;flex:1;">{{ location.reviewText }}</p>
      </div>
    </div>

    <!-- 灯箱 -->
    <Teleport to="body">
      <div v-if="lightboxSrc" class="lightbox" @click="closeLightbox">
        <img :src="lightboxSrc" class="lightbox-img" @click.stop />
        <button class="lightbox-close" @click="closeLightbox">✕</button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.photo-thumbs {
  display: grid;
  gap: 2px;
}
.cols-1 { grid-template-columns: 1fr; }
.cols-2 { grid-template-columns: repeat(2, 1fr); }
.cols-3 { grid-template-columns: repeat(3, 1fr); }
.cols-4 { grid-template-columns: repeat(4, 1fr); }
.thumb-item {
  overflow: hidden;
  border-radius: 3px;
  background: rgba(245,237,227,0.3);
  cursor: pointer;
  aspect-ratio: 4 / 3;
}
.thumb-first {
  grid-column: span 2;
  grid-row: span 2;
}
.thumb-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s;
}
.thumb-item:hover img { opacity: 0.7; }
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.lightbox-img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
}
.lightbox-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: none;
  color: #fff;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
}
.lightbox-close:hover { background: rgba(255,255,255,0.4); }
.addr-link:hover { color: #4A90D9 !important; }
</style>
