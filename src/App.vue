<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <transition :name="transitionName" mode="out-in">
        <keep-alive :include="keepAliveComponents">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
    <app-tabbar v-if="showTabBar" />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppTabbar from './components/AppTabbar.vue'

const route = useRoute()
const transitionName = ref('fade')
const keepAliveComponents = computed(() => ['Home', 'Template', 'Service', 'Profile'])

const showTabBar = computed(() => {
  return route.meta?.showTabBar ?? false
})

watch(
  () => route.path,
  (to, from) => {
    const toDepth = to.split('/').length
    const fromDepth = from.split('/').length
    transitionName.value = toDepth > fromDepth ? 'slide-left' : 'slide-left'
  }
)
</script>

<style lang="less">
#app {
  width: 100%;
  min-height: 100vh;
  background: @elegant-gradient;
}
</style>
