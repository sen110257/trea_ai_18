<template>
  <div class="panorama-page">
    <div class="header-bar">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#FFFFFF" />
      </div>
      <div class="header-title">
        <span class="title-text">3D全景预览</span>
        <span class="subtitle-text">{{ venue?.name }}</span>
      </div>
    </div>

    <div class="panorama-container" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
      <div class="panorama-wrapper" :style="wrapperStyle">
        <div
          class="panorama-image"
          v-for="(img, index) in panoramaImages"
          :key="index"
          :style="getImageStyle(index)"
        >
          <van-image
            :src="img"
            fit="cover"
            lazy-load
          />
        </div>
      </div>

      <div class="panorama-overlay">
        <div class="guide-hint" v-if="showGuide">
          <van-icon name="arrow-left" size="24" color="#FFFFFF" class="guide-icon" />
          <span>左右滑动查看全景</span>
          <van-icon name="arrow-right" size="24" color="#FFFFFF" class="guide-icon" />
        </div>
      </div>

      <div class="view-indicator">
        <div class="indicator-track">
          <div class="indicator-progress" :style="indicatorStyle"></div>
        </div>
        <span class="view-text">{{ currentView }}/{{ totalViews }}</span>
      </div>

      <div class="angle-indicator">
        <div class="angle-track">
          <div class="angle-active" :style="angleStyle"></div>
        </div>
        <span class="angle-text">视角: {{ angleText }}</span>
      </div>
    </div>

    <div class="scene-tabs">
      <div
        class="scene-tab"
        v-for="(scene, index) in sceneList"
        :key="index"
        :class="{ active: currentScene === index }"
        @click="switchScene(index)"
      >
        <van-image
          :src="scene.thumb"
          class="scene-thumb"
          fit="cover"
        />
        <span class="scene-name">{{ scene.name }}</span>
      </div>
    </div>

    <div class="bottom-info">
      <div class="info-left">
        <h3 class="venue-name">{{ venue?.name }}</h3>
        <p class="venue-desc">滑动屏幕切换3D视角</p>
      </div>
      <div class="info-right">
        <van-button class="btn-detail" @click="goToDetail">
          查看详情
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { weddingVenues } from '@/mock/data.js'

const route = useRoute()
const router = useRouter()

const venueId = computed(() => parseInt(route.params.id))
const venue = computed(() => weddingVenues.find(v => v.id === venueId.value))

const panoramaImages = computed(() => {
  if (!venue.value) return []
  return venue.value.panoramaImages || []
})

const sceneList = computed(() => {
  if (!venue.value) return []
  const scenes = [
    { name: '主厅', thumb: venue.value.images[0] || venue.value.image },
    { name: '舞台', thumb: venue.value.images[1] || venue.value.image },
    { name: '用餐区', thumb: venue.value.images[2] || venue.value.image }
  ]
  return scenes
})

const currentScene = ref(0)
const currentView = ref(1)
const totalViews = computed(() => panoramaImages.value.length || 4)
const angle = ref(0)
const showGuide = ref(true)

const touchStartX = ref(0)
const touchStartY = ref(0)
const startAngle = ref(0)
const isDragging = ref(false)

const angleText = computed(() => {
  const normalizedAngle = ((angle.value % 360) + 360) % 360
  if (normalizedAngle >= 315 || normalizedAngle < 45) return '正前方'
  if (normalizedAngle >= 45 && normalizedAngle < 135) return '右侧'
  if (normalizedAngle >= 135 && normalizedAngle < 225) return '正后方'
  return '左侧'
})

const wrapperStyle = computed(() => {
  const viewIndex = Math.floor(((angle.value % 360) + 360) % 360 / (360 / totalViews.value))
  currentView.value = viewIndex + 1
  return {
    transform: `translateX(-${viewIndex * 100}%)`
  }
})

const indicatorStyle = computed(() => {
  return {
    width: `${(currentView.value / totalViews.value) * 100}%`
  }
})

const angleStyle = computed(() => {
  const normalizedAngle = ((angle.value % 360) + 360) % 360
  return {
    left: `${(normalizedAngle / 360) * 100}%`
  }
})

const getImageStyle = (index) => {
  return {
    left: `${index * 100}%`
  }
}

const goBack = () => {
  router.back()
}

const goToDetail = () => {
  router.push(`/venue-detail/${venueId.value}`)
}

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
  startAngle.value = angle.value
  isDragging.value = false
}

const handleTouchMove = (e) => {
  const deltaX = e.touches[0].clientX - touchStartX.value
  const deltaY = e.touches[0].clientY - touchStartY.value
  
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
    isDragging.value = true
    const angleChange = deltaX * 0.5
    angle.value = startAngle.value - angleChange
  }
}

const handleTouchEnd = () => {
  if (isDragging.value) {
    showGuide.value = false
    const viewAngle = 360 / totalViews.value
    const nearestView = Math.round(angle.value / viewAngle)
    angle.value = nearestView * viewAngle
  }
  isDragging.value = false
}

const switchScene = (index) => {
  currentScene.value = index
  angle.value = 0
}

onMounted(() => {
  setTimeout(() => {
    showGuide.value = false
  }, 3000)
})
</script>

<style lang="less" scoped>
.panorama-page {
  width: 100%;
  height: 100vh;
  background: #000000;
  overflow: hidden;
  position: relative;
}

.header-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  padding-top: calc(12px + env(safe-area-inset-top));
  background: linear-gradient(180deg, rgba(0,0,0,0.5), transparent);

  .back-btn {
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-title {
    margin-left: 12px;
    display: flex;
    flex-direction: column;

    .title-text {
      font-size: 16px;
      font-weight: 600;
      color: #FFFFFF;
    }

    .subtitle-text {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 2px;
    }
  }
}

.panorama-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.panorama-wrapper {
  display: flex;
  height: 100%;
  transition: transform 0.3s ease-out;
  position: relative;
}

.panorama-image {
  width: 100vw;
  height: 100%;
  flex-shrink: 0;
  position: absolute;
  top: 0;

  :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.panorama-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.guide-hint {
  background: rgba(0, 0, 0, 0.6);
  padding: 16px 24px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #FFFFFF;
  font-size: 14px;
  animation: fadeInOut 3s ease-in-out;

  .guide-icon {
    animation: pulse 1s ease-in-out infinite;
  }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  20%, 80% { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.view-indicator {
  position: absolute;
  bottom: 180px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  .indicator-track {
    width: 120px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    overflow: hidden;

    .indicator-progress {
      height: 100%;
      background: linear-gradient(90deg, #D4AF37, #F5E6C8);
      border-radius: 2px;
      transition: width 0.3s ease;
    }
  }

  .view-text {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }
}

.angle-indicator {
  position: absolute;
  bottom: 140px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  .angle-track {
    width: 200px;
    height: 3px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    position: relative;

    .angle-active {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      background: #D4AF37;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
      transition: left 0.3s ease;
    }
  }

  .angle-text {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.7);
  }
}

.scene-tabs {
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0 16px;
}

.scene-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  opacity: 0.6;
  transition: all 0.3s ease;

  &.active {
    opacity: 1;

    .scene-thumb {
      border: 2px solid #D4AF37;
    }

    .scene-name {
      color: #D4AF37;
    }
  }

  .scene-thumb {
    width: 56px;
    height: 40px;
    border-radius: 6px;
    overflow: hidden;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }

  .scene-name {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
  }
}

.bottom-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  background: linear-gradient(0deg, rgba(0,0,0,0.7), transparent);

  .info-left {
    .venue-name {
      font-size: 16px;
      font-weight: 600;
      color: #FFFFFF;
      margin: 0;
    }

    .venue-desc {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
      margin: 4px 0 0;
    }
  }

  .info-right {
    .btn-detail {
      height: 36px;
      padding: 0 20px;
      border-radius: 18px;
      background: linear-gradient(135deg, #D4AF37, #F5E6C8);
      border: none;
      color: #FFFFFF;
      font-size: 13px;
      font-weight: 500;
    }
  }
}
</style>
