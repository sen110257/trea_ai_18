<template>
  <div class="guest-page page-container-no-tabbar">
    <PageHeader title="宾客报名" />

    <div class="guest-content">
      <div class="intro-section">
        <div class="intro-icon">
          <van-icon name="friends-o" size="32" color="#D4AF37" />
        </div>
        <div class="intro-text">
          <h3 class="intro-title">宾客报名管理</h3>
          <p class="intro-desc">统计宾客信息，方便婚礼筹备</p>
        </div>
      </div>

      <div class="stats-section">
        <div class="stats-card">
          <div class="stat-item">
            <span class="stat-value">{{ totalGuests }}</span>
            <span class="stat-label">已报名</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ totalPeople }}</span>
            <span class="stat-label">总人数</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ vegetarianCount }}</span>
            <span class="stat-label">素食</span>
          </div>
        </div>
      </div>

      <div class="action-section">
        <div class="action-card" @click="goToForm">
          <van-icon name="edit" size="24" color="#D4AF37" />
          <div class="action-info">
            <span class="action-title">宾客报名入口</span>
            <span class="action-desc">填写报名信息，参与婚礼</span>
          </div>
          <van-icon name="arrow" size="16" color="#999999" />
        </div>
      </div>

      <div class="list-section">
        <div class="section-header">
          <h3 class="section-title">报名列表</h3>
          <span class="statistics-link" @click="goToStatistics">
            查看统计
            <van-icon name="arrow" size="12" color="#D4AF37" />
          </span>
        </div>

        <div class="guest-list" v-if="guestList.length > 0">
          <div class="guest-card" v-for="guest in guestList" :key="guest.id">
            <div class="guest-avatar">
              <van-icon name="user-o" size="20" color="#D4AF37" />
            </div>
            <div class="guest-info">
              <div class="guest-header">
                <span class="guest-name">{{ guest.name }}</span>
                <van-tag
                  :type="guest.status === 'confirmed' ? 'primary' : 'warning'"
                  size="mini"
                >
                  {{ guest.status === 'confirmed' ? '已确认' : '待确认' }}
                </van-tag>
              </div>
              <div class="guest-meta">
                <span class="meta-item">
                  <van-icon name="phone-o" size="12" color="#999999" />
                  {{ guest.phone }}
                </span>
                <span class="meta-item">
                  <van-icon name="friends-o" size="12" color="#999999" />
                  {{ guest.guestCount }}人
                </span>
                <span class="meta-item" v-if="guest.isVegetarian">
                  <van-icon name="smile-o" size="12" color="#D4A5A5" />
                  素食
                </span>
              </div>
              <div class="guest-remark" v-if="guest.dietaryRequirements && guest.dietaryRequirements !== '无'">
                <span class="remark-label">备注：</span>
                <span class="remark-text">{{ guest.dietaryRequirements }}</span>
              </div>
            </div>
          </div>
        </div>

        <van-empty v-else description="暂无报名记录" />
      </div>

      <div class="tips-section">
        <div class="tips-header">
          <van-icon name="info-o" size="16" color="#D4AF37" />
          <span class="tips-title">温馨提示</span>
        </div>
        <ul class="tips-list">
          <li>• 宾客可在线填写报名信息，包括到场人数和饮食需求</li>
          <li>• 系统自动统计报名人数，方便婚礼筹备</li>
          <li>• 可查看所有报名记录和统计数据</li>
          <li>• 如有变动，请及时联系新人或工作人员</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import { guestRegistrations } from '@/mock/data.js'

const router = useRouter()

const guestList = ref([])

const totalGuests = computed(() => guestList.value.length)

const totalPeople = computed(() => {
  return guestList.value.reduce((sum, guest) => sum + guest.guestCount, 0)
})

const vegetarianCount = computed(() => {
  return guestList.value.filter(guest => guest.isVegetarian).length
})

const goToForm = () => {
  router.push('/guest-form')
}

const goToStatistics = () => {
  router.push('/guest-statistics')
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
.guest-page {
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
  min-height: 100vh;
}

.guest-content {
  padding-bottom: 20px;
}

.intro-section {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #FFFFFF;
  margin: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .intro-icon {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(245, 230, 200, 0.3));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
  }

  .intro-text {
    flex: 1;

    .intro-title {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      margin: 0 0 4px;
    }

    .intro-desc {
      font-size: 12px;
      color: #999999;
      margin: 0;
    }
  }
}

.stats-section {
  padding: 0 16px;
  margin-bottom: 12px;

  .stats-card {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #FFFFFF;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .stat-value {
        font-size: 24px;
        font-weight: 700;
        color: #D4AF37;
      }

      .stat-label {
        font-size: 12px;
        color: #999999;
        margin-top: 4px;
      }
    }

    .stat-divider {
      width: 1px;
      height: 36px;
      background: #F5F5F5;
    }
  }
}

.action-section {
  padding: 0 16px;
  margin-bottom: 12px;

  .action-card {
    display: flex;
    align-items: center;
    background: #FFFFFF;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.98);
    }

    .action-info {
      flex: 1;
      margin-left: 12px;
      display: flex;
      flex-direction: column;

      .action-title {
        font-size: 15px;
        font-weight: 600;
        color: #333333;
      }

      .action-desc {
        font-size: 12px;
        color: #999999;
        margin-top: 4px;
      }
    }
  }
}

.list-section {
  padding: 0 16px;
  margin-bottom: 12px;

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .section-title {
      font-size: 15px;
      font-weight: 600;
      color: #333333;
      margin: 0;
    }

    .statistics-link {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      color: #D4AF37;
    }
  }

  .guest-list {
    .guest-card {
      display: flex;
      background: #FFFFFF;
      border-radius: 12px;
      padding: 14px;
      margin-bottom: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

      .guest-avatar {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(245, 230, 200, 0.3));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        flex-shrink: 0;
      }

      .guest-info {
        flex: 1;
        min-width: 0;

        .guest-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;

          .guest-name {
            font-size: 14px;
            font-weight: 600;
            color: #333333;
          }
        }

        .guest-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 4px;

          .meta-item {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            color: #999999;
          }
        }

        .guest-remark {
          font-size: 12px;
          color: #666666;
          padding: 6px 8px;
          background: #F5F5F5;
          border-radius: 4px;
          margin-top: 4px;

          .remark-label {
            color: #999999;
          }
        }
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
