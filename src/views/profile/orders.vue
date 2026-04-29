<template>
  <div class="orders-page page-container-no-tabbar">
    <PageHeader title="我的预约" />

    <div class="tabs-section">
      <van-tabs v-model:active="activeTab" :color="tabbarActiveColor" line-width="30">
        <van-tab title="全部">
          <div class="order-list" v-if="allOrders.length > 0">
            <div
              class="order-card" v-for="order in allOrders" :key="order.id">
              <div class="order-header">
                <span class="order-no">{{ order.orderNo }}</span>
                <van-tag
                  :type="getStatusType(order.status)"
                  size="mini"
                >
                  {{ order.statusText }}
                </van-tag>
              </div>
              <div class="order-content">
                <van-image
                  :src="order.image"
                  class="order-image"
                  fit="cover"
                  lazy-load
                />
                <div class="order-info">
                  <h4 class="order-type">{{ order.type }}</h4>
                  <p class="order-name">{{ order.name }}</p>
                  <p class="order-date">
                    <van-icon name="calendar-o" size="12" color="#999999" />
                    {{ order.date }}
                  </p>
                </div>
              </div>
              <div class="order-footer">
                <span class="order-price">
                  合计：<span class="price-text">¥{{ formatPrice(order.price) }}</span>
                </span>
                <div class="order-actions">
                  <van-button
                  size="small" plain type="default"
                  @click="cancelOrder(order)"
                  v-if="order.status === 'pending'"
                >
                  取消预约
                </van-button>
                <van-button
                  size="small" type="primary"
                  @click="contactService(order)"
                  :style="{ background: order.status === 'completed' ? '#999999' : 'linear-gradient(135deg, #D4AF37, #F5E6C8)' }"
                >
                  {{ order.status === 'completed' ? '再次预约' : '联系客服' }}
                </van-button>
              </div>
            </div>
          </div>
          <van-empty v-else description="暂无预约订单" />
        </van-tab>
        <van-tab title="待确认">
          <div class="order-list" v-if="pendingOrders.length > 0">
            <div class="order-card" v-for="order in pendingOrders" :key="order.id">
              <!-- 订单内容 -->
            </div>
          </div>
          <van-empty v-else description="暂无待确认订单" />
        </van-tab>
        <van-tab title="已完成">
          <div class="order-list" v-if="completedOrders.length > 0">
            <div class="order-card" v-for="order in completedOrders" :key="order.id">
              <!-- 订单内容 -->
            </div>
          </div>
          <van-empty v-else description="暂无已完成订单" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showDialog, showSuccessToast } from 'vant'
import PageHeader from '@/components/PageHeader.vue'
import { myOrders } from '@/mock/data.js'

const router = useRouter()

const tabbarActiveColor = '#D4AF37'
const activeTab = ref(0)
const orderList = ref([])

const allOrders = computed(() => orderList.value)
const pendingOrders = computed(() => orderList.value.filter(o => o.status === 'pending'))
const completedOrders = computed(() => orderList.value.filter(o => o.status === 'completed'))

const formatPrice = (price) => {
  return Number(price).toLocaleString('zh-CN')
}

const getStatusType = (status) => {
  if (status === 'pending') return 'warning'
  if (status === 'confirmed') return 'primary'
  if (status === 'completed') return 'success'
  return 'default'
}

const cancelOrder = (order) => {
  showDialog({
    title: '提示',
    message: '确定要取消该预约吗？',
    confirmButtonText: '确定取消',
    confirmButtonColor: '#FF4D4F'
  }).then(() => {
    const index = orderList.value.findIndex(o => o.id === order.id)
    if (index > -1) {
      orderList.value.splice(index, 1)
    }
    showSuccessToast('已取消预约')
  }).catch(() => {
    // 用户取消
  })
}

const contactService = (order) => {
  if (order.status === 'completed') {
    router.push('/service')
  } else {
    showToast('正在联系客服...')
  }
}

onMounted(() => {
  orderList.value = myOrders
})
</script>

<style lang="less" scoped>
.orders-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
}

.tabs-section {
  background: #FFFFFF;
}

.order-list {
  padding: 12px;
}

.order-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .order-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid #F5F5F5;

    .order-no {
      font-size: 12px;
      color: #999999;
    }
  }

  .order-content {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid #F5F5F5;

    .order-image {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .order-info {
      flex: 1;
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .order-type {
        font-size: 12px;
        color: #999999;
        margin: 0 0 4px;
      }

      .order-name {
        font-size: 14px;
        font-weight: 600;
        color: #333333;
        margin: 0 0 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .order-date {
        font-size: 12px;
        color: #999999;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
  }

  .order-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;

    .order-price {
      font-size: 12px;
      color: #666666;

      .price-text {
        font-size: 16px;
        font-weight: 600;
        color: #D4AF37;
      }
    }

    .order-actions {
      display: flex;
      gap: 8px;
    }
  }
}
</style>
