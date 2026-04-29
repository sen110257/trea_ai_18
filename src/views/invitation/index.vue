<template>
  <div class="invitation-page page-container-no-tabbar">
    <PageHeader title="婚礼请柬" />

    <div class="invitation-content">
      <div class="intro-section">
        <div class="intro-icon">
          <van-icon name="envelope-o" size="32" color="#D4AF37" />
        </div>
        <div class="intro-text">
          <h3 class="intro-title">选择请柬模板</h3>
          <p class="intro-desc">多款精美模板，一键生成您的专属婚礼请柬</p>
        </div>
      </div>

      <div class="template-list">
        <div
          class="template-card"
          v-for="template in templates"
          :key="template.id"
          @click="selectTemplate(template)"
        >
          <div class="template-wrapper">
            <van-image
              :src="template.image"
              class="template-image"
              fit="cover"
              lazy-load
            />
            <div class="template-overlay" v-if="template.isPremium">
              <div class="premium-badge">
                <van-icon name="vip" size="12" color="#FFFFFF" />
                <span>高级模板</span>
              </div>
              <div class="price-badge">
                ¥{{ template.price }}
              </div>
            </div>
            <div class="template-selected" v-if="selectedTemplateId === template.id">
              <van-icon name="passed" size="24" color="#FFFFFF" />
            </div>
          </div>
          <div class="template-info">
            <h4 class="template-name">{{ template.name }}</h4>
            <p class="template-desc">{{ template.description }}</p>
            <div class="template-colors">
              <div
                class="color-dot"
                v-for="(color, index) in template.colors"
                :key="index"
                :style="{ backgroundColor: color }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="tips-section">
        <div class="tips-header">
          <van-icon name="info-o" size="16" color="#D4AF37" />
          <span class="tips-title">制作说明</span>
        </div>
        <ul class="tips-list">
          <li>• 选择喜欢的请柬模板，点击进入编辑页面</li>
          <li>• 填写新人姓名、婚礼日期、地址等信息</li>
          <li>• 实时预览效果，确认无误后生成请柬</li>
          <li>• 支持一键分享、保存本地图片</li>
        </ul>
      </div>
    </div>

    <div class="bottom-bar">
      <van-button
        class="btn-create"
        :disabled="!selectedTemplateId"
        @click="goToCreate"
      >
        开始制作
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import PageHeader from '@/components/PageHeader.vue'
import { invitationTemplates } from '@/mock/data.js'

const router = useRouter()

const templates = ref(invitationTemplates)
const selectedTemplateId = ref(null)

const selectTemplate = (template) => {
  selectedTemplateId.value = template.id
}

const goToCreate = () => {
  if (!selectedTemplateId.value) {
    showToast('请先选择请柬模板')
    return
  }
  router.push({
    path: '/invitation-create',
    query: { templateId: selectedTemplateId.value }
  })
}
</script>

<style lang="less" scoped>
.invitation-page {
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
  min-height: 100vh;
  padding-bottom: 80px;
}

.invitation-content {
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

.template-list {
  padding: 0 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.template-card {
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.96);
  }

  .template-wrapper {
    position: relative;
    height: 180px;

    .template-image {
      width: 100%;
      height: 100%;
    }

    .template-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.5));
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 12px;

      .premium-badge {
        display: flex;
        align-items: center;
        gap: 4px;
        background: linear-gradient(135deg, #D4AF37, #F5E6C8);
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11px;
        color: #FFFFFF;
        margin-bottom: 6px;
        width: fit-content;
      }

      .price-badge {
        font-size: 14px;
        font-weight: 600;
        color: #FFFFFF;
      }
    }

    .template-selected {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 48px;
      height: 48px;
      background: rgba(212, 175, 55, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid #FFFFFF;
      box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
    }
  }

  .template-info {
    padding: 12px;

    .template-name {
      font-size: 14px;
      font-weight: 600;
      color: #333333;
      margin: 0 0 4px;
    }

    .template-desc {
      font-size: 11px;
      color: #999999;
      margin: 0 0 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .template-colors {
      display: flex;
      gap: 6px;

      .color-dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #E5E5E5;
      }
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

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);

  .btn-create {
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
</style>
