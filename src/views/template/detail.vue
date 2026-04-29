<template>
  <div class="template-detail-page page-container-no-tabbar">
    <div class="detail-banner" v-if="template">
      <van-swipe class="banner-swipe" :show-indicators="template.scenes.length > 1">
        <van-swipe-item v-for="(scene, index) in template.scenes" :key="index">
          <van-image
            :src="scene"
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
    </div>

    <div class="detail-content" v-if="template">
      <div class="info-section">
        <div class="title-row">
          <h1 class="template-title">{{ template.name }}</h1>
          <span class="template-en">{{ template.nameEn }}</span>
        </div>
        <div class="tag-row">
          <van-tag type="primary" plain v-for="tag in template.tags" :key="tag">
            {{ tag }}
          </van-tag>
        </div>
        <div class="price-row">
          <PriceTag :price="template.price" :original-price="template.originalPrice" size="xl" />
          <div class="discount-badge">
            {{ calculateDiscount(template.price, template.originalPrice) }}折
          </div>
        </div>
        <p class="template-description">{{ template.description }}</p>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h3 class="section-title">风格特点</h3>
        <div class="features-grid">
          <div class="feature-item" v-for="(feature, index) in template.features" :key="index">
            <van-icon name="passed" size="14" color="#D4AF37" />
            <span>{{ feature }}</span>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h3 class="section-title">场地信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">推荐场地</span>
            <span class="info-value">{{ template.details.venue }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">容纳人数</span>
            <span class="info-value">{{ template.details.guests }}人</span>
          </div>
          <div class="info-item">
            <span class="info-label">服务时长</span>
            <span class="info-value">{{ template.details.duration }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">婚礼风格</span>
            <span class="info-value">{{ template.details.style }}</span>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h3 class="section-title">包含服务</h3>
        <div class="service-list">
          <div class="service-item" v-for="(pkg, index) in template.packages" :key="index">
            <div class="service-left">
              <van-icon
                :name="pkg.included ? 'checked' : 'circle'"
                size="18"
                :color="pkg.included ? '#D4AF37' : '#CCCCCC'"
              />
              <span class="service-name">{{ pkg.name }}</span>
            </div>
            <span class="service-price" :class="{ 'striked': !pkg.included }">¥{{ pkg.price }}</span>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h3 class="section-title">场景预览</h3>
        <div class="scene-list">
          <div
            class="scene-item"
            v-for="(scene, index) in template.scenes"
            :key="index"
          >
            <van-image
              :src="scene"
              class="scene-img"
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
        <div class="bar-item" @click="goToVenue">
          <van-icon name="location-o" size="20" color="#999999" />
          <span>找场地</span>
        </div>
      </div>
      <div class="bar-right">
        <van-button class="btn-preview" @click="previewTemplate">
          预览模板
        </van-button>
        <van-button class="btn-apply" @click="applyTemplate">
          一键套用
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast, showSuccessToast } from 'vant'
import PageHeader from '@/components/PageHeader.vue'
import PriceTag from '@/components/PriceTag.vue'
import { weddingTemplates } from '@/mock/data.js'
import { useFavoritesStore } from '@/store/favorites.js'

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()

const templateId = computed(() => parseInt(route.params.id))
const template = computed(() => weddingTemplates.find(t => t.id === templateId.value))

const isFavorited = computed(() => {
  if (!template.value) return false
  return favoritesStore.isTemplateFavorited(template.value.id)
})

const calculateDiscount = (price, originalPrice) => {
  if (!originalPrice || originalPrice === 0) return 0
  return ((price / originalPrice) * 10).toFixed(1)
}

const goBack = () => {
  router.back()
}

const toggleFavorite = () => {
  if (!template.value) return
  const added = favoritesStore.toggleTemplate(template.value)
  showSuccessToast(added ? '已添加到收藏' : '已取消收藏')
}

const previewTemplate = () => {
  showToast('进入模板预览模式')
}

const applyTemplate = () => {
  showSuccessToast('已套用策划方案，请前往预约页面确认')
  router.push('/package')
}

const goToVenue = () => {
  router.push('/venue')
}
</script>

<style lang="less" scoped>
.template-detail-page {
  background: #FDF8F0;
  min-height: 100vh;
  position: relative;
}

.detail-banner {
  position: relative;
  height: 280px;

  .banner-swipe {
    height: 100%;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }

  .back-btn,
  .favorite-btn {
    position: absolute;
    top: calc(20px + env(safe-area-inset-top));
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
  }

  .favorite-btn {
    right: 16px;
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
    .template-title {
      font-size: 20px;
      font-weight: 700;
      color: #333333;
      margin: 0;
    }

    .template-en {
      font-size: 12px;
      color: #999999;
      margin-left: 8px;
    }
  }

  .tag-row {
    margin-top: 8px;
    display: flex;
    gap: 8px;
  }

  .price-row {
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 12px;

    .discount-badge {
      background: linear-gradient(135deg, #D4AF37, #F5E6C8);
      color: #FFFFFF;
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
    }
  }

  .template-description {
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
    gap: 6px;
    font-size: 13px;
    color: #666666;
    background: #FDF8F0;
    padding: 10px 12px;
    border-radius: 8px;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .info-label {
      font-size: 12px;
      color: #999999;
    }

    .info-value {
      font-size: 14px;
      color: #333333;
      font-weight: 500;
    }
  }
}

.service-list {
  .service-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #F5F5F5;

    &:last-child {
      border-bottom: none;
    }

    .service-left {
      display: flex;
      align-items: center;
      gap: 8px;

      .service-name {
        font-size: 14px;
        color: #333333;
      }
    }

    .service-price {
      font-size: 14px;
      color: #D4AF37;
      font-weight: 500;

      &.striked {
        color: #CCCCCC;
        text-decoration: line-through;
      }
    }
  }
}

.scene-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  .scene-item {
    border-radius: 8px;
    overflow: hidden;

    .scene-img {
      width: 100%;
      height: 80px;
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

    .btn-preview {
      flex: 1;
      height: 44px;
      border-radius: 22px;
      border: 1px solid #D4AF37;
      background: #FFFFFF;
      color: #D4AF37;
      font-size: 14px;
      font-weight: 500;
    }

    .btn-apply {
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
