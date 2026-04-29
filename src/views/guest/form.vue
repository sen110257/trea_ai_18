<template>
  <div class="guest-form-page page-container-no-tabbar">
    <PageHeader title="宾客报名" />

    <div class="form-content">
      <div class="form-header">
        <div class="form-icon">
          <van-icon name="envelope-o" size="36" color="#D4AF37" />
        </div>
        <h2 class="form-title">婚礼邀请</h2>
        <p class="form-subtitle">诚挚邀请您参加我们的婚礼</p>
      </div>

      <van-cell-group inset title="基本信息">
        <van-cell title="您的姓名">
          <template #right-icon>
            <van-field
              v-model="formData.name"
              placeholder="请输入您的姓名"
              :border="false"
              align="right"
              :rules="[{ required: true, message: '请输入姓名' }]"
            />
          </template>
        </van-cell>
        <van-cell title="联系电话">
          <template #right-icon>
            <van-field
              v-model="formData.phone"
              type="tel"
              placeholder="请输入手机号码"
              :border="false"
              align="right"
              :rules="[{ required: true, message: '请输入手机号' }]"
            />
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group inset title="到场信息">
        <van-cell title="到场人数" is-link @click="showGuestPicker = true">
          <template #right-icon>
            <span :class="{ 'placeholder-text': !formData.guestCount }">
              {{ formData.guestCount ? formData.guestCount + '人' : '请选择' }}
            </span>
          </template>
        </van-cell>
        <van-cell title="是否素食">
          <template #right-icon>
            <van-switch
              v-model="formData.isVegetarian"
              active-color="#D4AF37"
            />
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group inset title="备注信息">
        <van-cell>
          <template #default>
            <van-field
              v-model="formData.dietaryRequirements"
              type="textarea"
              placeholder="如有其他饮食需求或特殊情况，请在此说明"
              rows="3"
              maxlength="200"
              show-word-limit
            />
          </template>
        </van-cell>
      </van-cell-group>

      <div class="wedding-info-section">
        <div class="info-card">
          <h4 class="info-title">婚礼信息</h4>
          <div class="info-list">
            <div class="info-item">
              <van-icon name="calendar-o" size="16" color="#D4AF37" />
              <span class="info-text">2026年05月20日 星期三</span>
            </div>
            <div class="info-item">
              <van-icon name="clock-o" size="16" color="#D4AF37" />
              <span class="info-text">12:00 开席</span>
            </div>
            <div class="info-item">
              <van-icon name="location-o" size="16" color="#D4AF37" />
              <span class="info-text">上海市浦东新区世纪大道88号金茂大厦5楼</span>
            </div>
          </div>
        </div>
      </div>

      <div class="tips-section">
        <div class="tips-header">
          <van-icon name="info-o" size="14" color="#D4AF37" />
          <span class="tips-title">温馨提示</span>
        </div>
        <ul class="tips-list">
          <li>• 请准确填写到场人数，以便我们安排座位</li>
          <li>• 如有特殊饮食需求，请在备注中说明</li>
          <li>• 如需更改信息，请联系新人或工作人员</li>
        </ul>
      </div>

      <div class="bottom-space"></div>
    </div>

    <div class="bottom-bar">
      <van-button class="btn-submit" @click="handleSubmit">
        确认报名
      </van-button>
    </div>

    <van-popup v-model:show="showGuestPicker" position="bottom">
      <van-picker
        title="选择到场人数"
        :columns="guestOptions"
        @confirm="onGuestConfirm"
        @cancel="showGuestPicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showSuccessToast, showDialog } from 'vant'
import PageHeader from '@/components/PageHeader.vue'

const router = useRouter()

const showGuestPicker = ref(false)

const guestOptions = [
  { text: '1人', value: '1人' },
  { text: '2人', value: '2人' },
  { text: '3人', value: '3人' },
  { text: '4人', value: '4人' },
  { text: '5人', value: '5人' },
  { text: '6人', value: '6人' },
  { text: '7人', value: '7人' },
  { text: '8人', value: '8人' },
  { text: '9人', value: '9人' },
  { text: '10人及以上', value: '10人及以上' }
]

const formData = reactive({
  name: '',
  phone: '',
  guestCount: null,
  isVegetarian: false,
  dietaryRequirements: ''
})

const validateForm = () => {
  if (!formData.name.trim()) {
    showToast('请输入您的姓名')
    return false
  }
  if (!formData.phone.trim()) {
    showToast('请输入联系电话')
    return false
  }
  if (!/^1[3-9]\d{9}$/.test(formData.phone.trim())) {
    showToast('请输入正确的手机号码')
    return false
  }
  if (!formData.guestCount) {
    showToast('请选择到场人数')
    return false
  }
  return true
}

const onGuestConfirm = ({ selectedValues }) => {
  const text = selectedValues[0]
  if (text === '10人及以上') {
    formData.guestCount = 10
  } else {
    formData.guestCount = parseInt(text)
  }
  showGuestPicker.value = false
}

const handleSubmit = () => {
  if (!validateForm()) return

  showDialog({
    title: '确认报名',
    message: `您确定要提交报名信息吗？\n\n姓名：${formData.name}\n电话：${formData.phone}\n到场人数：${formData.guestCount}人${formData.isVegetarian ? '\n素食需求：是' : ''}${formData.dietaryRequirements ? '\n备注：' + formData.dietaryRequirements : ''}`,
    confirmButtonText: '确认提交',
    confirmButtonColor: '#D4AF37'
  }).then(() => {
    const newGuest = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
      guestCount: formData.guestCount,
      isVegetarian: formData.isVegetarian,
      dietaryRequirements: formData.dietaryRequirements || '无',
      status: 'confirmed',
      registeredAt: new Date().toLocaleString('zh-CN')
    }

    const savedGuests = JSON.parse(localStorage.getItem('guestRegistrations') || '[]')
    savedGuests.unshift(newGuest)
    localStorage.setItem('guestRegistrations', JSON.stringify(savedGuests))

    showSuccessToast('报名成功')
    
    formData.name = ''
    formData.phone = ''
    formData.guestCount = null
    formData.isVegetarian = false
    formData.dietaryRequirements = ''

    setTimeout(() => {
      router.push('/guest')
    }, 1000)
  }).catch(() => {
    // 用户取消
  })
}
</script>

<style lang="less" scoped>
.guest-form-page {
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
  min-height: 100vh;
  padding-bottom: 80px;
}

.form-content {
  padding-bottom: 20px;
}

.form-header {
  text-align: center;
  padding: 24px 16px;
  background: #FFFFFF;
  margin: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .form-icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(245, 230, 200, 0.3));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
  }

  .form-title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    margin: 0 0 6px;
  }

  .form-subtitle {
    font-size: 13px;
    color: #666666;
    margin: 0;
  }
}

.placeholder-text {
  color: #999999;
}

.wedding-info-section {
  padding: 0 16px;
  margin-top: 12px;

  .info-card {
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.05), rgba(245, 230, 200, 0.1));
    border-radius: 12px;
    padding: 16px;
    border: 1px solid rgba(212, 175, 55, 0.1);

    .info-title {
      font-size: 14px;
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

    .info-list {
      .info-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }

        .info-text {
          margin-left: 10px;
          font-size: 14px;
          color: #666666;
          flex: 1;
          line-height: 1.5;
        }
      }
    }
  }
}

.tips-section {
  margin: 12px 16px 0;
  padding: 12px;
  background: #FFFBEB;
  border-radius: 8px;
  border: 1px solid #F5E6C8;

  .tips-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;

    .tips-title {
      font-size: 13px;
      font-weight: 600;
      color: #D4AF37;
    }
  }

  .tips-list {
    margin: 0;
    padding-left: 0;
    list-style: none;

    li {
      font-size: 12px;
      color: #999999;
      line-height: 1.6;
      margin-bottom: 4px;
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
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);

  .btn-submit {
    width: 100%;
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
