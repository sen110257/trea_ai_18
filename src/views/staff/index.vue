<template>
  <div class="staff-page page-container-no-tabbar">
    <PageHeader title="专业人员" />

    <div class="staff-content">
      <div class="filter-section">
        <van-tabs v-model:active="activeTab" :color="tabbarActiveColor" line-width="30">
          <van-tab title="全部">
            <div class="staff-list" v-if="displayStaff.length > 0">
              <div
                class="staff-card"
                v-for="staff in displayStaff"
                :key="staff.id"
                @click="goToDetail(staff.id)"
              >
                <div class="staff-avatar-wrapper">
                  <van-image
                    :src="staff.avatar"
                    class="staff-avatar"
                    fit="cover"
                    lazy-load
                  />
                  <div class="role-badge">
                    {{ staff.role }}
                  </div>
                </div>
                <div class="staff-info">
                  <div class="staff-header">
                    <h3 class="staff-name">{{ staff.name }}</h3>
                    <div class="favorite-btn" @click.stop="toggleFavorite(staff)">
                      <van-icon :name="isFavorited(staff.id) ? 'star' : 'star-o'" size="18" :color="isFavorited(staff.id) ? '#D4AF37' : '#CCCCCC'" />
                    </div>
                  </div>
                  <div class="staff-meta">
                    <div class="meta-item">
                      <van-icon name="clock-o" size="12" color="#999999" />
                      <span>{{ staff.experience }}年经验</span>
                    </div>
                    <div class="meta-item">
                      <van-rate v-model="staff.rating" color="#D4AF37" void-color="#E5E5E5" :size="12" readonly />
                      <span>{{ staff.rating }}</span>
                    </div>
                  </div>
                  <div class="staff-styles">
                    <van-tag type="primary" plain size="mini" v-for="style in staff.style.slice(0, 3)" :key="style">
                      {{ style }}
                    </van-tag>
                  </div>
                  <div class="staff-footer">
                    <div class="price-section">
                      <span class="price-unit">¥</span>
                      <span class="price-value">{{ staff.price }}</span>
                      <span class="price-unit">/场</span>
                    </div>
                    <div class="review-count">
                      {{ staff.reviewCount }}条评价
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <van-empty v-else description="暂无人员" />
          </van-tab>
          <van-tab title="司仪">
            <div class="staff-list" v-if="mcStaff.length > 0">
              <div
                class="staff-card"
                v-for="staff in mcStaff"
                :key="staff.id"
                @click="goToDetail(staff.id)"
              >
                <van-image
                  :src="staff.avatar"
                  class="staff-avatar"
                  fit="cover"
                  lazy-load
                />
                <div class="staff-info">
                  <h3 class="staff-name">{{ staff.name }}</h3>
                  <div class="staff-meta">
                    <span>{{ staff.experience }}年经验</span>
                    <span>评分{{ staff.rating }}</span>
                  </div>
                  <div class="price-section">
                    <span class="price-unit">¥</span>
                    <span class="price-value">{{ staff.price }}</span>
                  </div>
                </div>
              </div>
            </div>
            <van-empty v-else description="暂无司仪" />
          </van-tab>
          <van-tab title="化妆">
            <div class="staff-list" v-if="makeupStaff.length > 0">
              <div
                class="staff-card"
                v-for="staff in makeupStaff"
                :key="staff.id"
                @click="goToDetail(staff.id)"
              >
                <van-image
                  :src="staff.avatar"
                  class="staff-avatar"
                  fit="cover"
                  lazy-load
                />
                <div class="staff-info">
                  <h3 class="staff-name">{{ staff.name }}</h3>
                  <div class="staff-meta">
                    <span>{{ staff.experience }}年经验</span>
                    <span>评分{{ staff.rating }}</span>
                  </div>
                  <div class="price-section">
                    <span class="price-unit">¥</span>
                    <span class="price-value">{{ staff.price }}</span>
                  </div>
                </div>
              </div>
            </div>
            <van-empty v-else description="暂无化妆师" />
          </van-tab>
          <van-tab title="摄影">
            <div class="staff-list" v-if="photoStaff.length > 0">
              <div
                class="staff-card"
                v-for="staff in photoStaff"
                :key="staff.id"
                @click="goToDetail(staff.id)"
              >
                <van-image
                  :src="staff.avatar"
                  class="staff-avatar"
                  fit="cover"
                  lazy-load
                />
                <div class="staff-info">
                  <h3 class="staff-name">{{ staff.name }}</h3>
                  <div class="staff-meta">
                    <span>{{ staff.experience }}年经验</span>
                    <span>评分{{ staff.rating }}</span>
                  </div>
                  <div class="price-section">
                    <span class="price-unit">¥</span>
                    <span class="price-value">{{ staff.price }}</span>
                  </div>
                </div>
              </div>
            </div>
            <van-empty v-else description="暂无摄影师" />
          </van-tab>
          <van-tab title="摄像">
            <div class="staff-list" v-if="videoStaff.length > 0">
              <div
                class="staff-card"
                v-for="staff in videoStaff"
                :key="staff.id"
                @click="goToDetail(staff.id)"
              >
                <van-image
                  :src="staff.avatar"
                  class="staff-avatar"
                  fit="cover"
                  lazy-load
                />
                <div class="staff-info">
                  <h3 class="staff-name">{{ staff.name }}</h3>
                  <div class="staff-meta">
                    <span>{{ staff.experience }}年经验</span>
                    <span>评分{{ staff.rating }}</span>
                  </div>
                  <div class="price-section">
                    <span class="price-unit">¥</span>
                    <span class="price-value">{{ staff.price }}</span>
                  </div>
                </div>
              </div>
            </div>
            <van-empty v-else description="暂无摄像师" />
          </van-tab>
        </van-tabs>
      </div>

      <div class="tips-section">
        <div class="tips-header">
          <van-icon name="info-o" size="16" color="#D4AF37" />
          <span class="tips-title">预约须知</span>
        </div>
        <ul class="tips-list">
          <li>• 建议提前1-3个月预约，确保心仪人员档期</li>
          <li>• 点击人员卡片可查看详细资料和作品集</li>
          <li>• 可收藏心仪人员，方便后续预约</li>
          <li>• 预约成功后不可取消，如需改期请联系客服</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast } from 'vant'
import PageHeader from '@/components/PageHeader.vue'
import { professionalStaff } from '@/mock/data.js'
import { useFavoritesStore } from '@/store/favorites.js'

const router = useRouter()
const favoritesStore = useFavoritesStore()

const tabbarActiveColor = '#D4AF37'
const activeTab = ref(0)

const displayStaff = computed(() => professionalStaff)
const mcStaff = computed(() => professionalStaff.filter(s => s.roleType === 'mc'))
const makeupStaff = computed(() => professionalStaff.filter(s => s.roleType === 'makeup'))
const photoStaff = computed(() => professionalStaff.filter(s => s.roleType === 'photography'))
const videoStaff = computed(() => professionalStaff.filter(s => s.roleType === 'videography'))

const isFavorited = (id) => {
  return favoritesStore.isStaffFavorited(id)
}

const goToDetail = (id) => {
  router.push(`/staff-detail/${id}`)
}

const toggleFavorite = (staff) => {
  const added = favoritesStore.toggleStaff(staff)
  showSuccessToast(added ? '已添加到收藏' : '已取消收藏')
}
</script>

<style lang="less" scoped>
.staff-page {
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
  min-height: 100vh;
}

.staff-content {
  padding-bottom: 20px;
}

.filter-section {
  background: #FFFFFF;

  :deep(.van-tab) {
    font-size: 13px;
    color: #666666;
  }

  :deep(.van-tab--active) {
    color: #D4AF37;
    font-weight: 600;
  }

  :deep(.van-tabs__line) {
    background: linear-gradient(90deg, #D4AF37, #F5E6C8);
    border-radius: 2px;
  }
}

.staff-list {
  padding: 12px 16px;
}

.staff-card {
  display: flex;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
  }

  .staff-avatar-wrapper {
    position: relative;
    width: 80px;
    height: 80px;
    flex-shrink: 0;

    .staff-avatar {
      width: 100%;
      height: 100%;
      border-radius: 12px;
    }

    .role-badge {
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #D4AF37, #F5E6C8);
      color: #FFFFFF;
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 10px;
      white-space: nowrap;
    }
  }

  .staff-info {
    flex: 1;
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .staff-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .staff-name {
        font-size: 16px;
        font-weight: 600;
        color: #333333;
        margin: 0;
      }

      .favorite-btn {
        padding: 4px;
      }
    }

    .staff-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 4px;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: #999999;
      }
    }

    .staff-styles {
      display: flex;
      gap: 6px;
      margin-top: 6px;
    }

    .staff-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 6px;

      .price-section {
        display: flex;
        align-items: baseline;

        .price-unit {
          font-size: 12px;
          color: #D4AF37;
        }

        .price-value {
          font-size: 18px;
          font-weight: 600;
          color: #D4AF37;
        }
      }

      .review-count {
        font-size: 12px;
        color: #999999;
      }
    }
  }
}

.tips-section {
  margin: 0 16px;
  padding: 16px;
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .tips-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;

    .tips-title {
      font-size: 14px;
      font-weight: 600;
      color: #333333;
    }
  }

  .tips-list {
    margin: 0;
    padding-left: 0;
    list-style: none;

    li {
      font-size: 12px;
      color: #666666;
      line-height: 1.8;
      margin-bottom: 4px;
    }
  }
}
</style>
