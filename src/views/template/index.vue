<template>
  <div class="template-page page-container">
    <div class="page-header-section">
      <PageHeader title="婚礼风格模板" :show-back="false">
        <template #right>
          <van-icon name="search" size="20" color="#666666" />
        </template>
      </PageHeader>
      <div class="filter-tabs">
        <van-tabs v-model:active="activeTab" :color="tabbarActiveColor" line-width="40">
          <van-tab title="全部">
            <div class="template-grid" v-if="filteredTemplates.length > 0">
              <div
                class="template-item"
                v-for="template in filteredTemplates"
                :key="template.id"
                @click="goToDetail(template.id)"
              >
                <van-image
                  :src="template.image"
                  class="template-img"
                  fit="cover"
                  lazy-load
                />
                <div class="template-label">
                  <van-tag type="primary" size="mini" plain>
                    {{ template.nameEn }}
                  </van-tag>
                </div>
                <div class="template-info">
                  <div class="template-name">{{ template.name }}</div>
                  <div class="template-desc">{{ template.description }}</div>
                  <div class="template-footer">
                    <PriceTag :price="template.price" :original-price="template.originalPrice" size="sm" />
                    <div class="tags-row">
                      <van-tag type="primary" plain size="mini" v-for="tag in template.tags.slice(0, 2)" :key="tag">
                        {{ tag }}
                      </van-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <van-empty v-else description="暂无模板" />
          </van-tab>
          <van-tab title="中式">
            <div class="template-grid" v-if="chineseTemplates.length > 0">
              <div
                class="template-item"
                v-for="template in chineseTemplates"
                :key="template.id"
                @click="goToDetail(template.id)"
              >
                <van-image
                  :src="template.image"
                  class="template-img"
                  fit="cover"
                  lazy-load
                />
                <div class="template-info">
                  <div class="template-name">{{ template.name }}</div>
                  <PriceTag :price="template.price" :original-price="template.originalPrice" size="sm" />
                </div>
              </div>
            </div>
            <van-empty v-else description="暂无模板" />
          </van-tab>
          <van-tab title="西式">
            <div class="template-grid" v-if="westernTemplates.length > 0">
              <div
                class="template-item"
                v-for="template in westernTemplates"
                :key="template.id"
                @click="goToDetail(template.id)"
              >
                <van-image
                  :src="template.image"
                  class="template-img"
                  fit="cover"
                  lazy-load
                />
                <div class="template-info">
                  <div class="template-name">{{ template.name }}</div>
                  <PriceTag :price="template.price" :original-price="template.originalPrice" size="sm" />
                </div>
              </div>
            </div>
            <van-empty v-else description="暂无模板" />
          </van-tab>
          <van-tab title="森系">
            <div class="template-grid" v-if="forestTemplates.length > 0">
              <div
                class="template-item"
                v-for="template in forestTemplates"
                :key="template.id"
                @click="goToDetail(template.id)"
              >
                <van-image
                  :src="template.image"
                  class="template-img"
                  fit="cover"
                  lazy-load
                />
                <div class="template-info">
                  <div class="template-name">{{ template.name }}</div>
                  <PriceTag :price="template.price" :original-price="template.originalPrice" size="sm" />
                </div>
              </div>
            </div>
            <van-empty v-else description="暂无模板" />
          </van-tab>
          <van-tab title="复古">
            <div class="template-grid" v-if="vintageTemplates.length > 0">
              <div
                class="template-item"
                v-for="template in vintageTemplates"
                :key="template.id"
                @click="goToDetail(template.id)"
              >
                <van-image
                  :src="template.image"
                  class="template-img"
                  fit="cover"
                  lazy-load
                />
                <div class="template-info">
                  <div class="template-name">{{ template.name }}</div>
                  <PriceTag :price="template.price" :original-price="template.originalPrice" size="sm" />
                </div>
              </div>
            </div>
            <van-empty v-else description="暂无模板" />
          </van-tab>
          <van-tab title="极简">
            <div class="template-grid" v-if="minimalTemplates.length > 0">
              <div
                class="template-item"
                v-for="template in minimalTemplates"
                :key="template.id"
                @click="goToDetail(template.id)"
              >
                <van-image
                  :src="template.image"
                  class="template-img"
                  fit="cover"
                  lazy-load
                />
                <div class="template-info">
                  <div class="template-name">{{ template.name }}</div>
                  <PriceTag :price="template.price" :original-price="template.originalPrice" size="sm" />
                </div>
              </div>
            </div>
            <van-empty v-else description="暂无模板" />
          </van-tab>
          <van-tab title="户外">
            <div class="template-grid" v-if="outdoorTemplates.length > 0">
              <div
                class="template-item"
                v-for="template in outdoorTemplates"
                :key="template.id"
                @click="goToDetail(template.id)"
              >
                <van-image
                  :src="template.image"
                  class="template-img"
                  fit="cover"
                  lazy-load
                />
                <div class="template-info">
                  <div class="template-name">{{ template.name }}</div>
                  <PriceTag :price="template.price" :original-price="template.originalPrice" size="sm" />
                </div>
              </div>
            </div>
            <van-empty v-else description="暂无模板" />
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import PriceTag from '@/components/PriceTag.vue'
import { weddingTemplates } from '@/mock/data.js'

const router = useRouter()
const tabbarActiveColor = '#D4AF37'
const activeTab = ref(0)

const filteredTemplates = computed(() => weddingTemplates)
const chineseTemplates = computed(() => weddingTemplates.filter(t => t.style === 'chinese'))
const westernTemplates = computed(() => weddingTemplates.filter(t => t.style === 'western'))
const forestTemplates = computed(() => weddingTemplates.filter(t => t.style === 'forest'))
const vintageTemplates = computed(() => weddingTemplates.filter(t => t.style === 'vintage'))
const minimalTemplates = computed(() => weddingTemplates.filter(t => t.style === 'minimal'))
const outdoorTemplates = computed(() => weddingTemplates.filter(t => t.style === 'outdoor'))

const goToDetail = (id) => {
  router.push(`/template-detail/${id}`)
}
</script>

<style lang="less" scoped>
.template-page {
  background: linear-gradient(180deg, #FDF8F0 0%, #FFFFFF 100%);
  min-height: 100vh;
  padding-bottom: calc(50px + env(safe-area-inset-bottom));
}

.page-header-section {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #FFFFFF;
}

.filter-tabs {
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

.template-grid {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.template-item {
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  position: relative;
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.96);
  }

  .template-img {
    width: 100%;
    height: 140px;
  }

  .template-label {
    position: absolute;
    top: 8px;
    left: 8px;
  }

  .template-info {
    padding: 10px;

    .template-name {
      font-size: 14px;
      font-weight: 600;
      color: #333333;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .template-desc {
      font-size: 11px;
      color: #999999;
      margin-bottom: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .template-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .tags-row {
        display: flex;
        gap: 4px;
      }
    }
  }
}
</style>
