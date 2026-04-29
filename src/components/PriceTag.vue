<template>
  <div class="price-tag" :class="sizeClass">
    <span class="price-unit">¥</span>
    <span class="price-value">{{ formattedPrice }}</span>
    <span v-if="showOriginal && originalPrice" class="original-price">
      ¥{{ formatPrice(originalPrice) }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  price: {
    type: [Number, String],
    default: 0
  },
  originalPrice: {
    type: [Number, String],
    default: null
  },
  size: {
    type: String,
    default: 'md'
  },
  showOriginal: {
    type: Boolean,
    default: true
  }
})

const formatPrice = (value) => {
  const num = Number(value)
  return num.toLocaleString('zh-CN')
}

const formattedPrice = computed(() => formatPrice(props.price))

const sizeClass = computed(() => {
  return `size-${props.size}`
})
</script>

<style lang="less" scoped>
.price-tag {
  display: flex;
  align-items: baseline;
  color: #D4AF37;

  .price-unit {
    font-size: 12px;
    font-weight: 500;
    margin-right: 2px;
  }

  .price-value {
    font-size: 18px;
    font-weight: 600;
  }

  .original-price {
    font-size: 12px;
    color: #999999;
    text-decoration: line-through;
    margin-left: 8px;
  }

  &.size-sm {
    .price-unit {
      font-size: 10px;
    }
    .price-value {
      font-size: 14px;
    }
  }

  &.size-lg {
    .price-unit {
      font-size: 14px;
    }
    .price-value {
      font-size: 24px;
    }
  }

  &.size-xl {
    .price-unit {
      font-size: 16px;
    }
    .price-value {
      font-size: 32px;
      font-weight: 700;
    }
  }
}
</style>
