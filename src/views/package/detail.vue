<template>
  <div class="package-detail-page page-container-no-tabbar" v-if="currentPackage">
    <PageHeader title="套餐详情" />

    <div class="detail-content">
      <div class="package-header">
        <van-image
          :src="currentPackage.image"
          class="package-image"
          fit="cover"
          lazy-load
        />
        <div class="package-info-overlay">
          <h1 class="package-name">{{ currentPackage.name }}</h1>
          <span class="package-en">{{ currentPackage.nameEn }}</span>
        </div>
      </div>

      <div class="price-section" v-if="!currentPackage.isCustom">
        <div class="price-info">
          <div class="current-price">
            <span class="unit">¥</span>
            <span class="value">{{ formatPrice(currentPackage.price) }}</span>
          </div>
          <div class="original-price" v-if="currentPackage.originalPrice">
            原价 ¥{{ formatPrice(currentPackage.originalPrice) }}
          </div>
        </div>
        <div class="discount-badge" v-if="currentPackage.discount">
          {{ currentPackage.discount }}
        </div>
      </div>

      <div class="custom-price-section" v-else>
        <div class="custom-title">
          <van-icon name="edit" size="18" color="#D4AF37" />
          <span>私人定制 - 自由选配</span>
        </div>
        <p class="custom-desc">根据您的需求自由选择服务项目，价格实时计算</p>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h3 class="section-title">套餐服务</h3>
        <div class="services-summary" v-if="currentPackage.services.length > 0">
          <div class="service-tag" v-for="(service, index) in currentPackage.services" :key="index">
            {{ service }}
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h3 class="section-title">包含项目</h3>
        <p class="section-subtitle" v-if="!currentPackage.isCustom">以下项目已包含在套餐中</p>
        <div class="included-items">
          <div class="item-card" v-for="item in allItems" :key="item.id">
            <div class="item-left">
              <van-checkbox
                :model-value="isItemIncluded(item)"
                :disabled="!currentPackage.isCustom && isRequired(item)"
                @change="handleItemChange(item)"
                shape="square"
                checked-color="#D4AF37"
              />
              <div class="item-info">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-tag" v-if="isRequired(item)">必选</span>
              </div>
            </div>
            <div class="item-right">
              <div class="item-price">¥{{ item.price }}</div>
              <van-stepper
                v-if="currentPackage.isCustom && item.quantity !== undefined"
                v-model="item.quantity"
                :min="0"
                :max="10"
                input-width="32px"
                button-size="22px"
                @change="handleQuantityChange"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="divider" v-if="optionalItems.length > 0"></div>

      <div class="section" v-if="optionalItems.length > 0">
        <h3 class="section-title">可选项目</h3>
        <p class="section-subtitle">可根据需求自由选择</p>
        <div class="optional-items">
          <div class="optional-item" v-for="item in optionalItems" :key="item.id">
            <div class="item-left">
              <van-checkbox
                :model-value="isOptionalSelected(item)"
                @change="handleOptionalChange(item)"
                shape="square"
                checked-color="#D4AF37"
              />
              <span class="item-name">{{ item.name }}</span>
            </div>
            <div class="item-price">¥{{ item.price }}</div>
          </div>
        </div>
      </div>

      <div class="bottom-space"></div>
    </div>

    <div class="bottom-bar">
      <div class="bar-left">
        <div class="total-label">合计</div>
        <div class="total-price">
          <span class="unit">¥</span>
          <span class="value">{{ formatPrice(totalPrice) }}</span>
        </div>
        <div class="price-detail" v-if="selectedItems.length > 0">
          已选{{ selectedItems.length }}项
        </div>
      </div>
      <van-button class="btn-book" @click="handleBook">
        立即预约
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showDialog, showSuccessToast } from 'vant'
import PageHeader from '@/components/PageHeader.vue'
import { weddingPackages } from '@/mock/data.js'
import { usePackageStore } from '@/store/package.js'

const route = useRoute()
const router = useRouter()
const packageStore = usePackageStore()

const packageId = computed(() => parseInt(route.params.id))
const currentPackage = computed(() => weddingPackages.find(p => p.id === packageId.value))

const selectedItems = ref([])
const selectedOptionals = ref([])

const allItems = computed(() => currentPackage.value?.includes || [])
const optionalItems = computed(() => currentPackage.value?.optionals || [])

const formatPrice = (price) => {
  if (!price || price === 0) return '0'
  return Number(price).toLocaleString('zh-CN')
}

const isItemIncluded = (item) => {
  if (!currentPackage.value?.isCustom) {
    return item.included
  }
  return selectedItems.value.some(i => i.id === item.id) || item.included
}

const isRequired = (item) => {
  return item.required === true
}

const isOptionalSelected = (item) => {
  return selectedOptionals.value.some(i => i.id === item.id)
}

const totalPrice = computed(() => {
  let total = 0
  
  if (currentPackage.value && !currentPackage.value.isCustom) {
    total = currentPackage.value.price
  }
  
  selectedItems.value.forEach(item => {
    total += item.price * (item.quantity || 1)
  })
  
  selectedOptionals.value.forEach(item => {
    total += item.price * (item.quantity || 1)
  })
  
  return total
})

const handleItemChange = (item) => {
  if (!currentPackage.value?.isCustom && item.required) return
  
  const index = selectedItems.value.findIndex(i => i.id === item.id)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push({ ...item, quantity: item.quantity || 1 })
  }
}

const handleOptionalChange = (item) => {
  const index = selectedOptionals.value.findIndex(i => i.id === item.id)
  if (index > -1) {
    selectedOptionals.value.splice(index, 1)
  } else {
    selectedOptionals.value.push({ ...item, quantity: 1 })
  }
}

const handleQuantityChange = () => {
  // 价格自动计算
}

const handleBook = () => {
  showDialog({
    title: '确认预约',
    message: `您确定要预约${currentPackage.value?.name}吗？\n\n预计总价：¥${formatPrice(totalPrice.value)}`,
    confirmButtonText: '确认预约',
    confirmButtonColor: '#D4AF37'
  }).then(() => {
    showSuccessToast('预约成功，工作人员将在24小时内联系您')
    router.push('/my-orders')
  }).catch(() => {
    // 用户取消
  })
}

onMounted(() => {
  if (currentPackage.value) {
    if (currentPackage.value.isCustom) {
      selectedItems.value = []
    } else {
      selectedItems.value = currentPackage.value.includes.filter(i => i.included).map(i => ({ ...i, quantity: i.quantity || 1 }))
    }
  }
})
</script>

<style lang="less" scoped>
.package-detail-page {
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
  min-height: 100vh;
  position: relative;
}

.detail-content {
  padding-bottom: 80px;
}

.package-header {
  position: relative;
  height: 200px;

  .package-image {
    width: 100%;
    height: 100%;
  }

  .package-info-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 16px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));

    .package-name {
      font-size: 20px;
      font-weight: 700;
      color: #FFFFFF;
      margin: 0;
    }

    .package-en {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.8);
      margin-left: 8px;
    }
  }
}

.price-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #FFFFFF;

  .price-info {
    .current-price {
      display: flex;
      align-items: baseline;

      .unit {
        font-size: 16px;
        color: #D4AF37;
      }

      .value {
        font-size: 28px;
        font-weight: 700;
        color: #D4AF37;
      }
    }

    .original-price {
      font-size: 13px;
      color: #999999;
      text-decoration: line-through;
      margin-top: 4px;
    }
  }

  .discount-badge {
    background: linear-gradient(135deg, #D4A5A5, #E8C4C4);
    color: #FFFFFF;
    font-size: 14px;
    padding: 6px 16px;
    border-radius: 20px;
    font-weight: 600;
  }
}

.custom-price-section {
  padding: 16px;
  background: #FFFFFF;

  .custom-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
  }

  .custom-desc {
    font-size: 13px;
    color: #666666;
    margin-top: 6px;
  }
}

.divider {
  height: 8px;
  background: #FDF8F0;
}

.section {
  padding: 16px;
  background: #FFFFFF;

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

  .section-subtitle {
    font-size: 12px;
    color: #999999;
    margin-bottom: 12px;
  }
}

.services-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .service-tag {
    padding: 6px 12px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(245, 230, 200, 0.3));
    color: #D4AF37;
    font-size: 12px;
    border-radius: 16px;
    border: 1px solid rgba(212, 175, 55, 0.2);
  }
}

.included-items {
  .item-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #F5F5F5;

    &:last-child {
      border-bottom: none;
    }

    .item-left {
      display: flex;
      align-items: center;
      gap: 10px;

      .item-info {
        display: flex;
        align-items: center;
        gap: 8px;

        .item-name {
          font-size: 14px;
          color: #333333;
        }

        .item-tag {
          font-size: 10px;
          color: #D4AF37;
          background: rgba(212, 175, 55, 0.1);
          padding: 2px 6px;
          border-radius: 3px;
        }
      }
    }

    .item-right {
      display: flex;
      align-items: center;
      gap: 12px;

      .item-price {
        font-size: 14px;
        color: #D4AF37;
        font-weight: 500;
      }
    }
  }
}

.optional-items {
  .optional-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #F5F5F5;

    &:last-child {
      border-bottom: none;
    }

    .item-left {
      display: flex;
      align-items: center;
      gap: 10px;

      .item-name {
        font-size: 14px;
        color: #333333;
      }
    }

    .item-price {
      font-size: 14px;
      color: #999999;
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
    flex-direction: column;
    margin-right: 16px;

    .total-label {
      font-size: 12px;
      color: #666666;
      margin-bottom: 2px;
    }

    .total-price {
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
    }

    .price-detail {
      font-size: 11px;
      color: #999999;
      margin-top: 2px;
    }
  }

  .btn-book {
    flex: 1;
    height: 44px;
    border-radius: 22px;
    background: linear-gradient(135deg, #D4AF37, #F5E6C8);
    border: none;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: 600;
  }
}
</style>
