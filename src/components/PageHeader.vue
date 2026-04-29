<template>
  <div class="page-header" :class="{ 'has-back': showBack }">
    <van-icon
      v-if="showBack"
      name="arrow-left"
      size="22"
      color="#333333"
      class="back-icon"
      @click="handleBack"
    />
    <div class="page-title" :class="{ 'centered': showBack }">{{ title }}</div>
    <slot name="right" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: '页面标题'
  },
  showBack: {
    type: Boolean,
    default: true
  }
})

const router = useRouter()

const handleBack = () => {
  router.back()
}
</script>

<style lang="less" scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  padding-top: calc(12px + env(safe-area-inset-top));
  background: #FFFFFF;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  min-height: 44px;

  &.has-back {
    justify-content: flex-start;
  }

  .back-icon {
    padding: 4px;
    margin-left: -4px;
    cursor: pointer;
  }

  .page-title {
    font-size: 17px;
    font-weight: 600;
    color: #333333;
    flex: 1;

    &.centered {
      text-align: center;
      margin-left: -22px;
    }
  }
}
</style>
