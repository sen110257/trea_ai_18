<template>
  <div class="home-page page-container">
    <div class="home-header">
      <div class="header-content">
        <div class="logo-section">
          <span class="logo-text">高端婚礼</span>
          <span class="logo-subtitle">定制您的完美婚礼</span>
        </div>
        <van-icon name="scan" size="22" color="#D4AF37" class="scan-icon" />
      </div>
    </div>

    <van-swipe class="banner-swipe" autoplay indicator-color="#D4AF37">
      <van-swipe-item v-for="banner in bannerList" :key="banner.id">
        <div class="banner-item" @click="handleBannerClick(banner)">
          <van-image
            :src="banner.image"
            class="banner-image"
            fit="cover"
            lazy-load
          />
          <div class="banner-overlay">
            <div class="banner-title">{{ banner.title }}</div>
            <div class="banner-subtitle">{{ banner.subtitle }}</div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <div class="quick-entrance-section">
      <div class="section-title">
        <span class="title-line"></span>
        <span class="title-text">快捷入口</span>
        <span class="title-line"></span>
      </div>
      <div class="entrance-grid">
        <div
          class="entrance-item"
          v-for="item in quickEntranceItems"
          :key="item.id"
          @click="handleEntranceClick(item)"
        >
          <div class="entrance-icon" :style="{ backgroundColor: item.color + '20' }">
            <van-icon :name="getIconName(item.icon)" size="26" :color="item.color" />
          </div>
          <span class="entrance-name">{{ item.name }}</span>
        </div>
      </div>
    </div>

    <div class="recommend-section">
      <div class="section-title">
        <span class="title-line"></span>
        <span class="title-text">精选婚礼模板</span>
        <span class="more-text" @click="goToTemplate">查看更多 ></span>
      </div>
      <div class="template-list">
        <div
          class="template-card"
          v-for="template in recommendedTemplates"
          :key="template.id"
          @click="goToTemplateDetail(template.id)"
        >
          <van-image
            :src="template.image"
            class="template-image"
            fit="cover"
            lazy-load
          />
          <div class="template-info">
            <div class="template-name">{{ template.name }}</div>
            <div class="template-desc">{{ template.description }}</div>
            <div class="template-bottom">
              <PriceTag :price="template.price" :original-price="template.originalPrice" size="sm" />
              <div class="template-tags">
                <van-tag type="primary" plain size="mini" v-for="tag in template.tags.slice(0, 2)" :key="tag">
                  {{ tag }}
                </van-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="venue-section">
      <div class="section-title">
        <span class="title-line"></span>
        <span class="title-text">热门场地推荐</span>
        <span class="more-text" @click="goToVenue">查看更多 ></span>
      </div>
      <div class="venue-list">
        <div
          class="venue-card"
          v-for="venue in recommendedVenues"
          :key="venue.id"
          @click="goToVenueDetail(venue.id)"
        >
          <van-image
            :src="venue.image"
            class="venue-image"
            fit="cover"
            lazy-load
          />
          <div class="venue-badge">
            <van-icon name="photo-o" size="12" color="#FFFFFF" />
            <span>3D全景</span>
          </div>
          <div class="venue-info">
            <div class="venue-name">{{ venue.name }}</div>
            <div class="venue-meta">
              <span class="capacity">容纳{{ venue.capacity }}人</span>
              <span class="rating">
                <van-icon name="star" size="12" color="#D4AF37" />
                {{ venue.rating }}
              </span>
            </div>
            <div class="venue-price">
              <span class="price-unit">¥</span>
              <span class="price-value">{{ venue.pricePerTable }}</span>
              <span class="price-unit">/桌</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="staff-section">
      <div class="section-title">
        <span class="title-line"></span>
        <span class="title-text">专业团队</span>
        <span class="more-text" @click="goToStaff">查看更多 ></span>
      </div>
      <div class="staff-list">
        <div
          class="staff-card"
          v-for="staff in recommendedStaff"
          :key="staff.id"
          @click="goToStaffDetail(staff.id)"
        >
          <van-image
            :src="staff.avatar"
            class="staff-avatar"
            fit="cover"
            lazy-load
          />
          <div class="staff-info">
            <div class="staff-name">{{ staff.name }}</div>
            <div class="staff-role">{{ staff.role }}</div>
            <div class="staff-meta">
              <span class="experience">{{ staff.experience }}年经验</span>
              <span class="rating">
                <van-icon name="star" size="10" color="#D4AF37" />
                {{ staff.rating }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-section">
      <div class="footer-divider"></div>
      <div class="footer-text">高端婚礼策划定制 · 为您打造完美婚礼</div>
      <div class="footer-contact">
        <van-icon name="phone-o" size="12" color="#999" />
        <span>400-888-8888</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import PriceTag from '@/components/PriceTag.vue'
import { bannerList, quickEntranceItems, weddingTemplates, weddingVenues, professionalStaff } from '@/mock/data.js'

const router = useRouter()

const recommendedTemplates = computed(() => weddingTemplates.slice(0, 3))
const recommendedVenues = computed(() => weddingVenues.slice(0, 3))
const recommendedStaff = computed(() => professionalStaff.slice(0, 4))

const getIconName = (icon) => {
  const iconMap = {
    template: 'photo-o',
    venue: 'location-o',
    package: 'gift-o',
    staff: 'manager-o',
    invitation: 'envelope-o',
    guest: 'friends-o',
    service: 'service-o',
    booking: 'orders-o'
  }
  return iconMap[icon] || 'apps-o'
}

const handleBannerClick = (banner) => {
  Toast('查看活动详情')
}

const handleEntranceClick = (item) => {
  if (item.path) {
    router.push(item.path)
  } else {
    Toast('功能开发中')
  }
}

const goToTemplate = () => {
  router.push('/template')
}

const goToTemplateDetail = (id) => {
  router.push(`/template-detail/${id}`)
}

const goToVenue = () => {
  router.push('/venue')
}

const goToVenueDetail = (id) => {
  router.push(`/venue-detail/${id}`)
}

const goToStaff = () => {
  router.push('/staff')
}

const goToStaffDetail = (id) => {
  router.push(`/staff-detail/${id}`)
}
</script>

<style lang="less" scoped>
.home-page {
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 50%, #FDF8F0 100%);
  min-height: 100vh;
  padding-bottom: calc(50px + env(safe-area-inset-bottom));
}

.home-header {
  background: #FFFFFF;
  padding: 12px 16px;
  padding-top: calc(12px + env(safe-area-inset-top));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo-section {
      display: flex;
      flex-direction: column;

      .logo-text {
        font-size: 18px;
        font-weight: 700;
        background: linear-gradient(135deg, #D4AF37 0%, #F5E6C8 50%, #D4AF37 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: 1px;
      }

      .logo-subtitle {
        font-size: 11px;
        color: #999999;
        margin-top: 2px;
      }
    }

    .scan-icon {
      padding: 4px;
    }
  }
}

.banner-swipe {
  height: 180px;
  margin: 16px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.15);

  .banner-item {
    position: relative;
    height: 100%;
    cursor: pointer;

    .banner-image {
      width: 100%;
      height: 100%;
    }

    .banner-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px 16px;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));

      .banner-title {
        font-size: 16px;
        font-weight: 600;
        color: #FFFFFF;
        margin-bottom: 4px;
      }

      .banner-subtitle {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.85);
      }
    }
  }
}

.quick-entrance-section {
  background: #FFFFFF;
  margin: 0 16px;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

  .section-title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;

    .title-line {
      width: 30px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #D4AF37);
    }

    .title-line:last-child {
      background: linear-gradient(90deg, #D4AF37, transparent);
    }

    .title-text {
      font-size: 15px;
      font-weight: 600;
      color: #333333;
      margin: 0 12px;
    }
  }

  .entrance-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .entrance-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 4px;
    border-radius: 12px;
    transition: all 0.2s ease;

    &:active {
      transform: scale(0.95);
      background: #F5F5F5;
    }

    .entrance-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 6px;
    }

    .entrance-name {
      font-size: 11px;
      color: #666666;
      text-align: center;
    }
  }
}

.recommend-section,
.venue-section,
.staff-section {
  margin-top: 20px;

  .section-title {
    display: flex;
    align-items: center;
    padding: 0 16px;
    margin-bottom: 12px;

    .title-line {
      width: 4px;
      height: 14px;
      background: linear-gradient(180deg, #D4AF37, #F5E6C8);
      border-radius: 2px;
      margin-right: 8px;
    }

    .title-text {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      flex: 1;
    }

    .more-text {
      font-size: 13px;
      color: #D4AF37;
    }
  }
}

.template-list {
  padding: 0 16px;
}

.template-card {
  background: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
  }

  .template-image {
    width: 100%;
    height: 160px;
  }

  .template-info {
    padding: 12px;

    .template-name {
      font-size: 15px;
      font-weight: 600;
      color: #333333;
      margin-bottom: 4px;
    }

    .template-desc {
      font-size: 12px;
      color: #999999;
      margin-bottom: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .template-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .template-tags {
        display: flex;
        gap: 6px;
      }
    }
  }
}

.venue-list {
  padding: 0 16px;
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.venue-card {
  width: 200px;
  flex-shrink: 0;
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  position: relative;

  &:active {
    transform: scale(0.98);
  }

  .venue-image {
    width: 100%;
    height: 120px;
  }

  .venue-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(212, 175, 55, 0.9);
    padding: 4px 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: #FFFFFF;
  }

  .venue-info {
    padding: 10px;

    .venue-name {
      font-size: 14px;
      font-weight: 600;
      color: #333333;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .venue-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 11px;
      color: #999999;

      .rating {
        display: flex;
        align-items: center;
        gap: 2px;
        color: #D4AF37;
      }
    }

    .venue-price {
      .price-unit {
        font-size: 11px;
        color: #D4AF37;
      }

      .price-value {
        font-size: 16px;
        font-weight: 600;
        color: #D4AF37;
      }
    }
  }
}

.staff-list {
  padding: 0 16px;
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.staff-card {
  width: 100px;
  flex-shrink: 0;
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  padding: 12px 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  text-align: center;

  &:active {
    transform: scale(0.95);
  }

  .staff-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin: 0 auto 8px;
    border: 2px solid #F5E6C8;
  }

  .staff-info {
    .staff-name {
      font-size: 13px;
      font-weight: 600;
      color: #333333;
      margin-bottom: 2px;
    }

    .staff-role {
      font-size: 10px;
      color: #D4AF37;
      margin-bottom: 4px;
    }

    .staff-meta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 10px;
      color: #999999;

      .rating {
        display: flex;
        align-items: center;
        gap: 2px;
        color: #D4AF37;
      }
    }
  }
}

.footer-section {
  margin-top: 24px;
  padding: 24px 16px;
  padding-bottom: calc(24px + 50px + env(safe-area-inset-bottom));
  text-align: center;

  .footer-divider {
    width: 60%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #E5E5E5, transparent);
    margin: 0 auto 16px;
  }

  .footer-text {
    font-size: 12px;
    color: #999999;
    margin-bottom: 8px;
  }

  .footer-contact {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 12px;
    color: #999999;
  }
}
</style>
