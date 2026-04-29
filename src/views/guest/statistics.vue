<template>
  <div class="guest-statistics-page page-container-no-tabbar">
    <PageHeader title="报名统计" />

    <div class="statistics-content">
      <div class="summary-section">
        <div class="summary-card">
          <div class="summary-item">
            <span class="summary-value">{{ totalGuests }}</span>
            <span class="summary-label">报名人数</span>
          </div>
          <div class="summary-item">
            <span class="summary-value">{{ totalPeople }}</span>
            <span class="summary-label">总人数</span>
          </div>
          <div class="summary-item">
            <span class="summary-value">{{ confirmedCount }}</span>
            <span class="summary-label">已确认</span>
          </div>
        </div>
      </div>

      <div class="chart-section">
        <h3 class="section-title">人数分布</h3>
        <div class="chart-card">
          <div class="chart-row" v-for="item in peopleDistribution" :key="item.label">
            <span class="chart-label">{{ item.label }}</span>
            <div class="chart-bar-container">
              <div class="chart-bar" :style="{ width: getBarWidth(item.count) }">
                <span class="chart-count">{{ item.count }}人</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dietary-section">
        <h3 class="section-title">饮食需求</h3>
        <div class="dietary-card">
          <div class="dietary-row">
            <div class="dietary-item">
              <div class="dietary-circle normal">
                <span class="dietary-value">{{ normalCount }}</span>
              </div>
              <span class="dietary-label">正常</span>
            </div>
            <div class="dietary-item">
              <div class="dietary-circle vegetarian">
                <span class="dietary-value">{{ vegetarianCount }}</span>
              </div>
              <span class="dietary-label">素食</span>
            </div>
          </div>
          <div class="dietary-percentage">
            <div class="percentage-bar">
              <div class="percentage-fill" :style="{ width: getPercentage(normalCount) }"></div>
            </div>
            <div class="percentage-labels">
              <span>正常 {{ getPercentage(normalCount) }}</span>
              <span>素食 {{ getPercentage(vegetarianCount) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="status-section">
        <h3 class="section-title">确认状态</h3>
        <div class="status-card">
          <div class="status-row">
            <div class="status-item confirmed">
              <van-icon name="passed" size="20" color="#FFFFFF" />
              <span class="status-count">{{ confirmedCount }}</span>
              <span class="status-label">已确认</span>
            </div>
            <div class="status-item pending">
              <van-icon name="clock-o" size="20" color="#FFFFFF" />
              <span class="status-count">{{ pendingCount }}</span>
              <span class="status-label">待确认</span>
            </div>
          </div>
        </div>
      </div>

      <div class="list-section">
        <h3 class="section-title">详细列表</h3>
        <div class="list-card">
          <div class="list-item" v-for="guest in guestList" :key="guest.id">
            <div class="list-left">
              <div class="avatar">
                <van-icon name="user-o" size="18" color="#D4AF37" />
              </div>
              <div class="list-info">
                <span class="list-name">{{ guest.name }}</span>
                <span class="list-meta">
                  {{ guest.guestCount }}人
                  <span v-if="guest.isVegetarian" class="vegetarian-tag">素食</span>
                </span>
              </div>
            </div>
            <div class="list-right">
              <van-tag
                :type="guest.status === 'confirmed' ? 'primary' : 'warning'"
                size="mini"
              >
                {{ guest.status === 'confirmed' ? '已确认' : '待确认' }}
              </van-tag>
            </div>
          </div>
        </div>
      </div>

      <div class="export-section">
        <van-button class="btn-export" block @click="exportData">
          <van-icon name="download" size="16" />
          导出统计数据
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { showToast, showSuccessToast } from 'vant'
import PageHeader from '@/components/PageHeader.vue'
import { guestRegistrations } from '@/mock/data.js'

const guestList = ref([])

const totalGuests = computed(() => guestList.value.length)

const totalPeople = computed(() => {
  return guestList.value.reduce((sum, guest) => sum + guest.guestCount, 0)
})

const confirmedCount = computed(() => {
  return guestList.value.filter(g => g.status === 'confirmed').length
})

const pendingCount = computed(() => {
  return guestList.value.filter(g => g.status === 'pending').length
})

const vegetarianCount = computed(() => {
  return guestList.value.filter(g => g.isVegetarian).length
})

const normalCount = computed(() => totalGuests.value - vegetarianCount.value)

const peopleDistribution = computed(() => {
  const distribution = {
    '1人': 0,
    '2人': 0,
    '3-4人': 0,
    '5人以上': 0
  }

  guestList.value.forEach(guest => {
    if (guest.guestCount === 1) {
      distribution['1人']++
    } else if (guest.guestCount === 2) {
      distribution['2人']++
    } else if (guest.guestCount >= 3 && guest.guestCount <= 4) {
      distribution['3-4人']++
    } else {
      distribution['5人以上']++
    }
  })

  return Object.entries(distribution).map(([label, count]) => ({ label, count }))
})

const getBarWidth = (count) => {
  if (totalGuests.value === 0) return '0%'
  return `${Math.max((count / totalGuests.value) * 100, 10)}%`
}

const getPercentage = (count) => {
  if (totalGuests.value === 0) return '0%'
  return `${Math.round((count / totalGuests.value) * 100)}%`
}

const exportData = () => {
  showToast('正在导出数据...')
  setTimeout(() => {
    showSuccessToast('导出成功，数据已保存到文件')
  }, 1500)
}

onMounted(() => {
  const savedGuests = JSON.parse(localStorage.getItem('guestRegistrations') || '[]')
  if (savedGuests.length > 0) {
    guestList.value = savedGuests
  } else {
    guestList.value = guestRegistrations
    localStorage.setItem('guestRegistrations', JSON.stringify(guestRegistrations))
  }
})
</script>

<style lang="less" scoped>
.guest-statistics-page {
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
  min-height: 100vh;
}

.statistics-content {
  padding-bottom: 20px;
}

.summary-section {
  padding: 0 16px;
  margin-bottom: 12px;

  .summary-card {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(245, 230, 200, 0.2));
    border-radius: 12px;
    padding: 20px 16px;
    border: 1px solid rgba(212, 175, 55, 0.15);

    .summary-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .summary-value {
        font-size: 28px;
        font-weight: 700;
        color: #D4AF37;
      }

      .summary-label {
        font-size: 12px;
        color: #666666;
        margin-top: 4px;
      }
    }
  }
}

.chart-section,
.dietary-section,
.status-section,
.list-section {
  padding: 0 16px;
  margin-bottom: 12px;

  .section-title {
    font-size: 15px;
    font-weight: 600;
    color: #333333;
    margin: 0 0 12px;
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

  .chart-card,
  .dietary-card,
  .status-card,
  .list-card {
    background: #FFFFFF;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
}

.chart-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  .chart-label {
    width: 60px;
    font-size: 13px;
    color: #666666;
    flex-shrink: 0;
  }

  .chart-bar-container {
    flex: 1;
    margin-left: 12px;
    height: 28px;
    background: #F5F5F5;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
  }

  .chart-bar {
    height: 100%;
    background: linear-gradient(90deg, #D4AF37, #F5E6C8);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    transition: width 0.5s ease;
    min-width: 50px;

    .chart-count {
      font-size: 12px;
      color: #FFFFFF;
      font-weight: 500;
    }
  }
}

.dietary-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 16px;

  .dietary-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .dietary-circle {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;

      &.normal {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(245, 230, 200, 0.3));
        border: 2px solid #D4AF37;
      }

      &.vegetarian {
        background: linear-gradient(135deg, rgba(212, 165, 165, 0.2), rgba(232, 196, 196, 0.3));
        border: 2px solid #D4A5A5;
      }

      .dietary-value {
        font-size: 20px;
        font-weight: 700;
        color: #333333;
      }
    }

    .dietary-label {
      font-size: 12px;
      color: #666666;
    }
  }
}

.dietary-percentage {
  .percentage-bar {
    height: 16px;
    background: #F5F5F5;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .percentage-fill {
    height: 100%;
    background: linear-gradient(90deg, #D4AF37, #F5E6C8);
    border-radius: 8px;
    transition: width 0.5s ease;
  }

  .percentage-labels {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999999;
  }
}

.status-row {
  display: flex;
  align-items: center;
  justify-content: space-around;

  .status-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 24px;
    border-radius: 12px;

    &.confirmed {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(245, 230, 200, 0.2));
    }

    &.pending {
      background: linear-gradient(135deg, rgba(250, 173, 20, 0.1), rgba(255, 235, 180, 0.2));
    }

    .status-count {
      font-size: 24px;
      font-weight: 700;
      margin-top: 8px;
    }

    &.confirmed .status-count {
      color: #D4AF37;
    }

    &.pending .status-count {
      color: #FAAD14;
    }

    .status-label {
      font-size: 12px;
      color: #666666;
      margin-top: 4px;
    }
  }
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #F5F5F5;

  &:last-child {
    border-bottom: none;
  }

  .list-left {
    display: flex;
    align-items: center;

    .avatar {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(245, 230, 200, 0.3));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
    }

    .list-info {
      display: flex;
      flex-direction: column;

      .list-name {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
      }

      .list-meta {
        font-size: 12px;
        color: #999999;
        margin-top: 2px;
      }

      .vegetarian-tag {
        color: #D4A5A5;
        margin-left: 8px;
        background: rgba(212, 165, 165, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
      }
    }
  }
}

.export-section {
  padding: 16px;

  .btn-export {
    height: 44px;
    border-radius: 22px;
    border: 1px solid #D4AF37;
    background: #FFFFFF;
    color: #D4AF37;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
}
</style>
