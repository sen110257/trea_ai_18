<template>
  <div class="elegant-card" @click="handleClick">
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style lang="less" scoped>
.elegant-card {
  background: #FFFFFF;
  border-radius: 12px;
  margin: 16px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #D4AF37, #F5E6C8, #D4AF37);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:active {
    transform: scale(0.98);

    &::before {
      opacity: 1;
    }
  }

  .card-content {
    width: 100%;
  }
}
</style>
