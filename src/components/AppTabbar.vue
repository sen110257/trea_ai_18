<template>
  <van-tabbar v-model="active" route class="app-tabbar">
    <van-tabbar-item to="/home" name="home">
      <template #icon="{ active }">
        <van-icon :name="active ? 'home-o' : 'home-o'" :color="active ? tabbarActiveColor : tabbarInactiveColor" size="20" />
      </template>
      <span :style="{ color: active === 'home' ? tabbarActiveColor : tabbarInactiveColor }">首页</span>
    </van-tabbar-item>
    <van-tabbar-item to="/template" name="template">
      <template #icon="{ active }">
        <van-icon :name="active ? 'photo-o' : 'photo-o'" :color="active ? tabbarActiveColor : tabbarInactiveColor" size="20" />
      </template>
      <span :style="{ color: active === 'template' ? tabbarActiveColor : tabbarInactiveColor }">婚礼模板</span>
    </van-tabbar-item>
    <van-tabbar-item to="/service" name="service">
      <template #icon="{ active }">
        <van-icon :name="active ? 'calendar-o' : 'calendar-o'" :color="active ? tabbarActiveColor : tabbarInactiveColor" size="20" />
      </template>
      <span :style="{ color: active === 'service' ? tabbarActiveColor : tabbarInactiveColor }">服务预约</span>
    </van-tabbar-item>
    <van-tabbar-item to="/profile" name="profile">
      <template #icon="{ active }">
        <van-icon :name="active ? 'user-o' : 'user-o'" :color="active ? tabbarActiveColor : tabbarInactiveColor" size="20" />
      </template>
      <span :style="{ color: active === 'profile' ? tabbarActiveColor : tabbarInactiveColor }">个人中心</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tabbarActiveColor = '#D4AF37'
const tabbarInactiveColor = '#8A8A8A'

const getActiveTab = () => {
  const path = route.path
  if (path === '/home' || path === '/') return 'home'
  if (path === '/template') return 'template'
  if (path === '/service') return 'service'
  if (path === '/profile') return 'profile'
  return 'home'
}

const active = ref(getActiveTab())

watch(
  () => route.path,
  () => {
    active.value = getActiveTab()
  }
)
</script>

<style lang="less" scoped>
.app-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: @white-color;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);
  border-top: 1px solid @border-color;

  :deep(.van-tabbar-item) {
    padding: 6px 0;
  }

  :deep(.van-tabbar-item__icon) {
    margin-bottom: 2px;
  }

  :deep(.van-tabbar-item__text) {
    font-size: 11px;
  }
}
</style>
