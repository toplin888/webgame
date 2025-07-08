<template>
    <main id="plan7">
        <section class="relative md:p-[110px] ">
            <!-- 2行3列 -->
            <div class="relative">
                <div class="grid grid-cols-5 gap-[70px] max-w-[1118px] mx-auto mt-[50px]">
                    <div class="flex justify-center" v-for="(item, index) in chainsTag" :key="item.title">
                        <div class="partner-container mb-5">
                            <img class="partner-image transition-transform duration-300" :src="item.image"
                                :alt="item.title" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup lang="ts">
import partner1 from '~/assets/images/partners/1.png';
import partner2 from '~/assets/images/partners/2.png';
import partner3 from '~/assets/images/partners/3.png';
import partner4 from '~/assets/images/partners/4.png';
import partner5 from '~/assets/images/partners/5.png';
import partner6 from '~/assets/images/partners/6.png';
import partner7 from '~/assets/images/partners/7.png';
import partner8 from '~/assets/images/partners/8.png';
import partner9 from '~/assets/images/partners/9.png';
import partner10 from '~/assets/images/partners/10.png';
const chainsTag = ref([
    {
        icon: '',
        title: 'Transparent rules',
        desc: 'Using web3.0 technology, the game rules are written into the smart contract, and the game process is open and transparent.',
        image: partner1,
        url: 'https://example.com/transparent-rules'
    },
    {
        title: 'Smart contract:',
        desc: 'Advanced security for digital asset protection.',
        image: partner2,
        url: 'https://example.com/smart-contract'
    },
    {
        title: 'RNG random algorithm',
        desc: 'Advanced security for digital asset protection.',
        image: partner3,
        url: 'https://example.com/rng-algorithm'
    },
    {
        title: 'Buy back and destroy',
        desc: 'Advanced security for digital asset protection.',
        image: partner4,
        url: 'https://example.com/buy-back'
    },
    {
        title: 'DAO',
        desc: 'Advanced security for digital asset protection.',
        image: partner5,
        url: 'https://example.com/dao'
    },
    {
        title: 'DAO2',
        desc: 'Advanced security for digital asset protection.',
        image: partner6,
        url: 'https://example.com/dao2'
    },
    {
        title: 'DAO3',
        desc: 'Advanced security for digital asset protection.',
        image: partner7,
        url: 'https://example.com/dao3'
    },
    {
        title: 'DAO4',
        desc: 'Advanced security for digital asset protection.',
        image: partner8,
        url: 'https://example.com/dao4'
    },
    {
        title: 'DAO5',
        desc: 'Advanced security for digital asset protection.',
        image: partner9,
        url: 'https://example.com/dao5'
    },
    {
        title: 'DAO6',
        desc: 'Advanced security for digital asset protection.',
        image: partner10,
        url: 'https://example.com/dao6'
    }
]);

</script>
<style scoped>
.line-bg {
    z-index: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    background: url('~/assets/images/features-bg.svg') no-repeat center center;
}

/* 新增样式 */
.partner-container {
    /* 固定尺寸的容器，根据您的图片实际尺寸调整 */
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    /* 允许内容在悬停时超出容器 */
    position: relative;
}

.partner-image {
    /* 保持图片原始尺寸 */
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transform-origin: center;
    z-index: 1;
}

.partner-container:hover .partner-image {
    transform: scale(1.2);
    /* 悬停时放大 */
    z-index: 10;
    /* 确保放大的图片显示在其他元素上方 */
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
    /* 可选：添加光晕效果 */
}
</style>