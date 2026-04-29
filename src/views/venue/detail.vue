<template>
  <div class="venue-detail-page page-container-no-tabbar" v-if="venue">
    <div class="detail-banner">
      <van-swipe class="banner-swipe" :show-indicators="venue.images.length > 1" autoplay>
        <van-swipe-item v-for="(img, index) in venue.images" :key="index">
          <van-image
            :src="img"
            class="banner-image"
            fit="cover"
            lazy-load
          />
        </van-swipe-item>
      </van-swipe>
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#FFFFFF" />
      </div>
      <div class="favorite-btn" @click="toggleFavorite">
        <van-icon :name="isFavorited ? 'star' : 'star-o'" size="22" :color="isFavorited ? '#D4AF37' : '#FFFFFF'" />
      </div>
      <div class="panorama-btn" @click="goToPanorama">
        <van-icon name="photo-o" size="16" color="#FFFFFF" />
        <span>3D全景</span>
      </div>
    </div>

    <div class="detail-content">
      <div class="info-section">
        <div class="title-row">
          <h1 class="venue-title">{{ venue.name }}</h1>
          <span class="venue-en">{{ venue.nameEn }}</span>
        </div>
        <div class="rating-row">
          <van-rate v-model="venue.rating" color="#D4AF37" void-color="#E5E5E5" :size="14" readonly />
          <span class="rating-text">{{ venue.rating }}</span>
          <span class="review-count">{{ venue.reviewCount }}条评价</span>
        </div>
        <div class="price-row">
          <span class="price-unit">¥</span>
          <span class="price-value">{{ venue.pricePerTable }}</span>
          <span class="price-unit">/桌起</span>
        </div>
        <p class="venue-description">{{ venue.description }}</p>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h3 class="section-title">场地信息</h3>
        <van-cell-group inset>
          <van-cell title="容纳人数" :value="`${venue.minCapacity}-${venue.capacity}人`" />
          <van-cell title="场地面积" :value="venue.area" />
          <van-cell title="层高" :value="venue.height" />
          <van-cell title="地址" :value="venue.address" is-link />
        </van-cell-group>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h3 class="section-title">场地设施</h3>
        <div class="features-grid">
          <div class="feature-item" v-for="(feature, index) in venue.features" :key="index">
            <van-icon name="passed" size="16" color="#D4AF37" />
            <span>{{ feature }}</span>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h3 class="section-title">档期查询</h3>
        <div class="calendar-wrapper">
          <van-calendar
            v-model="selectedDate"
            type="single"
            :show-title="false"
            :show-subtitle="false"
            :show-confirm="false"
            :formatter="dateFormatter"
            color="#D4AF37"
          />
        </div>
        <div class="date-legend">
          <div class="legend-item">
            <div class="legend-dot available"></div>
            <span>可预约</span>
          </div>
          <div class="legend-item">
            <div class="legend-dot booked"></div>
            <span>已预约</span>
          </div>
          <div class="legend-item">
            <div class="legend-dot selected"></div>
            <span>已选择</span>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h3 class="section-title">场地相册</h3>
        <div class="photo-grid">
          <div class="photo-item" v-for="(img, index) in venue.images" :key="index">
            <van-image
              :src="img"
              class="photo-img"
              fit="cover"
              lazy-load
            />
          </div>
        </div>
      </div>

      <div class="bottom-space"></div>
    </div>

    <div class="bottom-bar">
      <div class="bar-left">
        <div class="bar-item" @click="toggleFavorite">
          <van-icon :name="isFavorited ? 'star' : 'star-o'" size="20" :color="isFavorited ? '#D4AF37' : '#999999'" />
          <span>{{ isFavorited ? '已收藏' : '收藏' }}</span>
        </div>
        <div class="bar-item" @click="callPhone">
          <van-icon name="phone-o" size="20" color="#999999" />
          <span>电话咨询</span>
        </div>
      </div>
      <div class="bar-right">
        <van-button class="btn-panorama" @click="goToPanorama">
          3D全景
        </van-button>
        <van-button class="btn-book" @click="bookVenue">
          立即预约
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast, showSuccessToast, showDialog } from 'vant'
import PageHeader from '@/components/PageHeader.vue'
import { weddingVenues } from '@/mock/data.js'
import { useFavoritesStore } from '@/store/favorites.js'

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()

const venueId = computed(() => parseInt(route.params.id))
const venue = computed(() => weddingVenues.find(v => v.id === venueId.value))
const selectedDate = ref(null)

const isFavorited = computed(() => {
  if (!venue.value) return false
  return favoritesStore.isVenueFavorited(venue.value.id)
})

const dateFormatter = (day) => {
  if (!venue.value) return day
  
  const dateStr = day.date.toISOString().split('T')[0]
  const availableDate = venue.value.availableDates.find(d => d.date === dateStr)
  
  if (availableDate) {
    if (!availableDate.available) {
      day.type = 'disabled'
      day.bottomInfo = '已约满'
    } else {
      day.bottomInfo = `¥${availableDate.price}`
    }
  }
  
  return day
}

const goBack = () => {
  router.back()
}

const toggleFavorite = () => {
  if (!venue.value) return
  const added = favoritesStore.toggleVenue(venue.value)
  showSuccessToast(added ? '已添加到收藏' : '已取消收藏')
}

const goToPanorama = () => {
  router.push(`/venue-panorama/${venueId.value}`)
}

const callPhone = () => {
  showToast('正在拨打: 400-888-8888')
}

const bookVenue = () => {
  showDialog({
    title: '预约确认',
    message: selectedDate.value 
      ? `您确定要预约 ${venue.value?.name} 吗？\n预约日期：${selectedDate.value}`
      : `您确定要预约 ${venue.value?.name} 吗？请先选择日期`,
    confirmButtonText: '确认预约',
    confirmButtonColor: '#D4AF37'
  }).then(() => {
    showSuccessToast('预约成功，工作人员将在24小时内联系您')
    router.push('/my-orders')
  }).catch(() => {
    // 用户取消
  })
}
</script>

<style lang="less" scoped>
.venue-detail-page {
  background: #FDF8F0;
  min-height: 100vh;
  position: relative;
}

.detail-banner {
  position: relative;
  height: 260px;

  .banner-swipe {
    height: 100%;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }

  .back-btn,
  .favorite-btn,
  .panorama-btn {
    position: absolute;
    width: 36px;
    height: 36px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .back-btn {
    left: 16px;
    top: calc(20px + env(safe-area-inset-top));
  }

  .favorite-btn {
    right: 16px;
    top: calc(20px + env(safe-area-inset-top));
  }

  .panorama-btn {
    right: 68px;
    top: calc(20px + env(safe-area-inset-top));
    width: auto;
    padding: 0 12px;
    border-radius: 18px;
    gap: 4px;
    font-size: 12px;
    color: #FFFFFF;
  }
}

.detail-content {
  background: #FFFFFF;
  margin-top: -20px;
  border-radius: 20px 20px 0 0;
  padding-bottom: 80px;
  position: relative;
  z-index: 5;
}

.info-section {
  padding: 20px 16px;

  .title-row {
    .venue-title {
      font-size: 20px;
      font-weight: 700;
      color: #333333;
      margin: 0;
    }

    .venue-en {
      font-size: 12px;
      color: #999999;
      margin-left: 8px;
    }
  }

  .rating-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 8px;

    .rating-text {
      font-size: 14px;
      color: #D4AF37;
      font-weight: 600;
    }

    .review-count {
      font-size: 12px;
      color: #999999;
    }
  }

  .price-row {
    margin-top: 12px;

    .price-unit {
      font-size: 14px;
      color: #D4AF37;
    }

    .price-value {
      font-size: 28px;
      font-weight: 700;
      color: #D4AF37;
    }
  }

  .venue-description {
    font-size: 14px;
    color: #666666;
    line-height: 1.6;
    margin-top: 12px;
  }
}

.divider {
  height: 8px;
  background: #FDF8F0;
}

.section {
  padding: 16px;

  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 12px;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      width: 4px;
      height: 14px;
      background: linear-gradient(180deg, #D4AF37, #F5E6C8);
      border-radius: 2px;
      margin-right: 8px;
    }
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  .feature-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #666666;
    background: #FDF8F0;
    padding: 12px;
    border-radius: 8px;
  }
}

.calendar-wrapper {
  background: #FDF8F0;
  border-radius: 12px;
  padding: 12px;

  :deep(.van-calendar__day) {
    font-size: 13px;
  }

  :deep(.van-calendar__bottom-info) {
    font-size: 10px;
    color: #D4AF37;
  }
}

.date-legend {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 12px;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #666666;

    .legend-dot {
      width: 12px;
      height: 12px;
      border-radius: 3px;

      &.available {
        background: #FFFFFF;
        border: 1px solid #E5E5E5;
      }

      &.booked {
        background: #E5E5E5;
      }

      &.selected {
        background: #D4AF37;
      }
    }
  }
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  .photo-item {
    border-radius: 8px;
    overflow: hidden;

    .photo-img {
      width: 100%;
      height: 100px;
    }
  }
}

.bottom-space {
  height: 100px;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
  z-index: 100;

  .bar-left {
    display: flex;
    gap: 24px;
    margin-right: 16px;

    .bar-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      font-size: 11px;
      color: #999999;
    }
  }

  .bar-right {
    flex: 1;
    display: flex;
    gap: 12px;

    .btn-panorama {
      flex: 1;
      height: 44px;
      border-radius: 22px;
      border: 1px solid #D4AF37;
      background: #FFFFFF;
      color: #D4AF37;
      font-size: 14px;
      font-weight: 500;
    }

    .btn-book {
      flex: 1;
      height: 44px;
      border-radius: 22px;
      background: linear-gradient(135deg, #D4AF37, #F5E6C8);
      border: none;
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>
