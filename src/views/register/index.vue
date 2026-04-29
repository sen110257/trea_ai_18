<template>
  <div class="register-page">
    <PageHeader title="注册" />

    <div class="register-content">
      <div class="form-section">
        <van-cell-group inset>
          <van-cell>
            <template #icon>
              <van-icon name="phone-o" size="18" color="#D4AF37" />
            </template>
            <van-field
              v-model="registerForm.phone"
              type="tel"
              placeholder="请输入手机号"
              :border="false"
              maxlength="11"
            />
          </van-cell>
          <van-cell>
            <template #icon>
              <van-icon name="shield-o" size="18" color="#D4AF37" />
            </template>
            <van-field
              v-model="registerForm.code"
              type="text"
              placeholder="请输入验证码"
              :border="false"
              maxlength="6"
            >
              <template #button>
                <van-button
                  size="small"
                  type="primary"
                  :disabled="countdown > 0"
                  @click="sendCode"
                  :style="{ background: countdown > 0 ? '#CCCCCC' : 'linear-gradient(135deg, #D4AF37, #F5E6C8)' }"
                >
                  {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
                </van-button>
              </template>
            </van-field>
          </van-cell>
          <van-cell>
            <template #icon>
              <van-icon name="user-o" size="18" color="#D4AF37" />
            </template>
            <van-field
              v-model="registerForm.nickname"
              type="text"
              placeholder="请输入昵称"
              :border="false"
              maxlength="20"
            />
          </van-cell>
          <van-cell>
            <template #icon>
              <van-icon name="lock" size="18" color="#D4AF37" />
            </template>
            <van-field
              v-model="registerForm.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请设置密码(6-20位)"
              :border="false"
              maxlength="20"
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
          <van-cell>
            <template #icon>
              <van-icon name="lock" size="18" color="#D4AF37" />
            </template>
            <van-field
              v-model="registerForm.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="请确认密码"
              :border="false"
              maxlength="20"
            >
              <template #button>
                <van-icon
                  :name="showConfirmPassword ? 'eye' : 'closed-eye'"
                  size="18"
                  color="#999999"
                  @click="showConfirmPassword = !showConfirmPassword"
                />
              </template>
            </van-field>
          </van-cell>
        </van-cell-group>

        <van-button class="btn-register" block @click="handleRegister">
          注册
        </van-button>

        <div class="login-link">
          <span>已有账号？</span>
          <span class="login-text" @click="goToLogin">立即登录</span>
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

const router = useRouter()

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const countdown = ref(0)
const agreed = ref(true)

const registerForm = reactive({
  phone: '',
  code: '',
  nickname: '',
  password: '',
  confirmPassword: ''
})

const sendCode = () => {
  if (!registerForm.phone.trim()) {
    showToast('请输入手机号')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(registerForm.phone.trim())) {
    showToast('请输入正确的手机号')
    return
  }

  countdown.value = 60
  const timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)

  showSuccessToast('验证码已发送')
}

const handleRegister = () => {
  if (!registerForm.phone.trim()) {
    showToast('请输入手机号')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(registerForm.phone.trim())) {
    showToast('请输入正确的手机号')
    return
  }
  if (!registerForm.code.trim()) {
    showToast('请输入验证码')
    return
  }
  if (!registerForm.nickname.trim()) {
    showToast('请输入昵称')
    return
  }
  if (!registerForm.password.trim()) {
    showToast('请设置密码')
    return
  }
  if (registerForm.password.length < 6) {
    showToast('密码长度不能少于6位')
    return
  }
  if (registerForm.password !== registerForm.confirmPassword) {
    showToast('两次输入的密码不一致')
    return
  }
  if (!agreed.value) {
    showToast('请先阅读并同意用户协议')
    return
  }

  showSuccessToast('注册成功')
  setTimeout(() => {
    router.push('/login')
  }, 500)
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style lang="less" scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
}

.register-content {
  padding: 20px 16px;
}

.form-section {
  .btn-register {
    height: 44px;
    border-radius: 22px;
    background: linear-gradient(135deg, #D4AF37, #F5E6C8);
    border: none;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: 600;
    margin: 24px 16px 0;
  }

  .login-link {
    text-align: center;
    margin-top: 16px;
    font-size: 13px;
    color: #999999;

    .login-text {
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
