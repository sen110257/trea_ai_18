import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePackageStore = defineStore('package', () => {
  const selectedItems = ref([])
  const customPrice = ref(0)

  const totalPrice = computed(() => {
    return selectedItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0) + customPrice.value
  })

  const addItem = (item) => {
    const index = selectedItems.value.findIndex(i => i.id === item.id)
    if (index > -1) {
      selectedItems.value[index].quantity++
    } else {
      selectedItems.value.push({ ...item, quantity: 1 })
    }
  }

  const removeItem = (itemId) => {
    const index = selectedItems.value.findIndex(i => i.id === itemId)
    if (index > -1) {
      if (selectedItems.value[index].quantity > 1) {
        selectedItems.value[index].quantity--
      } else {
        selectedItems.value.splice(index, 1)
      }
    }
  }

  const toggleItem = (item) => {
    const index = selectedItems.value.findIndex(i => i.id === item.id)
    if (index > -1) {
      selectedItems.value.splice(index, 1)
      return false
    } else {
      selectedItems.value.push({ ...item, quantity: 1 })
      return true
    }
  }

  const setCustomPrice = (price) => {
    customPrice.value = price
  }

  const clearSelection = () => {
    selectedItems.value = []
    customPrice.value = 0
  }

  const isItemSelected = (itemId) => {
    return selectedItems.value.some(i => i.id === itemId)
  }

  return {
    selectedItems,
    customPrice,
    totalPrice,
    addItem,
    removeItem,
    toggleItem,
    setCustomPrice,
    clearSelection,
    isItemSelected
  }
})
