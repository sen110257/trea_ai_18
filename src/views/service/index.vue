<template>
  <div class="service-page page-container">
    <div class="page-header-section">
      <div class="header-content">
        <div class="logo-section">
          <span class="logo-text">服务预约</span>
          <span class="logo-subtitle">一站式婚礼服务</span>
        </div>
      </div>
    </div>

    <div class="service-content">
      <div class="quick-section">
        <h3 class="section-title">快速预约</h3>
        <div class="quick-grid">
          <div class="quick-item" @click="goToVenue">
            <div class="quick-icon venue">
              <van-icon name="location-o" size="28" color="#FFFFFF" />
            </div>
            <span class="quick-name">场地预约</span>
          </div>
          <div class="quick-item" @click="goToStaff">
            <div class="quick-icon staff">
              <van-icon name="manager-o" size="28" color="#FFFFFF" />
            </div>
            <span class="quick-name">人员预约</span>
          </div>
          <div class="quick-item" @click="goToPackage">
            <div class="quick-icon package">
              <van-icon name="gift-o" size="28" color="#FFFFFF" />
            </div>
            <span class="quick-name">套餐预订</span>
          </div>
          <div class="quick-item" @click="goToInvitation">
            <div class="quick-icon invitation">
              <van-icon name="envelope-o" size="28" color="#FFFFFF" />
            </div>
            <span class="quick-name">请柬制作</span>
          </div>
        </div>
      </div>

      <div class="feature-section">
        <h3 class="section-title">特色服务</h3>
        <div class="feature-list">
          <div class="feature-card" @click="goToVenue">
            <van-image
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20wedding%20venue%20ballroom%20elegant%20decoration&image_size=square_hd"
              class="feature-image"
              fit="cover"
              lazy-load
            />
            <div class="feature-info">
              <h4 class="feature-name">场地3D全景预览</h4>
              <p class="feature-desc">沉浸式查看各大婚礼宴会厅、户外场地</p>
              <div class="feature-tags">
                <van-tag type="primary" plain size="mini">3D全景</van-tag>
                <van-tag type="primary" plain size="mini">档期查询</van-tag>
              </div>
            </div>
          </div>

          <div class="feature-card" @click="goToStaff">
            <van-image
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20wedding%20team%20photographer%20makeup%20artist&image_size=square_hd"
              class="feature-image"
              fit="cover"
              lazy-load
            />
            <div class="feature-info">
              <h4 class="feature-name">专业团队预约</h4>
              <p class="feature-desc">司仪、跟妆、摄影、摄像入驻列表</p>
              <div class="feature-tags">
                <van-tag type="primary" plain size="mini">作品集</van-tag>
                <van-tag type="primary" plain size="mini">档期查看</van-tag>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tips-section">
        <div class="tips-header">
          <van-icon name="info-o" size="16" color="#D4AF37" />
          <span class="tips-title">预约须知</span>
        </div>
        <ul class="tips-list">
          <li>• 建议提前1-3个月预约热门场地和人员</li>
          <li>• 预约成功后工作人员将在24小时内联系确认</li>
          <li>• 如需改期，请提前7天联系客服</li>
          <li>• 取消预约将按照合同约定收取相应费用</li>
        </ul>
      </div>

      <div class="contact-section">
        <div class="contact-card">
          <div class="contact-icon">
            <van-icon name="phone-o" size="32" color="#D4AF37" />
          </div>
          <div class="contact-info">
            <h4 class="contact-title">专属客服热线</h4>
            <p class="contact-phone">400-888-8888</p>
            <p class="contact-time">工作日 9:00-18:00</p>
          </div>
          <van-button class="btn-call" @click="callPhone">
            立即咨询
          </van-button>
        </div>
      </div>

      <div class="bottom-space"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const goToVenue = () => {
  router.push('/venue')
}

const goToStaff = () => {
  router.push('/staff')
}

const goToPackage = () => {
  router.push('/package')
}

const goToInvitation = () => {
  router.push('/invitation')
}

const callPhone = () => {
  showToast('正在拨打: 400-888-8888')
}
</script>

<style lang="less" scoped>
.service-page {
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
  min-height: 100vh;
  padding-bottom: calc(50px + env(safe-area-inset-bottom));
}

.page-header-section {
  background: #FFFFFF;
  padding: 12px 16px;
  padding-top: calc(12px + env(safe-area-inset-top));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .header-content {
    display: flex;
    align-items: center;

    .logo-section {
      display: flex;
      flex-direction: column;

      .logo-text {
        font-size: 18px;
        font-weight: 700;
        background: linear-gradient(135deg, #D4AF37 0%, #F5E6C8 50%, #D4AF37 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: 1px;
      }

      .logo-subtitle {
        font-size: 11px;
        color: #999999;
        margin-top: 2px;
      }
    }
  }
}

.service-content {
  padding-bottom: 20px;
}

.quick-section,
.feature-section {
  padding: 0 16px;
  margin-top: 16px;

  .section-title {
    font-size: 16px;
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
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .quick-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 4px;
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.95);
    }

    .quick-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 6px;

      &.venue {
        background: linear-gradient(135deg, #D4AF37, #F5E6C8);
      }

      &.staff {
        background: linear-gradient(135deg, #D4A5A5, #E8C4C4);
      }

      &.package {
        background: linear-gradient(135deg, #4A7C59, #7BA38A);
      }

      &.invitation {
        background: linear-gradient(135deg, #8A8A8A, #B0B0B0);
      }
    }

    .quick-name {
      font-size: 11px;
      color: #666666;
      text-align: center;
    }
  }
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-card {
  display: flex;
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
  }

  .feature-image {
    width: 120px;
    height: 100px;
    flex-shrink: 0;
  }

  .feature-info {
    flex: 1;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .feature-name {
      font-size: 15px;
      font-weight: 600;
      color: #333333;
      margin: 0 0 4px;
    }

    .feature-desc {
      font-size: 12px;
      color: #999999;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .feature-tags {
      display: flex;
      gap: 6px;
      margin-top: 8px;
    }
  }
}

.tips-section {
  margin: 16px;
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

.contact-section {
  margin: 0 16px;

  .contact-card {
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.05), rgba(245, 230, 200, 0.1));
    border-radius: 12px;
    padding: 16px;
    border: 1px solid rgba(212, 175, 55, 0.15);

    .contact-icon {
      width: 56px;
      height: 56px;
      background: #FFFFFF;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      box-shadow: 0 2px 8px rgba(212, 175, 55, 0.1);
    }

    .contact-info {
      flex: 1;

      .contact-title {
        font-size: 14px;
        font-weight: 600;
        color: #333333;
        margin: 0 0 4px;
      }

      .contact-phone {
        font-size: 20px;
        font-weight: 700;
        color: #D4AF37;
        margin: 0 0 2px;
      }

      .contact-time {
        font-size: 11px;
        color: #999999;
        margin: 0;
      }
    }

    .btn-call {
      width: 80px;
      height: 36px;
      border-radius: 18px;
      background: linear-gradient(135deg, #D4AF37, #F5E6C8);
      border: none;
      color: #FFFFFF;
      font-size: 13px;
      font-weight: 500;
    }
  }
}

.bottom-space {
  height: 20px;
}
</style>
