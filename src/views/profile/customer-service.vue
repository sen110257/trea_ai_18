<template>
  <div class="customer-service-page page-container-no-tabbar">
    <PageHeader title="在线客服" />

    <div class="service-content">
      <div class="contact-section">
        <h3 class="section-title">联系我们</h3>
        <div class="contact-list">
          <div class="contact-item" @click="callPhone">
            <div class="contact-icon phone">
              <van-icon name="phone-o" size="24" color="#FFFFFF" />
            </div>
            <div class="contact-info">
              <span class="contact-name">客服热线</span>
              <span class="contact-value">400-888-8888</span>
            </div>
            <van-icon name="arrow" size="16" color="#999999" />
          </div>
          <div class="contact-item" @click="openWechat">
            <div class="contact-icon wechat">
              <van-icon name="wechat" size="24" color="#FFFFFF" />
            </div>
            <div class="contact-info">
              <span class="contact-name">微信客服</span>
              <span class="contact-value">wedding_service</span>
            </div>
            <van-icon name="arrow" size="16" color="#999999" />
          </div>
          <div class="contact-item">
            <div class="contact-icon time">
              <van-icon name="clock-o" size="24" color="#FFFFFF" />
            </div>
            <div class="contact-info">
              <span class="contact-name">服务时间</span>
              <span class="contact-value">工作日 9:00-18:00</span>
            </div>
          </div>
        </div>
      </div>

      <div class="faq-section">
        <h3 class="section-title">常见问题</h3>
        <van-cell-group inset>
          <van-cell title="如何预约婚礼场地？" is-link @click="showFaq(1" />
          <van-cell title="如何修改预约信息？" is-link @click="showFaq(2)" />
          <van-cell title="取消预约需要提前多久？" is-link @click="showFaq(3)" />
          <van-cell title="如何查看订单状态？" is-link @click="showFaq(4)" />
          <van-cell title="如何获取更多帮助？" is-link @click="showFaq(5)" />
        </van-cell-group>
      </div>

      <div class="suggestion-section">
        <h3 class="section-title">意见反馈</h3>
        <div class="suggestion-content">
          <van-field
            v-model="suggestion"
            type="textarea"
            placeholder="请输入您的意见或建议，我们会认真对待每一条反馈"
            rows="4"
            maxlength="200"
            show-word-limit
          />
          <van-button class="btn-submit" block @click="submitSuggestion">
            提交反馈
          </van-button>
        </div>
      </div>
    </div>

    <van-popup v-model:show="showFaqPopup" position="bottom" round>
      <div class="faq-popup">
        <div class="faq-header">
          <h3 class="faq-title">{{ currentFaq.title }}</h3>
          <van-icon name="cross" size="20" @click="showFaqPopup = false" />
        </div>
        <div class="faq-content">
          <p>{{ currentFaq.content }}</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { showToast, showSuccessToast } from 'vant'
import PageHeader from '@/components/PageHeader.vue'

const suggestion = ref('')
const showFaqPopup = ref(false)

const currentFaq = reactive({
  title: '',
  content: ''
})

const faqList = [
  {
    title: '如何预约婚礼场地？',
    content: '您可以通过以下方式预约婚礼场地：\n1. 在APP首页点击"场地预约"入口，浏览可选的婚礼场地；\n2. 点击感兴趣的场地，查看详细信息和3D全景；\n3. 选择日期和时间，点击"立即预约"按钮；\n4. 填写预约信息并提交，工作人员将在24小时内与您联系确认。'
  },
  {
    title: '如何修改预约信息？',
    content: '修改预约信息请按以下步骤操作：\n1. 进入"我的预约"页面，找到需要修改的订单；\n2. 点击订单卡片查看详情；\n3. 点击"联系客服"按钮；\n4. 告知客服需要修改的内容，客服将协助您完成修改。\n\n注：预约信息修改需提前7天联系客服，部分修改可能产生额外费用。'
  },
  {
    title: '取消预约需要提前多久？',
    content: '取消预约的时间规定如下：\n• 提前15天及以上：可全额退款；\n• 提前7-14天：退款70%；\n• 提前3-6天：退款50%；\n• 提前1-2天：退款30%；\n• 当天取消：不予退款。\n\n具体退款规则请参考合同约定，如有疑问请联系客服。'
  },
  {
    title: '如何查看订单状态？',
    content: '查看订单状态请按以下步骤操作：\n1. 进入"我的"页面；\n2. 点击"我的预约"进入订单列表；\n3. 在订单卡片上可查看当前状态；\n4. 点击订单可查看详细信息。\n\n订单状态包括：待确认、已确认、已完成、已取消。'
  },
  {
    title: '如何获取更多帮助？',
    content: '您可以通过以下方式获取更多帮助：\n• 客服热线：400-888-8888（工作日9:00-18:00）；\n• 微信客服：wedding_service；\n• APP内在线客服；\n• 意见反馈：在此页面提交您的问题或建议，我们会尽快回复。\n\n感谢您的使用，祝您生活愉快！'
  }
]

const callPhone = () => {
  showToast('正在拨打: 400-888-8888')
}

const openWechat = () => {
  showToast('请打开微信添加好友：wedding_service')
}

const showFaq = (index) => {
  const faq = faqList[index - 1]
  if (faq) {
    currentFaq.title = faq.title
    currentFaq.content = faq.content
    showFaqPopup.value = true
  }
}

const submitSuggestion = () => {
  if (!suggestion.value.trim()) {
    showToast('请输入反馈内容')
    return
  }
  showSuccessToast('感谢您的反馈，我们会认真对待')
  suggestion.value = ''
}
</script>

<style lang="less" scoped>
.customer-service-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
}

.service-content {
  padding-bottom: 20px;
}

.contact-section,
.faq-section,
.suggestion-section {
  margin-top: 12px;

  .section-title {
    font-size: 15px;
    font-weight: 600;
    color: #333333;
    margin: 0 16px 12px;
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

.contact-list {
  background: #FFFFFF;
  margin: 0 16px;
  border-radius: 12px;
  overflow: hidden;

  .contact-item {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #F5F5F5;

    &:last-child {
      border-bottom: none;
    }

    .contact-icon {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;

      &.phone {
        background: linear-gradient(135deg, #D4AF37, #F5E6C8);
      }

      &.wechat {
        background: linear-gradient(135deg, #07C160, #4CD964);
      }

      &.time {
        background: linear-gradient(135deg, #8A8A8A, #B0B0B0);
      }
    }

    .contact-info {
      flex: 1;
      display: flex;
      flex-direction: column;

      .contact-name {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
      }

      .contact-value {
        font-size: 12px;
        color: #999999;
        margin-top: 4px;
      }
    }
  }
}

.suggestion-content {
  background: #FFFFFF;
  margin: 0 16px;
  border-radius: 12px;
  padding: 16px;

  .btn-submit {
    height: 44px;
    border-radius: 22px;
    background: linear-gradient(135deg, #D4AF37, #F5E6C8);
    border: none;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: 600;
    margin-top: 12px;
  }
}

.faq-popup {
  padding: 20px;

  .faq-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px solid #F5F5F5;

    .faq-title {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      margin: 0;
    }
  }

  .faq-content {
    padding: 16px 0;

    p {
      font-size: 14px;
      color: #666666;
      line-height: 1.8;
      margin: 0;
      white-space: pre-line;
    }
  }
}
</style>
