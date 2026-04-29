<template>
  <div class="invitation-preview-page">
    <div class="header-bar">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#333333" />
      </div>
      <div class="header-title">请柬预览</div>
      <div class="share-btn" @click="showSharePopup = true">
        <van-icon name="share-o" size="20" color="#D4AF37" />
      </div>
    </div>

    <div class="preview-container" :style="getPreviewStyle()">
      <div class="preview-content">
        <div class="decorative-top">
          <div class="floral-decor left">
            <van-icon name="like-o" size="32" color="#D4AF37" />
          </div>
          <div class="floral-decor right">
            <van-icon name="like-o" size="32" color="#D4AF37" />
          </div>
        </div>

        <div class="invitation-header">
          <h2 class="main-title">我们结婚啦</h2>
          <p class="subtitle">WEDDING INVITATION</p>
        </div>

        <div class="couple-section">
          <div class="groom-section">
            <span class="title-label">新郎</span>
            <span class="name">{{ invitationData.groomName || '新郎姓名' }}</span>
          </div>
          <div class="heart-section">
            <van-icon name="like" size="28" color="#D4A5A5" />
            <span class="date-text">{{ invitationData.weddingDate || 'YYYY年MM月DD日' }}</span>
          </div>
          <div class="bride-section">
            <span class="title-label">新娘</span>
            <span class="name">{{ invitationData.brideName || '新娘姓名' }}</span>
          </div>
        </div>

        <div class="divider-line"></div>

        <div class="info-section">
          <div class="info-item">
            <van-icon name="clock-o" size="18" color="#D4AF37" />
            <div class="info-content">
              <span class="info-label">婚礼时间</span>
              <span class="info-value">{{ invitationData.weddingDate || 'YYYY年MM月DD日' }} {{ invitationData.weddingTime || '' }}</span>
            </div>
          </div>
          <div class="info-item">
            <van-icon name="location-o" size="18" color="#D4AF37" />
            <div class="info-content">
              <span class="info-label">举办地点</span>
              <span class="info-value address">{{ invitationData.weddingAddress || '请填写婚礼地址' }}</span>
            </div>
          </div>
        </div>

        <div class="blessing-section">
          <div class="quotes left">"</div>
          <p class="blessing-text">{{ invitationData.blessing || '诚挚邀请您参加我们的婚礼，共同见证这幸福的时刻' }}</p>
          <div class="quotes right">"</div>
        </div>

        <div class="qr-section" v-if="showQR">
          <div class="qr-placeholder">
            <van-icon name="qr" size="60" color="#E5E5E5" />
            <p class="qr-tip">扫码查看电子请柬</p>
          </div>
        </div>

        <div class="footer-section">
          <div class="footer-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <p class="footer-text">期待您的光临</p>
          <p class="footer-date">{{ invitationData.weddingDate || '' }}</p>
        </div>
      </div>
    </div>

    <div class="action-bar">
      <div class="action-item" @click="editInvitation">
        <van-icon name="edit" size="20" color="#999999" />
        <span>编辑</span>
      </div>
      <div class="action-item" @click="showSharePopup = true">
        <van-icon name="share-o" size="20" color="#D4AF37" />
        <span>分享</span>
      </div>
      <div class="action-item" @click="saveToLocal">
        <van-icon name="download" size="20" color="#999999" />
        <span>保存</span>
      </div>
    </div>

    <van-popup v-model:show="showSharePopup" position="bottom" round>
      <div class="share-popup">
        <div class="share-title">分享请柬</div>
        <div class="share-options">
          <div class="share-option" @click="shareToWechat">
            <van-icon name="wechat" size="36" color="#07C160" />
            <span>微信好友</span>
          </div>
          <div class="share-option" @click="shareToMoments">
            <van-icon name="friends-o" size="36" color="#07C160" />
            <span>朋友圈</span>
          </div>
          <div class="share-option" @click="shareToQQ">
            <van-icon name="qq" size="36" color="#12B7F5" />
            <span>QQ</span>
          </div>
          <div class="share-option" @click="copyLink">
            <van-icon name="link" size="36" color="#999999" />
            <span>复制链接</span>
          </div>
        </div>
        <div class="share-cancel" @click="showSharePopup = false">
          取消
        </div>
      </div>
    </van-popup>

    <van-popup v-model:show="showSaveSuccess" position="center" round :style="{ width: '280px' }">
      <div class="save-success-popup">
        <van-icon name="passed" size="48" color="#D4AF37" />
        <h3 class="success-title">保存成功</h3>
        <p class="success-desc">请柬图片已保存到相册</p>
        <van-button class="btn-ok" @click="showSaveSuccess = false">
          确定
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showSuccessToast, showToast } from 'vant'
import { invitationTemplates } from '@/mock/data.js'

const route = useRoute()
const router = useRouter()

const templateId = computed(() => parseInt(route.query.templateId) || 1)
const template = computed(() => invitationTemplates.find(t => t.id === templateId.value))

const showQR = ref(false)
const showSharePopup = ref(false)
const showSaveSuccess = ref(false)

const invitationData = ref({
  groomName: route.query.groomName || '',
  brideName: route.query.brideName || '',
  weddingDate: route.query.weddingDate || '',
  weddingTime: route.query.weddingTime || '',
  weddingAddress: route.query.weddingAddress || '',
  blessing: route.query.blessing || ''
})

const getPreviewStyle = () => {
  if (!template.value) return {}
  return {
    background: `linear-gradient(135deg, ${template.value.colors[0]}10, ${template.value.colors[2]})`
  }
}

const goBack = () => {
  router.back()
}

const editInvitation = () => {
  router.back()
}

const shareToWechat = () => {
  showSharePopup.value = false
  showToast('请使用微信分享功能')
  updateShareCount()
}

const shareToMoments = () => {
  showSharePopup.value = false
  showToast('请分享到朋友圈')
  updateShareCount()
}

const shareToQQ = () => {
  showSharePopup.value = false
  showToast('请使用QQ分享功能')
  updateShareCount()
}

const copyLink = () => {
  showSharePopup.value = false
  const link = window.location.href
  navigator.clipboard?.writeText(link)
  showSuccessToast('链接已复制')
  updateShareCount()
}

const updateShareCount = () => {
  const savedInvitations = JSON.parse(localStorage.getItem('myInvitations') || '[]')
  if (savedInvitations.length > 0) {
    savedInvitations[0].shareCount = (savedInvitations[0].shareCount || 0) + 1
    localStorage.setItem('myInvitations', JSON.stringify(savedInvitations))
  }
}

const saveToLocal = () => {
  showSaveSuccess.value = true
  updateShareCount()
}

onMounted(() => {
})
</script>

<style lang="less" scoped>
.invitation-preview-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
  padding-bottom: 80px;
}

.header-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  padding-top: calc(12px + env(safe-area-inset-top));
  background: rgba(255, 255, 255, 0.95);
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .back-btn,
  .share-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-title {
    font-size: 16px;
    font-weight: 600;
    color: #333333;
  }
}

.preview-container {
  margin-top: 60px;
  padding: 20px 16px;
  min-height: calc(100vh - 140px);
}

.preview-content {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.15);
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.05), rgba(212, 165, 165, 0.05));
    z-index: 0;
  }

  &::before {
    top: -40px;
    right: -40px;
  }

  &::after {
    bottom: -40px;
    left: -40px;
  }
}

.decorative-top {
  position: relative;
  height: 40px;
  margin-bottom: 16px;

  .floral-decor {
    position: absolute;
    opacity: 0.3;
  }

  .floral-decor.left {
    left: 0;
    transform: rotate(-15deg);
  }

  .floral-decor.right {
    right: 0;
    transform: rotate(15deg) scaleX(-1);
  }
}

.invitation-header {
  text-align: center;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;

  .main-title {
    font-size: 28px;
    font-weight: 700;
    color: #D4AF37;
    margin: 0 0 8px;
    letter-spacing: 6px;
  }

  .subtitle {
    font-size: 12px;
    color: #999999;
    letter-spacing: 4px;
    margin: 0;
  }
}

.couple-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;

  .groom-section,
  .bride-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title-label {
    font-size: 12px;
    color: #999999;
    margin-bottom: 4px;
  }

  .name {
    font-size: 22px;
    font-weight: 600;
    color: #333333;
  }

  .heart-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20px;

    .date-text {
      font-size: 11px;
      color: #D4A5A5;
      margin-top: 4px;
    }
  }
}

.divider-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  margin-bottom: 24px;
}

.info-section {
  margin-bottom: 24px;
  position: relative;
  z-index: 1;

  .info-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    .info-content {
      margin-left: 12px;
      flex: 1;

      .info-label {
        font-size: 12px;
        color: #999999;
        display: block;
        margin-bottom: 2px;
      }

      .info-value {
        font-size: 14px;
        color: #333333;

        &.address {
          word-break: break-all;
        }
      }
    }
  }
}

.blessing-section {
  position: relative;
  padding: 16px;
  background: rgba(245, 230, 200, 0.3);
  border-radius: 12px;
  margin-bottom: 24px;
  z-index: 1;

  .quotes {
    font-size: 48px;
    color: rgba(212, 175, 55, 0.2);
    font-family: serif;
    position: absolute;
    line-height: 1;
  }

  .quotes.left {
    top: 0;
    left: 8px;
  }

  .quotes.right {
    bottom: 8px;
    right: 8px;
    transform: rotate(180deg);
  }

  .blessing-text {
    font-size: 14px;
    color: #666666;
    line-height: 1.8;
    margin: 0;
    text-align: center;
    padding: 8px;
  }
}

.qr-section {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;

  .qr-placeholder {
    width: 120px;
    height: 120px;
    border: 1px dashed #E5E5E5;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .qr-tip {
      font-size: 11px;
      color: #999999;
      margin-top: 8px;
    }
  }
}

.footer-section {
  text-align: center;
  position: relative;
  z-index: 1;

  .footer-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 12px;

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #D4AF37;
    }
  }

  .footer-text {
    font-size: 14px;
    color: #666666;
    margin-bottom: 4px;
  }

  .footer-date {
    font-size: 12px;
    color: #999999;
    margin: 0;
  }
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  display: flex;
  padding: 12px 0;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);

  .action-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: #666666;
  }
}

.share-popup {
  padding: 20px;

  .share-title {
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    text-align: center;
    margin-bottom: 20px;
  }

  .share-options {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;

    .share-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #666666;
    }
  }

  .share-cancel {
    text-align: center;
    padding: 16px;
    border-top: 1px solid #F5F5F5;
    color: #666666;
    font-size: 14px;
  }
}

.save-success-popup {
  padding: 32px 24px;
  text-align: center;

  .success-title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    margin: 16px 0 8px;
  }

  .success-desc {
    font-size: 13px;
    color: #999999;
    margin-bottom: 20px;
  }

  .btn-ok {
    width: 120px;
    height: 40px;
    border-radius: 20px;
    background: linear-gradient(135deg, #D4AF37, #F5E6C8);
    border: none;
    color: #FFFFFF;
  }
}
</style>
