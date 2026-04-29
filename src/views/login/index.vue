<template>
  <div class="login-page">
    <PageHeader title="登录" />

    <div class="login-content">
      <div class="logo-section">
        <div class="logo-icon">
          <van-icon name="heart" size="48" color="#D4AF37" />
        </div>
        <h1 class="logo-title">高端婚礼策划定制</h1>
        <p class="logo-subtitle">为您打造完美婚礼</p>
      </div>

      <div class="form-section">
        <van-cell-group inset>
          <van-cell>
            <template #icon>
              <van-icon name="phone-o" size="18" color="#D4AF37" />
            </template>
            <van-field
              v-model="loginForm.phone"
              type="tel"
              placeholder="请输入手机号"
              :border="false"
              maxlength="11"
            />
          </van-cell>
          <van-cell>
            <template #icon>
              <van-icon name="lock" size="18" color="#D4AF37" />
            </template>
            <van-field
              v-model="loginForm.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              :border="false"
            >
              <template #button>
                <van-icon
                  :name="showPassword ? 'eye' : 'closed-eye'"
                  size="18"
                  color="#999999"
                  @click="showPassword = !showPassword"
                />
              </template>
            </van-field>
          </van-cell>
        </van-cell-group>

        <div class="action-row">
          <div class="remember-me" @click="rememberMe = !rememberMe">
            <van-icon
              :name="rememberMe ? 'checked' : 'circle'"
              size="16"
              :color="rememberMe ? '#D4AF37' : '#CCCCCC'"
            />
            <span>记住密码</span>
          </div>
          <span class="forgot-password" @click="goToRegister">
            忘记密码？
          </span>
        </div>

        <van-button class="btn-login" block @click="handleLogin">
          登录
        </van-button>

        <div class="register-link">
          <span>还没有账号？</span>
          <span class="register-text" @click="goToRegister">立即注册</span>
        </div>
      </div>

      <div class="agreement-section">
        <div class="agreement-check" @click="agreed = !agreed">
          <van-icon
            :name="agreed ? 'checked' : 'circle'"
            size="14"
            :color="agreed ? '#D4AF37' : '#CCCCCC'"
          />
        </div>
        <span class="agreement-text">
          我已阅读并同意
          <span class="agreement-link">《用户协议》</span>
          和
          <span class="agreement-link">《隐私政策》</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showSuccessToast } from 'vant'
import PageHeader from '@/components/PageHeader.vue'
import { useUserStore } from '@/store/user.js'

const router = useRouter()
const userStore = useUserStore()

const showPassword = ref(false)
const rememberMe = ref(false)
const agreed = ref(true)

const loginForm = reactive({
  phone: '',
  password: ''
})

const handleLogin = () => {
  if (!loginForm.phone.trim()) {
    showToast('请输入手机号')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(loginForm.phone.trim())) {
    showToast('请输入正确的手机号')
    return
  }
  if (!loginForm.password.trim()) {
    showToast('请输入密码')
    return
  }
  if (!agreed.value) {
    showToast('请先阅读并同意用户协议')
    return
  }

  const userInfo = {
    id: 1,
    name: '婚礼用户',
    phone: loginForm.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
    avatar: '',
    email: ''
  }
  const token = 'mock_token_' + Date.now()

  userStore.login(userInfo, token)
  showSuccessToast('登录成功')
  setTimeout(() => {
    router.push('/profile')
  }, 500)
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style lang="less" scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
}

.login-content {
  padding: 20px 16px;
}

.logo-section {
  text-align: center;
  padding: 40px 0;

  .logo-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(245, 230, 200, 0.3));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    border: 2px solid rgba(212, 175, 55, 0.2);
  }

  .logo-title {
    font-size: 20px;
    font-weight: 700;
    color: #333333;
    margin: 0 0 8px;
  }

  .logo-subtitle {
    font-size: 13px;
    color: #999999;
    margin: 0;
  }
}

.form-section {
  margin-top: 20px;

  .action-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    margin-top: 12px;

    .remember-me {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #666666;
    }

    .forgot-password {
      font-size: 13px;
      color: #D4AF37;
    }
  }

  .btn-login {
    width: 100%;
    height: 44px;
    border-radius: 22px;
    background: linear-gradient(135deg, #D4AF37, #F5E6C8);
    border: none;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: 600;
    margin: 24px 0 0;
  }

  .register-link {
    text-align: center;
    margin-top: 16px;
    font-size: 13px;
    color: #999999;

    .register-text {
      color: #D4AF37;
      margin-left: 4px;
    }
  }
}

.agreement-section {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 40px;
  padding: 0 16px;

  .agreement-check {
    margin-top: 2px;
    margin-right: 6px;
  }

  .agreement-text {
    font-size: 12px;
    color: #999999;
    line-height: 1.6;

    .agreement-link {
      color: #D4AF37;
    }
  }
}
</style>
