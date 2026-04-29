<template>
  <div class="venue-page page-container-no-tabbar">
    <PageHeader title="婚礼场地" />

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="venue-content">
        <div class="venue-list">
          <div
            class="venue-card"
            v-for="venue in venues"
            :key="venue.id"
            @click="goToDetail(venue.id)"
          >
            <div class="venue-image-wrapper">
              <van-image
                :src="venue.image"
                class="venue-image"
                fit="cover"
                lazy-load
              />
              <div class="venue-badges">
                <div class="badge panorama" @click.stop="goToPanorama(venue.id)">
                  <van-icon name="photo-o" size="12" color="#FFFFFF" />
                  <span>3D全景</span>
                </div>
                <div class="badge rating">
                  <van-icon name="star" size="10" color="#D4AF37" />
                  <span>{{ venue.rating }}</span>
                </div>
              </div>
            </div>
            <div class="venue-info">
              <div class="venue-header">
                <h3 class="venue-name">{{ venue.name }}</h3>
                <span class="venue-en">{{ venue.nameEn }}</span>
              </div>
              <p class="venue-desc">{{ venue.description }}</p>
              <div class="venue-meta-row">
                <div class="meta-item">
                  <van-icon name="location-o" size="12" color="#999999" />
                  <span>容纳{{ venue.capacity }}人</span>
                </div>
                <div class="meta-item">
                  <van-icon name="photo-o" size="12" color="#999999" />
                  <span>{{ venue.area }}</span>
                </div>
                <div class="meta-item">
                  <van-icon name="info-o" size="12" color="#999999" />
                  <span>层高{{ venue.height }}</span>
                </div>
              </div>
              <div class="venue-features">
                <van-tag type="primary" plain size="mini" v-for="feature in venue.features.slice(0, 4)" :key="feature">
                  {{ feature }}
                </van-tag>
              </div>
              <div class="venue-footer">
                <div class="price-section">
                  <span class="price-unit">¥</span>
                  <span class="price-value">{{ venue.pricePerTable }}</span>
                  <span class="price-unit">/桌起</span>
                </div>
                <div class="review-section">
                  <van-icon name="chat-o" size="12" color="#999999" />
                  <span>{{ venue.reviewCount }}条评价</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tips-section">
          <div class="tips-title">
            <van-icon name="info-o" size="14" color="#D4AF37" />
            <span>场地预约须知</span>
          </div>
          <ul class="tips-list">
            <li>1. 场地档期实时更新，建议提前1-3个月预约</li>
            <li>2. 点击「3D全景」可沉浸式查看场地实景</li>
            <li>3. 可查看场地容纳人数、层高、设施等详细信息</li>
            <li>4. 预约成功后工作人员将在24小时内联系您确认</li>
          </ul>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast } from 'vant'
import PageHeader from '@/components/PageHeader.vue'
import { weddingVenues } from '@/mock/data.js'

const router = useRouter()
const venues = ref(weddingVenues)
const refreshing = ref(false)

const onRefresh = () => {
  setTimeout(() => {
    refreshing.value = false
    showSuccessToast('刷新成功')
  }, 1000)
}

const goToDetail = (id) => {
  router.push(`/venue-detail/${id}`)
}

const goToPanorama = (id) => {
  router.push(`/venue-panorama/${id}`)
}
</script>

<style lang="less" scoped>
.venue-page {
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
  min-height: 100vh;
}

.venue-content {
  padding-bottom: 20px;
}

.venue-list {
  padding: 16px;
}

.venue-card {
  background: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
  }

  .venue-image-wrapper {
    position: relative;
    height: 180px;

    .venue-image {
      width: 100%;
      height: 100%;
    }

    .venue-badges {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .badge {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 11px;
        color: #FFFFFF;

        &.panorama {
          background: linear-gradient(135deg, #D4AF37, #F5E6C8);
          cursor: pointer;

          &:active {
            opacity: 0.8;
          }
        }

        &.rating {
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }

  .venue-info {
    padding: 14px 16px;

    .venue-header {
      display: flex;
      align-items: baseline;
      gap: 8px;

      .venue-name {
        font-size: 16px;
        font-weight: 600;
        color: #333333;
        margin: 0;
      }

      .venue-en {
        font-size: 11px;
        color: #999999;
      }
    }

    .venue-desc {
      font-size: 13px;
      color: #666666;
      margin: 6px 0 10px;
      line-height: 1.5;
    }

    .venue-meta-row {
      display: flex;
      gap: 16px;
      margin-bottom: 10px;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: #999999;
      }
    }

    .venue-features {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }

    .venue-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 10px;
      border-top: 1px solid #F5F5F5;

      .price-section {
        .price-unit {
          font-size: 12px;
          color: #D4AF37;
        }

        .price-value {
          font-size: 20px;
          font-weight: 600;
          color: #D4AF37;
        }
      }

      .review-section {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: #999999;
      }
    }
  }
}

.tips-section {
  margin: 0 16px;
  padding: 16px;
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .tips-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 12px;
  }

  .tips-list {
    margin: 0;
    padding-left: 0;
    list-style: none;

    li {
      font-size: 12px;
      color: #666666;
      line-height: 1.8;
      margin-bottom: 4px;
    }
  }
}
</style>
