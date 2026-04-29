import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const token = ref(localStorage.getItem('token') || '')
  const isLoggedIn = computed(() => !!token.value)

  const login = (userData, userToken) => {
    userInfo.value = userData
    token.value = userToken
    localStorage.setItem('token', userToken)
    localStorage.setItem('userInfo', JSON.stringify(userData))
  }

  const logout = () => {
    userInfo.value = null
    token.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }

  const initUser = () => {
    const savedUserInfo = localStorage.getItem('userInfo')
    if (savedUserInfo) {
      userInfo.value = JSON.parse(savedUserInfo)
    }
  }

  return {
    userInfo,
    token,
    isLoggedIn,
    login,
    logout,
    initUser
  }
})
