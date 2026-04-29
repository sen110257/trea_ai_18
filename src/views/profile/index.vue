<template>
  <div class="profile-page page-container">
    <div class="profile-header" v-if="userStore.isLoggedIn">
      <div class="user-info">
        <div class="user-avatar">
          <van-icon name="user-o" size="32" color="#FFFFFF" />
        </div>
        <div class="user-detail">
          <span class="user-name">{{ userStore.userInfo?.name || '用户昵称' }}</span>
          <span class="user-phone">{{ userStore.userInfo?.phone || '138****8888' }}</span>
        </div>
        <van-icon name="arrow" size="16" color="#999999" class="edit-icon" @click="goToEdit" />
      </div>
    </div>

    <div class="profile-header-guest" v-else>
      <div class="guest-info" @click="goToLogin">
        <div class="guest-avatar">
          <van-icon name="user-o" size="32" color="#D4AF37" />
        </div>
        <div class="guest-detail">
          <span class="guest-text">登录/注册</span>
          <span class="guest-sub">登录享受更多服务</span>
        </div>
        <van-icon name="arrow" size="16" color="#999999" />
      </div>
    </div>

    <div class="menu-section">
      <div class="menu-group">
        <h4 class="group-title">我的订单</h4>
        <van-cell-group inset>
          <van-cell title="我的预约" is-link @click="goToOrders">
            <template #icon>
              <van-icon name="orders-o" size="20" color="#D4AF37" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <div class="menu-group">
        <h4 class="group-title">我的收藏</h4>
        <van-cell-group inset>
          <van-cell title="我的收藏" is-link @click="goToFavorites">
            <template #icon>
              <van-icon name="star-o" size="20" color="#D4AF37" />
            </template>
            <template #right-icon>
              <span class="badge-text" v-if="favoritesCount > 0">{{ favoritesCount }}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <div class="menu-group">
        <h4 class="group-title">请柬管理</h4>
        <van-cell-group inset>
          <van-cell title="我的请柬" is-link @click="goToInvitations">
            <template #icon>
              <van-icon name="envelope-o" size="20" color="#D4AF37" />
            </template>
          </van-cell>
          <van-cell title="宾客报名" is-link @click="goToGuest">
            <template #icon>
              <van-icon name="friends-o" size="20" color="#D4A5A5" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <div class="menu-group">
        <h4 class="group-title">其他服务</h4>
        <van-cell-group inset>
          <van-cell title="在线客服" is-link @click="goToService">
            <template #icon>
              <van-icon name="service-o" size="20" color="#4A7C59" />
            </template>
          </van-cell>
          <van-cell title="关于我们" is-link @click="showAbout = true">
            <template #icon>
              <van-icon name="info-o" size="20" color="#8A8A8A" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>

    <div class="logout-section" v-if="userStore.isLoggedIn">
      <van-button class="btn-logout" block @click="handleLogout">
        退出登录
      </van-button>
    </div>

    <div class="version-section">
      <p class="version-text">版本 v1.0.0</p>
    </div>

    <van-popup v-model:show="showAbout" position="center" round :style="{ width: '300px' }">
      <div class="about-popup">
        <div class="about-icon">
          <van-icon name="heart" size="40" color="#D4AF37" />
        </div>
        <h3 class="about-title">高端婚礼策划定制</h3>
        <p class="about-desc">为您打造完美婚礼</p>
        <p class="about-version">版本 v1.0.0</p>
        <van-button class="btn-close" @click="showAbout = false">
          确定
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showDialog, showSuccessToast } from 'vant'
import { useUserStore } from '@/store/user.js'
import { useFavoritesStore } from '@/store/favorites.js'

const router = useRouter()
const userStore = useUserStore()
const favoritesStore = useFavoritesStore()

const showAbout = ref(false)

const favoritesCount = computed(() => {
  return favoritesStore.favorites.templates.length +
         favoritesStore.favorites.venues.length +
         favoritesStore.favorites.staffs.length
})

const goToLogin = () => {
  router.push('/login')
}

const goToEdit = () => {
  router.push('/profile-edit')
}

const goToOrders = () => {
  router.push('/my-orders')
}

const goToFavorites = () => {
  router.push('/my-favorites')
}

const goToInvitations = () => {
  router.push('/my-invitations')
}

const goToGuest = () => {
  router.push('/guest')
}

const goToService = () => {
  router.push('/customer-service')
}

const handleLogout = () => {
  showDialog({
    title: '提示',
    message: '确定要退出登录吗？',
    confirmButtonText: '确定退出',
    confirmButtonColor: '#D4AF37'
  }).then(() => {
    userStore.logout()
    showSuccessToast('已退出登录')
  }).catch(() => {
    // 用户取消
  })
}

onMounted(() => {
  userStore.initUser()
})
</script>

<style lang="less" scoped>
.profile-page {
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
  min-height: 100vh;
  padding-bottom: calc(50px + env(safe-area-inset-bottom));
}

.profile-header {
  background: linear-gradient(135deg, #D4AF37, #F5E6C8);
  padding: 20px 16px;
  padding-top: calc(20px + env(safe-area-inset-top));

  .user-info {
    display: flex;
    align-items: center;

    .user-avatar {
      width: 64px;
      height: 64px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      border: 2px solid rgba(255, 255, 255, 0.5);
    }

    .user-detail {
      flex: 1;
      display: flex;
      flex-direction: column;

      .user-name {
        font-size: 18px;
        font-weight: 600;
        color: #FFFFFF;
      }

      .user-phone {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.85);
        margin-top: 4px;
      }
    }

    .edit-icon {
      padding: 8px;
    }
  }
}

.profile-header-guest {
  background: #FFFFFF;
  padding: 20px 16px;
  padding-top: calc(20px + env(safe-area-inset-top));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .guest-info {
    display: flex;
    align-items: center;

    .guest-avatar {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(245, 230, 200, 0.3));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      border: 2px solid rgba(212, 175, 55, 0.2);
    }

    .guest-detail {
      flex: 1;
      display: flex;
      flex-direction: column;

      .guest-text {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
      }

      .guest-sub {
        font-size: 13px;
        color: #999999;
        margin-top: 4px;
      }
    }
  }
}

.menu-section {
  margin-top: 12px;

  .menu-group {
    margin-bottom: 12px;

    .group-title {
      font-size: 13px;
      color: #999999;
      margin: 0 0 8px 16px;
      font-weight: 400;
    }
  }
}

.badge-text {
  font-size: 12px;
  color: #FFFFFF;
  background: #D4AF37;
  padding: 2px 8px;
  border-radius: 10px;
  margin-right: 4px;
}

.logout-section {
  padding: 16px;
  margin-top: 12px;

  .btn-logout {
    height: 44px;
    border-radius: 22px;
    border: 1px solid #E5E5E5;
    background: #FFFFFF;
    color: #666666;
    font-size: 15px;
    font-weight: 500;
  }
}

.version-section {
  text-align: center;
  padding: 20px 0;
  padding-bottom: calc(20px + 50px + env(safe-area-inset-bottom));

  .version-text {
    font-size: 12px;
    color: #CCCCCC;
    margin: 0;
  }
}

.about-popup {
  padding: 32px 24px;
  text-align: center;

  .about-icon {
    margin-bottom: 16px;
  }

  .about-title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    margin: 0 0 8px;
  }

  .about-desc {
    font-size: 13px;
    color: #999999;
    margin: 0 0 8px;
  }

  .about-version {
    font-size: 12px;
    color: #CCCCCC;
    margin: 0 0 24px;
  }

  .btn-close {
    width: 120px;
    height: 40px;
    border-radius: 20px;
    background: linear-gradient(135deg, #D4AF37, #F5E6C8);
    border: none;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
