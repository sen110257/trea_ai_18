<template>
  <div class="invitation-create-page page-container-no-tabbar">
    <PageHeader title="编辑请柬">
      <template #right>
        <span class="preview-btn" @click="goToPreview">预览</span>
      </template>
    </PageHeader>

    <div class="create-content">
      <div class="preview-section">
        <div class="preview-card" :style="getPreviewStyle()">
          <div class="preview-header">
            <div class="decorative-line"></div>
            <h2 class="preview-title">我们结婚啦</h2>
            <div class="decorative-line"></div>
          </div>
          
          <div class="preview-couple">
            <span class="groom-name">{{ invitationData.groomName || '新郎姓名' }}</span>
            <span class="heart-symbol">❤</span>
            <span class="bride-name">{{ invitationData.brideName || '新娘姓名' }}</span>
          </div>

          <div class="preview-wedding-info">
            <div class="info-item">
              <span class="info-label">婚礼日期</span>
              <span class="info-value">{{ formattedWeddingDate }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">婚礼时间</span>
              <span class="info-value">{{ invitationData.weddingTime || '12:00' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">举办地点</span>
              <span class="info-value address">{{ invitationData.weddingAddress || '请填写婚礼地址' }}</span>
            </div>
          </div>

          <div class="preview-blessing">
            <p>{{ invitationData.blessing || '诚挚邀请您参加我们的婚礼，共同见证这幸福的时刻' }}</p>
          </div>

          <div class="preview-footer">
            <div class="decorative-dots">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="form-section">
        <h3 class="section-title">基本信息</h3>
        <van-cell-group inset>
          <van-cell title="新郎姓名">
            <template #right-icon>
              <van-field
                v-model="invitationData.groomName"
                placeholder="请输入新郎姓名"
                :border="false"
                align="right"
                maxlength="20"
              />
            </template>
          </van-cell>
          <van-cell title="新娘姓名">
            <template #right-icon>
              <van-field
                v-model="invitationData.brideName"
                placeholder="请输入新娘姓名"
                :border="false"
                align="right"
                maxlength="20"
              />
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <div class="form-section">
        <h3 class="section-title">婚礼时间</h3>
        <van-cell-group inset>
          <van-cell title="婚礼日期" is-link @click="showDatePicker = true">
            <template #right-icon>
              <span class="cell-value">{{ formattedWeddingDate || '请选择日期' }}</span>
            </template>
          </van-cell>
          <van-cell title="婚礼时间" is-link @click="showTimePicker = true">
            <template #right-icon>
              <span class="cell-value">{{ invitationData.weddingTime || '请选择时间' }}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <div class="form-section">
        <h3 class="section-title">婚礼地点</h3>
        <van-cell-group inset>
          <van-cell title="举办地址">
            <template #right-icon>
              <van-field
                v-model="invitationData.weddingAddress"
                placeholder="请输入详细地址"
                :border="false"
                align="right"
                maxlength="100"
              />
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <div class="form-section">
        <h3 class="section-title">祝福语</h3>
        <van-cell-group inset>
          <van-cell>
            <template #default>
              <van-field
                v-model="invitationData.blessing"
                type="textarea"
                placeholder="请输入您的祝福语"
                rows="3"
                maxlength="200"
                show-word-limit
              />
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <div class="blessing-templates">
        <h4 class="templates-title">常用祝福语</h4>
        <div class="templates-list">
          <div
            class="template-item"
            v-for="(blessing, index) in blessingTemplates"
            :key="index"
            @click="useBlessing(blessing)"
          >
            {{ blessing }}
          </div>
        </div>
      </div>

      <div class="bottom-space"></div>
    </div>

    <div class="bottom-bar">
      <van-button class="btn-save" @click="saveInvitation">
        保存草稿
      </van-button>
      <van-button class="btn-generate" @click="generateInvitation">
        生成请柬
      </van-button>
    </div>

    <van-popup v-model:show="showDatePicker" position="bottom">
      <van-calendar
        v-model="invitationData.weddingDate"
        type="single"
        color="#D4AF37"
        :min-date="minDate"
        @confirm="onDateConfirm"
      />
    </van-popup>

    <van-popup v-model:show="showTimePicker" position="bottom">
      <van-picker
        title="选择时间"
        :columns="timeColumns"
        @confirm="onTimeConfirm"
        @cancel="showTimePicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showSuccessToast, showToast, showDialog } from 'vant'
import PageHeader from '@/components/PageHeader.vue'
import { invitationTemplates } from '@/mock/data.js'

const route = useRoute()
const router = useRouter()

const templateId = computed(() => parseInt(route.query.templateId) || 1)
const template = computed(() => invitationTemplates.find(t => t.id === templateId.value))

const minDate = new Date()

const showDatePicker = ref(false)
const showTimePicker = ref(false)

const timeColumns = [
  { text: '08:00', value: '08:00' },
  { text: '09:00', value: '09:00' },
  { text: '10:00', value: '10:00' },
  { text: '11:00', value: '11:00' },
  { text: '11:30', value: '11:30' },
  { text: '12:00', value: '12:00' },
  { text: '12:30', value: '12:30' },
  { text: '13:00', value: '13:00' },
  { text: '17:00', value: '17:00' },
  { text: '17:30', value: '17:30' },
  { text: '18:00', value: '18:00' },
  { text: '18:30', value: '18:30' },
  { text: '19:00', value: '19:00' },
  { text: '19:30', value: '19:30' },
  { text: '20:00', value: '20:00' }
]

const blessingTemplates = [
  '诚挚邀请您参加我们的婚礼，共同见证这幸福的时刻',
  '我们的幸福时刻，期待您的到来与祝福',
  '在这美好的日子里，诚邀您见证我们的爱情',
  '感谢您一直以来的关心与支持，期待您的光临',
  '我们将携手走进婚姻殿堂，期待与您分享这份喜悦'
]

const invitationData = ref({
  groomName: '',
  brideName: '',
  weddingDate: null,
  weddingTime: '',
  weddingAddress: '',
  blessing: ''
})

const formattedWeddingDate = computed(() => {
  if (!invitationData.value.weddingDate) return ''
  const date = invitationData.value.weddingDate
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}年${month}月${day}日`
})

const getPreviewStyle = () => {
  if (!template.value) return {}
  return {
    background: `linear-gradient(135deg, ${template.value.colors[0]}20, ${template.value.colors[2]})`
  }
}

const useBlessing = (blessing) => {
  invitationData.value.blessing = blessing
}

const onDateConfirm = (value) => {
  invitationData.value.weddingDate = value
  showDatePicker.value = false
}

const onTimeConfirm = ({ selectedValues }) => {
  invitationData.value.weddingTime = selectedValues[0]
  showTimePicker.value = false
}

const goToPreview = () => {
  if (!invitationData.value.groomName || !invitationData.value.brideName) {
    showToast('请填写新人姓名')
    return
  }
  if (!invitationData.value.weddingDate) {
    showToast('请选择婚礼日期')
    return
  }
  
  router.push({
    path: '/invitation-preview/1',
    query: {
      templateId: templateId.value,
      ...invitationData.value,
      weddingDate: formattedWeddingDate.value
    }
  })
}

const saveInvitation = () => {
  const savedInvitations = JSON.parse(localStorage.getItem('savedInvitations') || '[]')
  const newInvitation = {
    id: Date.now(),
    templateId: templateId.value,
    ...invitationData.value,
    createTime: new Date().toISOString()
  }
  savedInvitations.unshift(newInvitation)
  localStorage.setItem('savedInvitations', JSON.stringify(savedInvitations))
  showSuccessToast('保存成功')
}

const generateInvitation = () => {
  if (!invitationData.value.groomName || !invitationData.value.brideName) {
    showToast('请填写新人姓名')
    return
  }
  if (!invitationData.value.weddingDate) {
    showToast('请选择婚礼日期')
    return
  }

  showDialog({
    title: '生成请柬',
    message: '请柬生成后，您可以分享给好友或保存到本地',
    confirmButtonText: '确认生成',
    confirmButtonColor: '#D4AF37'
  }).then(() => {
    const savedInvitations = JSON.parse(localStorage.getItem('myInvitations') || '[]')
    const newInvitation = {
      id: Date.now(),
      templateName: template.value?.name || '浪漫香槟金',
      templateId: templateId.value,
      groomName: invitationData.value.groomName,
      brideName: invitationData.value.brideName,
      weddingDate: formattedWeddingDate.value,
      weddingAddress: invitationData.value.weddingAddress,
      previewImage: template.value?.preview || '',
      createTime: new Date().toISOString(),
      shareCount: 0
    }
    savedInvitations.unshift(newInvitation)
    localStorage.setItem('myInvitations', JSON.stringify(savedInvitations))
    
    showSuccessToast('请柬生成成功')
    router.push({
      path: '/invitation-preview/1',
      query: {
        templateId: templateId.value,
        ...invitationData.value,
        weddingDate: formattedWeddingDate.value
      }
    })
  }).catch(() => {
    // 用户取消
  })
}

onMounted(() => {
  const savedDraft = localStorage.getItem('invitationDraft')
  if (savedDraft) {
    const draft = JSON.parse(savedDraft)
    invitationData.value = { ...invitationData.value, ...draft }
  }
})
</script>

<style lang="less" scoped>
.invitation-create-page {
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
  min-height: 100vh;
  padding-bottom: 80px;
}

.create-content {
  padding-bottom: 20px;
}

.preview-section {
  padding: 16px;
  background: #FFFFFF;
  margin: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .preview-card {
    width: 100%;
    padding: 24px 16px;
    border-radius: 8px;
    background: linear-gradient(135deg, #FDF8F0, #FFFFFF);
    border: 1px solid #F5E6C8;
    text-align: center;

    .preview-header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;

      .decorative-line {
        width: 40px;
        height: 1px;
        background: linear-gradient(90deg, transparent, #D4AF37, transparent);
      }

      .preview-title {
        font-size: 18px;
        font-weight: 600;
        color: #D4AF37;
        margin: 0 12px;
        letter-spacing: 4px;
      }
    }

    .preview-couple {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      .groom-name,
      .bride-name {
        font-size: 20px;
        font-weight: 600;
        color: #333333;
      }

      .heart-symbol {
        font-size: 18px;
        color: #D4A5A5;
        margin: 0 12px;
        animation: pulse 1.5s ease-in-out infinite;
      }
    }

    .preview-wedding-info {
      margin-bottom: 16px;

      .info-item {
        display: flex;
        justify-content: center;
        margin-bottom: 8px;
        font-size: 13px;

        .info-label {
          color: #999999;
          margin-right: 8px;
          flex-shrink: 0;
        }

        .info-value {
          color: #333333;
          text-align: left;

          &.address {
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }

    .preview-blessing {
      padding: 12px;
      background: rgba(245, 230, 200, 0.3);
      border-radius: 8px;
      margin-bottom: 16px;

      p {
        font-size: 12px;
        color: #666666;
        line-height: 1.6;
        margin: 0;
      }
    }

    .preview-footer {
      .decorative-dots {
        display: flex;
        justify-content: center;
        gap: 8px;

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #D4AF37;
        }
      }
    }
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.form-section {
  margin-top: 12px;

  .section-title {
    font-size: 14px;
    font-weight: 600;
    color: #333333;
    padding: 0 16px 8px;
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

  .cell-value {
    color: #999999;
  }
}

.blessing-templates {
  padding: 0 16px;
  margin-top: 12px;

  .templates-title {
    font-size: 13px;
    color: #666666;
    margin-bottom: 8px;
  }

  .templates-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .template-item {
      font-size: 11px;
      color: #666666;
      background: #F5F5F5;
      padding: 6px 12px;
      border-radius: 12px;
      max-width: calc(50% - 4px);
      line-height: 1.5;
      transition: all 0.3s ease;

      &:active {
        background: rgba(212, 175, 55, 0.1);
        color: #D4AF37;
      }
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
  gap: 12px;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);

  .btn-save {
    flex: 1;
    height: 44px;
    border-radius: 22px;
    border: 1px solid #D4AF37;
    background: #FFFFFF;
    color: #D4AF37;
    font-size: 14px;
    font-weight: 500;
  }

  .btn-generate {
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

.preview-btn {
  font-size: 14px;
  color: #D4AF37;
  padding: 4px 8px;
}
</style>
