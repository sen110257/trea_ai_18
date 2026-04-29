<template>
  <div class="favorites-page page-container-no-tabbar">
    <PageHeader title="我的收藏" />

    <div class="tabs-section">
      <van-tabs v-model:active="activeTab" :color="tabbarActiveColor" line-width="30">
        <van-tab title="全部">
          <div class="favorites-list" v-if="allFavorites.length > 0">
            <div class="favorite-card" v-for="item in allFavorites" :key="item.id">
              <!-- 收藏内容 -->
            </div>
          </div>
          <van-empty v-else description="暂无收藏" />
        </van-tab>
        <van-tab title="婚礼模板">
          <div class="favorites-list" v-if="templateFavorites.length > 0">
            <div
              class="favorite-card"
              v-for="item in templateFavorites"
              :key="item.id"
              @click="goToTemplateDetail(item.id)"
            >
              <van-image
                :src="item.image"
                class="favorite-image"
                fit="cover"
                lazy-load
              />
              <div class="favorite-info">
                <h4 class="favorite-name">{{ item.name }}</h4>
                <p class="favorite-desc">{{ item.description }}</p>
                <div class="favorite-footer">
                  <span class="favorite-price">¥{{ formatPrice(item.price) }}</span>
                  <van-icon
                    name="cross"
                    size="18"
                    color="#CCCCCC"
                    @click.stop="removeFavorite(item, 'template')"
                  />
                </div>
              </div>
            </div>
          </div>
          <van-empty v-else description="暂无收藏的婚礼模板" />
        </van-tab>
        <van-tab title="场地">
          <div class="favorites-list" v-if="venueFavorites.length > 0">
            <div
              class="favorite-card"
              v-for="item in venueFavorites"
              :key="item.id"
              @click="goToVenueDetail(item.id)"
            >
              <van-image
                :src="item.image"
                class="favorite-image"
                fit="cover"
                lazy-load
              />
              <div class="favorite-info">
                <h4 class="favorite-name">{{ item.name }}</h4>
                <p class="favorite-desc">{{ item.description }}</p>
                <div class="favorite-footer">
                  <span class="favorite-price">¥{{ item.pricePerTable }}/桌起</span>
                  <van-icon
                    name="cross"
                    size="18"
                    color="#CCCCCC"
                    @click.stop="removeFavorite(item, 'venue')"
                  />
                </div>
              </div>
            </div>
          </div>
          <van-empty v-else description="暂无收藏的场地" />
        </van-tab>
        <van-tab title="人员">
          <div class="favorites-list" v-if="staffFavorites.length > 0">
            <div
              class="favorite-card"
              v-for="item in staffFavorites"
              :key="item.id"
              @click="goToStaffDetail(item.id)"
            >
              <van-image
                :src="item.avatar"
                class="favorite-image"
                fit="cover"
                lazy-load
              />
              <div class="favorite-info">
                <h4 class="favorite-name">{{ item.name }}</h4>
                <p class="favorite-desc">{{ item.role }}</p>
                <div class="favorite-footer">
                  <span class="favorite-price">¥{{ item.price }}/场</span>
                  <van-icon
                    name="cross"
                    size="18"
                    color="#CCCCCC"
                    @click.stop="removeFavorite(item, 'staff')"
                  />
                </div>
              </div>
            </div>
          </div>
          <van-empty v-else description="暂无收藏的人员" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showDialog, showSuccessToast } from 'vant'
import PageHeader from '@/components/PageHeader.vue'
import { useFavoritesStore } from '@/store/favorites.js'

const router = useRouter()
const favoritesStore = useFavoritesStore()

const tabbarActiveColor = '#D4AF37'
const activeTab = ref(0)

const allFavorites = computed(() => favoritesStore.getAllFavorites())
const templateFavorites = computed(() => favoritesStore.favorites.templates)
const venueFavorites = computed(() => favoritesStore.favorites.venues)
const staffFavorites = computed(() => favoritesStore.favorites.staffs)

const formatPrice = (price) => {
  return Number(price).toLocaleString('zh-CN')
}

const goToTemplateDetail = (id) => {
  router.push(`/template-detail/${id}`)
}

const goToVenueDetail = (id) => {
  router.push(`/venue-detail/${id}`)
}

const goToStaffDetail = (id) => {
  router.push(`/staff-detail/${id}`)
}

const removeFavorite = (item, type) => {
  showDialog({
    title: '提示',
    message: '确定要取消收藏吗？',
    confirmButtonText: '确定取消',
    confirmButtonColor: '#FF4D4F'
  }).then(() => {
    if (type === 'template') {
      favoritesStore.toggleTemplate(item)
    } else if (type === 'venue') {
      favoritesStore.toggleVenue(item)
    } else if (type === 'staff') {
      favoritesStore.toggleStaff(item)
    }
    showSuccessToast('已取消收藏')
  }).catch(() => {
    // 用户取消
  })
}
</script>

<style lang="less" scoped>
.favorites-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
}

.tabs-section {
  background: #FFFFFF;
}

.favorites-list {
  padding: 12px;
}

.favorite-card {
  display: flex;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .favorite-image {
    width: 100px;
    height: 80px;
    border-radius: 8px;
    flex-shrink: 0;
  }

  .favorite-info {
    flex: 1;
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .favorite-name {
      font-size: 15px;
      font-weight: 600;
      color: #333333;
      margin: 0 0 4px;
    }

    .favorite-desc {
      font-size: 12px;
      color: #999999;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .favorite-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .favorite-price {
        font-size: 16px;
        font-weight: 600;
        color: #D4AF37;
      }
    }
  }
}
</style>
