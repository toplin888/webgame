<template>
    <section class="py-12 relative max-w-[1112px] m-auto">

        <!-- 遮罩层 -->
        <div class="absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-black to-transparent"></div>
        <div class="absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-black to-transparent"></div>

        <!-- 第一行：使用UCarousel组件 -->
        <UCarousel v-model="activeSlide1" class="mb-8" v-slot="{ item, index }" loop :items="items" :ui="{
            container: 'gap-2',
            item: 'basis-1/3',
        }" :auto-scroll="{
            speed: 1,
            direction: 'forward',
        }" :count="3" :watchDrag="false">
            <div>
                <div class="testimonial-card max-w-[442px] max-h-[208px] min-h-[205px]">
                    <div class="flex items-center gap-3 mb-4">
                        <NuxtImg :src="item.avatar" size="lg" class="w-[40px] h-[40px]" />
                        <div class="flex-1">
                            <div class="text-[14px] font-bold text-white">{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="text-[15px] text-[#A8A8A8]">{{ item.text }}</div>
                </div>
            </div>
        </UCarousel>

        <UCarousel v-model="activeSlide2" class="mb-8" v-slot="{ item, index }" loop :items="items2" :ui="{
            container: 'gap-2',
            item: 'basis-1/3',
        }" :auto-scroll="{
            speed: 1,
            direction: 'backward',
        }" :count="3" :watchDrag="false">
            <div>
                <div class="testimonial-card max-w-[442px] max-h-[208px] min-h-[205px]">
                    <div class="flex items-center gap-3 mb-4">
                        <NuxtImg :src="item.avatar" size="lg" class="w-[40px] h-[40px]" />
                        <div class="flex-1">
                            <div class="text-[14px] font-bold text-white">{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="text-[15px] text-[#A8A8A8]">{{ item.text }}</div>
                </div>
            </div>
        </UCarousel>

        <!-- 纯原生写 -->
        <!-- <div class="custom-carousel relative mb-8 overflow-hidden">
            <div class="absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-black to-transparent"></div>
            <div class="absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-black to-transparent"></div>

            <div class="smooth-carousel">
                <div class="smooth-carousel-content">
                    <div v-for="(item, index) in items2" :key="`first-${index}`" class="carousel-item p-[0_8px]">
                        <div class="testimonial-card max-w-[442px] max-h-[208px] min-h-[205px]">
                            <div class="flex items-center gap-3 mb-4">
                                <img :src="item.avatar" class="w-[40px] h-[40px]" />
                                <div class="flex-1">
                                    <div class="text-[14px] font-bold text-white">{{ item.name }}</div>
                                </div>
                            </div>
                            <div class="text-[15px] text-[#A8A8A8]">{{ item.text }}</div>
                        </div>
                    </div>

                    <div v-for="(item, index) in items2" :key="`second-${index}`" class="carousel-item p-[0_8px]">
                        <div class="testimonial-card max-w-[442px] max-h-[208px] min-h-[205px]">
                            <div class="flex items-center gap-3 mb-4">
                                <img :src="item.avatar" class="w-[40px] h-[40px]" />
                                <div class="flex-1">
                                    <div class="text-[14px] font-bold text-white">{{ item.name }}</div>
                                </div>
                            </div>
                            <div class="text-[15px] text-[#A8A8A8]">{{ item.text }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <!-- 第三行：反向滚动优化版 -->
        <!-- <div class="custom-carousel relative mb-8 overflow-hidden">
            <div class="absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-black to-transparent"></div>
            <div class="absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-black to-transparent"></div>

            <div class="smooth-carousel">
                <div class="smooth-carousel-content reverse">
                    <div v-for="(item, index) in items2" :key="`first-reverse-${index}`"
                        class="carousel-item p-[0_8px]">
                        <div class="testimonial-card max-w-[442px] max-h-[208px] min-h-[205px]">
                            <div class="flex items-center gap-3 mb-4">
                                <img :src="item.avatar" class="w-[40px] h-[40px]" />
                                <div class="flex-1">
                                    <div class="text-[14px] font-bold text-white">{{ item.name }}</div>
                                </div>
                            </div>
                            <div class="text-[15px] text-[#A8A8A8]">{{ item.text }}</div>
                        </div>
                    </div>

                    <div v-for="(item, index) in items2" :key="`second-reverse-${index}`"
                        class="carousel-item p-[0_8px]">
                        <div class="testimonial-card max-w-[442px] max-h-[208px] min-h-[205px]">
                            <div class="flex items-center gap-3 mb-4">
                                <img :src="item.avatar" class="w-[40px] h-[40px]" />
                                <div class="flex-1">
                                    <div class="text-[14px] font-bold text-white">{{ item.name }}</div>
                                </div>
                            </div>
                            <div class="text-[15px] text-[#A8A8A8]">{{ item.text }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <!-- 第二行：反向滚动 -->
        <!-- <UCarousel v-model="activeSlide2" :items="items2" :ui="{
            container: 'gap-2',
            item: 'px-1',
            controls: 'hidden', // 隐藏控制
            dots: 'hidden',     // 隐藏指示点
        }" autoplay :interval="4000" :count="4" reverse>
            <template #item="{ item }">
                <div class="testimonial-card">
                    <div class="flex items-center gap-3 mb-4">
                        <UAvatar :src="item.avatar" size="lg" />
                        <div class="flex-1">
                            <div class="text-[14px] font-bold text-white">{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="text-[15px] text-[#A8A8A8]">{{ item.text }}</div>
                </div>
            </template>
</UCarousel> -->
    </section>
</template>

<script setup lang="ts">
import type { de } from '@nuxt/ui/runtime/locale/index.js'

// 数据定义保持不变
const items = ref([
    { avatar: '/images/ico/tx1.SVG', name: '0XMSS...HJUYI', text: 'By discovering game loopholes on the platform, I was able to earn extra income!' },
    { avatar: '/images/ico/tx2.SVG', name: 'DSD6S...CZCZA', text: 'I hope to open my game to LUCKYX, so that everyone can enjoy the fun of playing!' },
    { avatar: '/images/ico/tx3.SVG', name: 'CXCS0...DFCXC', text: 'LUCKYX has enabled me to monetize my private domain traffic, and I am willing to grow with the platform!' },
    { avatar: '/images/ico/tx4.SVG', name: '5EFED...ADQDD', text: 'In LUCKYX, my suggestions and ideas have been adopted. This is the real WEB3!' },
    { avatar: '/images/ico/tx5.SVG', name: '5DFDS...WEDCC', text: 'When I am bored, I always play a few games to kill time.' },
    { avatar: '/images/ico/tx1.SVG', name: 'CXVXC...FSDFFW', text: 'The annualized returns of the projects I invested in the LUCKYX platform are all above 50%!' },
    { avatar: '/images/ico/tx2.SVG', name: 'VCXV3...VCXVV', text: 'LUCKYX has enabled me to monetize my private domain traffic, and I am willing to grow with the platform!' },
    { avatar: '/images/ico/tx3.SVG', name: 'EWWDS...EWRFW', text: 'By discovering game loopholes on the platform, I was able to earn extra income!' },
    { avatar: '/images/ico/tx4.SVG', name: '3DCXZ...DSFWF', text: 'In LUCKYX, my suggestions and ideas have been adopted. This is the real WEB3!' },
    { avatar: '/images/ico/tx5.SVG', name: '8QWWD...VXCVV', text: 'I hope to open my game to LUCKYX, so that everyone can enjoy the fun of playing!' }
])

const items2 = ref([
    { avatar: '/images/ico/tx1.SVG', name: '0XMSS...HJUYI', text: 'By discovering game loopholes on the platform, I was able to earn extra income!' },
    { avatar: '/images/ico/tx2.SVG', name: 'DSD6S...CZCZA', text: 'I hope to open my game to LUCKYX, so that everyone can enjoy the fun of playing!' },
    { avatar: '/images/ico/tx3.SVG', name: 'CXCS0...DFCXC', text: 'LUCKYX has enabled me to monetize my private domain traffic, and I am willing to grow with the platform!' },
    { avatar: '/images/ico/tx4.SVG', name: '5EFED...ADQDD', text: 'In LUCKYX, my suggestions and ideas have been adopted. This is the real WEB3!' },
    { avatar: '/images/ico/tx5.SVG', name: '5DFDS...WEDCC', text: 'When I am bored, I always play a few games to kill time.' },
    { avatar: '/images/ico/tx1.SVG', name: 'CXVXC...FSDFFW', text: 'The annualized returns of the projects I invested in the LUCKYX platform are all above 50%!' },
    { avatar: '/images/ico/tx2.SVG', name: 'VCXV3...VCXVV', text: 'LUCKYX has enabled me to monetize my private domain traffic, and I am willing to grow with the platform!' },
    { avatar: '/images/ico/tx3.SVG', name: 'EWWDS...EWRFW', text: 'By discovering game loopholes on the platform, I was able to earn extra income!' },
    { avatar: '/images/ico/tx4.SVG', name: '3DCXZ...DSFWF', text: 'In LUCKYX, my suggestions and ideas have been adopted. This is the real WEB3!' },
    { avatar: '/images/ico/tx5.SVG', name: '8QWWD...VXCVV', text: 'I hope to open my game to LUCKYX, so that everyone can enjoy the fun of playing!' }
])

// 当前激活的幻灯片
const activeSlide1 = ref(0)
const activeSlide2 = ref(0)

// 原生轮播实现
const carouselTrack = ref<HTMLElement | null>(null)
const carouselContainer = ref<HTMLElement | null>(null)
let animationId: number | null = null

// 设置无限循环动画
function setupCarousel() {
    if (!carouselTrack.value) return

    const totalWidth = carouselTrack.value.scrollWidth / 2 // 除以2是因为我们复制了一组项目
    let currentPosition = 0

    // 创建动画函数
    function animate() {
        currentPosition -= 5 // 调整滚动速度

        // 当滚动到一半时（所有原始项目都滚过去了），重置位置到开头
        if (Math.abs(currentPosition) >= totalWidth) {
            currentPosition = 0
        }

        if (carouselTrack.value) {
            carouselTrack.value.style.transform = `translateX(${currentPosition}px)`
        }

        animationId = requestAnimationFrame(animate)
    }

    // 开始动画
    animationId = requestAnimationFrame(animate)
}

// 组件挂载时启动轮播
onMounted(() => {
    setupCarousel()
})

// 组件销毁前清理动画
onBeforeUnmount(() => {
    if (animationId !== null) {
        cancelAnimationFrame(animationId)
    }
})
</script>

<style scoped>
.testimonial-card {
    @apply relative flex-shrink-0 p-[22px] rounded-[14px] overflow-hidden;
    @apply bg-gradient-to-b from-[#222048] to-[#100C0A] border border-[#322F2E];
    position: relative;
}

.testimonial-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
        repeating-linear-gradient(to right,
            rgba(255, 255, 255, 0.03) 0 1px,
            transparent 1px 64px),
        repeating-linear-gradient(to bottom,
            rgba(255, 255, 255, 0.03) 0 1px,
            transparent 1px 64px);
    background-size: 40px 40px;
    z-index: 0;
    pointer-events: none;
}

.testimonial-card>* {
    position: relative;
    z-index: 1;
}

/* 自定义轮播样式 */
.custom-carousel {
    overflow: hidden;
}

/* 新增无缝滚动样式 */
.smooth-carousel {
    overflow: hidden;
    position: relative;
    width: 100%;
}

.smooth-carousel-content {
    display: flex;
    width: 200%;
    /* 两倍宽度 */
    animation: smoothScroll 25s linear infinite;
}

.smooth-carousel-content.reverse {
    animation: smoothScrollReverse 25s linear infinite;
}

.carousel-item {
    flex: 0 0 calc(100% / 6);
    /* 每行显示3项，总共6个 = 200%/6 */
    /* 添加间距 */
}

@keyframes smoothScroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
        /* 滚动一半的距离，即第一组的长度 */
    }
}

@keyframes smoothScrollReverse {
    0% {
        transform: translateX(-50%);
        /* 从第二组开始 */
    }

    100% {
        transform: translateX(0);
        /* 滚动到第一组的开始 */
    }
}
</style>