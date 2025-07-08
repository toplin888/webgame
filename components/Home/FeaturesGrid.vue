<!-- components/FeatureCards.vue -->
<template>
  <section class="feature-cards-section position-relative py-5 text-white">
    <!-- 区块底图 -->
    <div class="bg-svg"></div>

    <div class="container position-relative">
      <!-- 上半区：大标题 + 副标题 -->
      <div class="row mb-5 align-items-center">
        <div class="col-lg-8">
          <h2 class="main-title">
            {{ t('features.title') }}123123
          </h2>
        </div>
        <div class="col-lg-4 text-lg-end">
          <p class="sub-title">
            {{ t('features.desc') }}123132
          </p>
        </div>
      </div>

      <!-- 下半区：卡片网格 -->
      <div class="row gx-4 gy-4">
        <div v-for="(feature, index) in featuresItems" :key="feature.id" class="col-12 col-md-6 col-lg-4">
          <div class="card feature-card h-100">
            <!-- 图标 -->
            <div class="icon-wrapper mb-3">
              <UIcon class="w-[32px] h-[32px]" :name="`i-custom-feature${(index % 5) + 1}`" />
            </div>
            <!-- 标题 -->
            <h3 class="card-title mb-2">{{ feature.title }}123213</h3>
            <!-- 描述 -->
            <p class="card-desc mb-4">{{ feature.content }}123123123</p>
            <!-- 底部链接 / 复制逻辑已注释，如需可自行放开 -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface LocalFeature {
  id: number
  sort: number
  title: string
  content: string
}

const featuresItems = computed<LocalFeature[]>(() => [
  { id: 1, sort: 1, title: t('features.item1.title'), content: t('features.item1.content') },
  { id: 2, sort: 2, title: t('features.item2.title'), content: t('features.item2.content') },
  { id: 3, sort: 3, title: t('features.item3.title'), content: t('features.item3.content') },
  { id: 4, sort: 4, title: t('features.item4.title'), content: t('features.item4.content') },
  { id: 5, sort: 5, title: t('features.item5.title'), content: t('features.item5.content') }
])
</script>

<style scoped lang="scss">
.feature-cards-section {
  position: relative;
  overflow: hidden;
  background: #000;
  /* fallback */
  color: #fff;
  padding-top: 6rem;

  .bg-svg {
    position: absolute;
    inset: 0;
    background: url('~/assets/images/features-bg.svg') center/cover no-repeat;
    z-index: 0;
  }

  .container {
    position: relative;
    z-index: 1;
  }

  .main-title {
    font-family: "Inter-Medium", sans-serif;
    font-size: 3.47269rem;
    font-weight: 500;
    line-height: 3.85rem;
    letter-spacing: -0.07rem;
    background: linear-gradient(282deg, #6A82FC 24%, #FFECE0 47%, #FFF 78%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .sub-title {
    color: rgba(255, 255, 255, 0.80);
    font-family: "Inter-Regular", sans-serif;
    font-size: 0.97656rem;
    text-align: left;
    font-weight: 400;
    line-height: 1.4rem;
  }

  .feature-card {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    transition: border-color 0.2s;
    border-radius: 0.625rem;
    border: 1px solid #4f4f50;
    background: linear-gradient(180deg, rgba(26, 23, 38, 0.1) 0%, #1a1726 100%);

    &:hover {
      border-color: #59baff;
    }

    .icon-wrapper {
      width: 32px;
      height: 32px;
    }

    .card-title {
      color: #fff;
      font-family: "Inter-Medium", sans-serif;
      font-size: 1rem;
      line-height: 1.3rem;
    }

    .card-desc {
      font-family: "Inter-Regular", sans-serif;
      color: rgba(255, 255, 255, 0.80);
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }
}
</style>
