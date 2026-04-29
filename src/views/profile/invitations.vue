<template>
  <div class="invitations-page page-container-no-tabbar">
    <PageHeader title="我的请柬" />

    <div class="invitation-content">
      <div class="invitation-list" v-if="invitationList.length > 0">
        <div
          class="invitation-card"
          v-for="invitation in invitationList"
          :key="invitation.id"
          @click="viewInvitation(invitation)"
        >
          <van-image
            :src="invitation.previewImage"
            class="invitation-image"
            fit="cover"
            lazy-load
          />
          <div class="invitation-info">
            <h4 class="invitation-template">{{ invitation.templateName }}</h4>
            <p class="invitation-couple">
              {{ invitation.groomName }} & {{ invitation.brideName }}
            </p>
            <div class="invitation-meta">
              <div class="meta-item">
                <van-icon name="calendar-o" size="12" color="#999999" />
                <span>{{ invitation.weddingDate }}</span>
              </div>
              <div class="meta-item">
                <van-icon name="share" size="12" color="#999999" />
                <span>分享 {{ invitation.shareCount }} 次</span>
              </div>
            </div>
          </div>
          <div class="invitation-actions">
            <van-button
              size="small"
              type="primary"
              plain
              @click.stop="shareInvitation(invitation)"
            >
              <van-icon name="share" size="14" />
              分享
            </van-button>
            <van-button
              size="small"
              type="primary"
              @click.stop="editInvitation(invitation)"
            >
              <van-icon name="edit" size="14" />
              编辑
            </van-button>
          </div>
        </div>
      </div>

      <van-empty v-else description="暂无请柬记录">
        <template #description>
          <div class="empty-action">
            <p>还没有制作过请柬</p>
            <van-button type="primary" size="small" @click="goToCreate">
              立即制作
            </van-button>
          </div>
        </template>
      </van-empty>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showSuccessToast } from 'vant'
import PageHeader from '@/components/PageHeader.vue'
import { myInvitations } from '@/mock/data.js'

const router = useRouter()

const invitationList = ref([])

const viewInvitation = (invitation) => {
  router.push({
    path: '/invitation-preview/1',
    query: {
      templateId: invitation.templateId || 1,
      groomName: invitation.groomName,
      brideName: invitation.brideName,
      weddingDate: invitation.weddingDate,
      weddingAddress: invitation.weddingAddress
    }
  })
}

const shareInvitation = (invitation) => {
  showSuccessToast('已复制分享链接')
}

const editInvitation = (invitation) => {
  router.push({
    path: '/invitation-create',
    query: { templateId: invitation.templateId || 1 }
  })
}

const goToCreate = () => {
  router.push('/invitation')
}

onMounted(() => {
  const savedInvitations = JSON.parse(localStorage.getItem('myInvitations') || '[]')
  if (savedInvitations.length > 0) {
    invitationList.value = savedInvitations
  } else {
    invitationList.value = myInvitations
  }
})
</script>

<style lang="less" scoped>
.invitations-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
}

.invitation-content {
  padding: 12px;
}

.invitation-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.invitation-card {
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .invitation-image {
    width: 100%;
    height: 160px;
  }

  .invitation-info {
    padding: 12px;
    border-bottom: 1px solid #F5F5F5;

    .invitation-template {
      font-size: 15px;
      font-weight: 600;
      color: #333333;
      margin: 0 0 6px;
    }

    .invitation-couple {
      font-size: 13px;
      color: #666666;
      margin: 0 0 8px;
    }

    .invitation-meta {
      display: flex;
      gap: 16px;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: #999999;
      }
    }
  }

  .invitation-actions {
    display: flex;
    padding: 12px;
    gap: 12px;

    .van-button {
      flex: 1;
      height: 36px;
      border-radius: 18px;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;

      &.van-button--primary {
        background: linear-gradient(135deg, #D4AF37, #F5E6C8);
        border: none;
      }
    }
  }
}

.empty-action {
  text-align: center;

  p {
    font-size: 14px;
    color: #999999;
    margin-bottom: 12px;
  }

  .van-button {
    border-radius: 16px;
    background: linear-gradient(135deg, #D4AF37, #F5E6C8);
    border: none;
  }
}
</style>
