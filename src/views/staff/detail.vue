<template>
  <div class="staff-detail-page page-container-no-tabbar" v-if="staff">
    <div class="detail-header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#333333" />
      </div>
      <div class="favorite-btn" @click="toggleFavorite">
        <van-icon :name="isFavorited ? 'star' : 'star-o'" size="22" :color="isFavorited ? '#D4AF37' : '#999999'" />
      </div>
    </div>

    <div class="staff-profile">
      <div class="avatar-section">
        <van-image
          :src="staff.avatar"
          class="staff-avatar"
          fit="cover"
          lazy-load
        />
        <div class="role-badge">
          {{ staff.role }}
        </div>
      </div>
      <div class="info-section">
        <h1 class="staff-name">{{ staff.name }}</h1>
        <span class="staff-en">{{ staff.nameEn }}</span>
        <div class="staff-stats">
          <div class="stat-item">
            <span class="stat-value">{{ staff.experience }}</span>
            <span class="stat-label">年经验</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <van-rate v-model="staff.rating" color="#D4AF37" void-color="#E5E5E5" :size="14" readonly />
            <span class="stat-value">{{ staff.rating }}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ staff.reviewCount }}</span>
            <span class="stat-label">条评价</span>
          </div>
        </div>
      </div>
    </div>

    <div class="price-banner">
      <div class="price-info">
        <span class="price-unit">¥</span>
        <span class="price-value">{{ staff.price }}</span>
        <span class="price-unit">/场</span>
      </div>
      <van-button class="btn-quick-book" @click="openDatePicker">
        快速预约
      </van-button>
    </div>

    <div class="divider"></div>

    <div class="section">
      <h3 class="section-title">个人简介</h3>
      <p class="bio-text">{{ staff.description }}</p>
    </div>

    <div class="divider"></div>

    <div class="section">
      <h3 class="section-title">擅长风格</h3>
      <div class="style-tags">
        <van-tag type="primary" v-for="style in staff.style" :key="style">
          {{ style }}
        </van-tag>
      </div>
    </div>

    <div class="divider" v-if="staff.languages && staff.languages.length > 0"></div>

    <div class="section" v-if="staff.languages && staff.languages.length > 0">
      <h3 class="section-title">支持语言</h3>
      <div class="language-list">
        <div class="language-item" v-for="(lang, index) in staff.languages" :key="index">
          <van-icon name="passed" size="14" color="#D4AF37" />
          <span>{{ lang }}</span>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <h3 class="section-title">荣誉资质</h3>
      <div class="achievements-list">
        <div class="achievement-item" v-for="(achievement, index) in staff.achievements" :key="index">
          <van-icon name="medal-o" size="16" color="#D4AF37" />
          <span>{{ achievement }}</span>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <h3 class="section-title">作品集</h3>
      <div class="portfolio-grid">
        <div
          class="portfolio-item"
          v-for="(img, index) in staff.portfolio"
          :key="index"
          @click="previewImage(index)"
        >
          <van-image
            :src="img"
            class="portfolio-img"
            fit="cover"
            lazy-load
          />
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
          @select="onDateSelect"
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

    <div class="divider" v-if="selectedTimeSlot"></div>

    <div class="section" v-if="selectedTimeSlot">
      <h3 class="section-title">选择时间</h3>
      <div class="time-slots">
        <div
          class="time-slot"
          v-for="slot in timeSlots"
          :key="slot.value"
          :class="{ active: selectedTimeSlot === slot.value }"
          @click="selectedTimeSlot = slot.value"
        >
          {{ slot.label }}
        </div>
      </div>
    </div>

    <div class="bottom-space"></div>

    <div class="bottom-bar">
      <div class="bar-left">
        <div class="bar-item" @click="toggleFavorite">
          <van-icon :name="isFavorited ? 'star' : 'star-o'" size="20" :color="isFavorited ? '#D4AF37' : '#999999'" />
          <span>{{ isFavorited ? '已收藏' : '收藏' }}</span>
        </div>
        <div class="bar-item" @click="callPhone">
          <van-icon name="phone-o" size="20" color="#999999" />
          <span>咨询</span>
        </div>
      </div>
      <div class="bar-right">
        <van-button class="btn-book" :disabled="!canBook" @click="handleBook">
          {{ canBook ? '立即预约' : '请选择日期' }}
        </van-button>
      </div>
    </div>

    <van-popup v-model:show="showDatePicker" position="bottom" round>
      <div class="date-picker-popup">
        <div class="popup-header">
          <span class="popup-title">选择预约日期</span>
          <van-icon name="cross" size="20" @click="showDatePicker = false" />
        </div>
        <van-calendar
          v-model="selectedDate"
          type="single"
          color="#D4AF37"
          :formatter="dateFormatter"
          @confirm="onDateConfirm"
        />
      </div>
    </van-popup>

    <van-image-preview
      v-model:show="showImagePreview"
      :images="staff.portfolio"
      :start-position="previewIndex"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast, showSuccessToast, showDialog } from 'vant'
import { professionalStaff } from '@/mock/data.js'
import { useFavoritesStore } from '@/store/favorites.js'

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()

const staffId = computed(() => parseInt(route.params.id))
const staff = computed(() => professionalStaff.find(s => s.id === staffId.value))

const selectedDate = ref(null)
const selectedTimeSlot = ref(null)
const showDatePicker = ref(false)
const showImagePreview = ref(false)
const previewIndex = ref(0)

const timeSlots = [
  { label: '上午 (9:00-12:00)', value: 'morning' },
  { label: '下午 (13:00-18:00)', value: 'afternoon' },
  { label: '晚上 (18:00-22:00)', value: 'evening' }
]

const isFavorited = computed(() => {
  if (!staff.value) return false
  return favoritesStore.isStaffFavorited(staff.value.id)
})

const canBook = computed(() => !!selectedDate.value)

const dateFormatter = (day) => {
  if (!staff.value) return day
  
  const dateStr = day.date.toISOString().split('T')[0]
  const availableDate = staff.value.availableDates.find(d => d.date === dateStr)
  
  if (availableDate) {
    if (!availableDate.available) {
      day.type = 'disabled'
      day.bottomInfo = '已约满'
    }
  }
  
  return day
}

const goBack = () => {
  router.back()
}

const toggleFavorite = () => {
  if (!staff.value) return
  const added = favoritesStore.toggleStaff(staff.value)
  showSuccessToast(added ? '已添加到收藏' : '已取消收藏')
}

const openDatePicker = () => {
  showDatePicker.value = true
}

const onDateSelect = (date) => {
  selectedDate.value = date
}

const onDateConfirm = (date) => {
  selectedDate.value = date
  showDatePicker.value = false
}

const previewImage = (index) => {
  previewIndex.value = index
  showImagePreview.value = true
}

const callPhone = () => {
  showToast('正在拨打: 400-888-8888')
}

const handleBook = () => {
  if (!selectedDate.value) {
    showToast('请选择预约日期')
    return
  }

  const dateStr = selectedDate.value.toISOString().split('T')[0]
  
  showDialog({
    title: '确认预约',
    message: `您确定要预约 ${staff.value?.name} 吗？\n\n预约日期：${dateStr}${selectedTimeSlot.value ? '\n预约时段：' + timeSlots.find(s => s.value === selectedTimeSlot.value)?.label : ''}\n费用：¥${staff.value?.price}`,
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
.staff-detail-page {
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
  min-height: 100vh;
  position: relative;
}

.detail-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  padding-top: calc(12px + env(safe-area-inset-top));
  z-index: 100;

  .back-btn,
  .favorite-btn {
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.staff-profile {
  padding: 60px 16px 20px;
  background: #FFFFFF;
  text-align: center;

  .avatar-section {
    position: relative;
    display: inline-block;
    margin-bottom: 16px;

    .staff-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 3px solid #F5E6C8;
    }

    .role-badge {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #D4AF37, #F5E6C8);
      color: #FFFFFF;
      font-size: 11px;
      padding: 3px 12px;
      border-radius: 12px;
      white-space: nowrap;
    }
  }

  .info-section {
    .staff-name {
      font-size: 20px;
      font-weight: 700;
      color: #333333;
      margin: 0;
    }

    .staff-en {
      font-size: 12px;
      color: #999999;
      margin-left: 8px;
    }

    .staff-stats {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 16px;

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;

        .stat-value {
          font-size: 18px;
          font-weight: 600;
          color: #D4AF37;
        }

        .stat-label {
          font-size: 11px;
          color: #999999;
        }
      }

      .stat-divider {
        width: 1px;
        height: 30px;
        background: #F5F5F5;
        margin: 0 24px;
      }
    }
  }
}

.price-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.05), rgba(245, 230, 200, 0.1));
  margin: 0 16px;
  border-radius: 12px;

  .price-info {
    display: flex;
    align-items: baseline;

    .price-unit {
      font-size: 14px;
      color: #D4AF37;
    }

    .price-value {
      font-size: 24px;
      font-weight: 700;
      color: #D4AF37;
    }
  }

  .btn-quick-book {
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

  .bio-text {
    font-size: 14px;
    color: #666666;
    line-height: 1.8;
    margin: 0;
  }

  .style-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .language-list,
  .achievements-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .language-item,
    .achievement-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #666666;
    }
  }
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  .portfolio-item {
    border-radius: 8px;
    overflow: hidden;

    .portfolio-img {
      width: 100%;
      height: 100px;
    }
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

.time-slots {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .time-slot {
    padding: 10px 20px;
    background: #F5F5F5;
    border-radius: 8px;
    font-size: 13px;
    color: #666666;
    transition: all 0.3s ease;

    &.active {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(245, 230, 200, 0.2));
      color: #D4AF37;
      border: 1px solid #D4AF37;
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

    .btn-book {
      width: 100%;
      height: 44px;
      border-radius: 22px;
      background: linear-gradient(135deg, #D4AF37, #F5E6C8);
      border: none;
      color: #FFFFFF;
      font-size: 15px;
      font-weight: 600;

      &.van-button--disabled {
        background: #CCCCCC;
        color: #FFFFFF;
      }
    }
  }
}

.date-picker-popup {
  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #F5F5F5;

    .popup-title {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
    }
  }
}
</style>
