<template>
  <div class="package-page page-container-no-tabbar">
    <PageHeader title="婚礼套餐" />

    <div class="package-content">
      <div class="package-tabs">
        <div
          class="tab-item"
          v-for="(tab, index) in packageTabs"
          :key="index"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          {{ tab }}
        </div>
      </div>

      <div class="package-list">
        <div
          class="package-card"
          v-for="pkg in displayPackages"
          :key="pkg.id"
          @click="goToDetail(pkg.id)"
        >
          <div class="package-header" :class="getPackageClass(pkg.id)">
            <van-image
              :src="pkg.image"
              class="package-image"
              fit="cover"
              lazy-load
            />
            <div class="package-tag" v-if="pkg.tag">
              {{ pkg.tag }}
            </div>
            <div class="discount-tag" v-if="pkg.discount">
              {{ pkg.discount }}
            </div>
          </div>
          <div class="package-info">
            <h3 class="package-name">{{ pkg.name }}</h3>
            <span class="package-en">{{ pkg.nameEn }}</span>
            <p class="package-desc">{{ pkg.description }}</p>
            
            <div class="package-services">
              <div class="service-item" v-for="(service, index) in pkg.services.slice(0, 4)" :key="index">
                <van-icon name="passed" size="12" color="#D4AF37" />
                <span>{{ service }}</span>
              </div>
            </div>

            <div class="package-footer">
              <div class="price-section">
                <div class="current-price">
                  <span class="unit">¥</span>
                  <span class="value">{{ formatPrice(pkg.price) }}</span>
                  <span class="suffix" v-if="!pkg.isCustom">起</span>
                </div>
                <div class="original-price" v-if="pkg.originalPrice">
                  ¥{{ formatPrice(pkg.originalPrice) }}
                </div>
              </div>
              <van-button class="btn-select" @click.stop="handleSelect(pkg)">
                {{ pkg.isCustom ? '开始定制' : '选择套餐' }}
              </van-button>
            </div>
          </div>
        </div>
      </div>

      <div class="tips-section">
        <div class="tips-header">
          <van-icon name="info-o" size="16" color="#D4AF37" />
          <span class="tips-title">套餐说明</span>
        </div>
        <ul class="tips-list">
          <li>• 所有套餐支持自由选配项目，价格实时计算</li>
          <li>• 私人定制套餐可根据您的需求量身打造</li>
          <li>• 预约成功后可享受专业婚礼策划师一对一服务</li>
          <li>• 套餐价格不含场地费用，场地需另行预约</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast } from 'vant'
import PageHeader from '@/components/PageHeader.vue'
import { weddingPackages } from '@/mock/data.js'

const router = useRouter()

const packageTabs = ['全部套餐', '标准套餐', '豪华套餐', '私人定制']
const activeTab = ref(0)

const formatPrice = (price) => {
  if (!price || price === 0) return '咨询客服'
  return Number(price).toLocaleString('zh-CN')
}

const displayPackages = computed(() => {
  if (activeTab.value === 0) return weddingPackages
  if (activeTab.value === 1) return weddingPackages.filter(p => p.id === 1)
  if (activeTab.value === 2) return weddingPackages.filter(p => p.id === 2)
  if (activeTab.value === 3) return weddingPackages.filter(p => p.id === 3)
  return weddingPackages
})

const getPackageClass = (id) => {
  const classes = {
    1: 'standard',
    2: 'luxury',
    3: 'custom'
  }
  return classes[id] || ''
}

const goToDetail = (id) => {
  router.push(`/package-detail/${id}`)
}

const handleSelect = (pkg) => {
  if (pkg.isCustom) {
    router.push(`/package-detail/${pkg.id}`)
  } else {
    showSuccessToast(`已选择${pkg.name}，前往详情页确认`)
    router.push(`/package-detail/${pkg.id}`)
  }
}
</script>

<style lang="less" scoped>
.package-page {
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
  min-height: 100vh;
}

.package-content {
  padding-bottom: 20px;
}

.package-tabs {
  display: flex;
  background: #FFFFFF;
  padding: 12px 16px;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .tab-item {
    flex-shrink: 0;
    padding: 8px 16px;
    background: #F5F5F5;
    border-radius: 20px;
    font-size: 13px;
    color: #666666;
    transition: all 0.3s ease;

    &.active {
      background: linear-gradient(135deg, #D4AF37, #F5E6C8);
      color: #FFFFFF;
      font-weight: 500;
    }
  }
}

.package-list {
  padding: 16px;
}

.package-card {
  background: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
  }

  .package-header {
    position: relative;
    height: 160px;

    &.standard {
      ::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #8A8A8A, #B0B0B0);
      }
    }

    &.luxury {
      ::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #D4AF37, #F5E6C8);
      }
    }

    &.custom {
      ::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #D4A5A5, #E8C4C4);
      }
    }

    .package-image {
      width: 100%;
      height: 100%;
    }

    .package-tag {
      position: absolute;
      top: 12px;
      left: 12px;
      background: linear-gradient(135deg, #D4AF37, #F5E6C8);
      color: #FFFFFF;
      font-size: 12px;
      padding: 4px 12px;
      border-radius: 4px;
      font-weight: 500;
    }

    .discount-tag {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(212, 165, 165, 0.9);
      color: #FFFFFF;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 4px;
      font-weight: 500;
    }
  }

  .package-info {
    padding: 14px 16px;

    .package-name {
      font-size: 17px;
      font-weight: 600;
      color: #333333;
      margin: 0;
      display: inline-block;
    }

    .package-en {
      font-size: 11px;
      color: #999999;
      margin-left: 8px;
    }

    .package-desc {
      font-size: 13px;
      color: #666666;
      margin: 6px 0 12px;
      line-height: 1.5;
    }

    .package-services {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-bottom: 12px;

      .service-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: #666666;
      }
    }

    .package-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 12px;
      border-top: 1px solid #F5F5F5;

      .price-section {
        display: flex;
        flex-direction: column;

        .current-price {
          display: flex;
          align-items: baseline;

          .unit {
            font-size: 14px;
            color: #D4AF37;
          }

          .value {
            font-size: 24px;
            font-weight: 700;
            color: #D4AF37;
          }

          .suffix {
            font-size: 12px;
            color: #999999;
            margin-left: 4px;
          }
        }

        .original-price {
          font-size: 12px;
          color: #999999;
          text-decoration: line-through;
          margin-top: 2px;
        }
      }

      .btn-select {
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
}

.tips-section {
  margin: 0 16px;
  padding: 16px;
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .tips-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;

    .tips-title {
      font-size: 14px;
      font-weight: 600;
      color: #333333;
    }
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
