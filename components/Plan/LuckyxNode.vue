<template>
    <main class="max-w-[1200px] m-auto">
        <section class="relative pb-[110px]">
            <div class="relative">
                <div class="flex justify-center">
                    <div
                        class="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-500 font-medium text-[55px] max-w-[1000px] text-center">
                        {{ $t('plan.luckyTitle') }}
                    </div>
                </div>
                <div class="flex justify-center relative pt-[25px] gap-[130px]">
                    <div class="flex relative w-96 h-80">
                        <div
                            class="w-96 h-80 bg-[radial-gradient(ellipse_53.61%_29.47%_at_13.52%_10.21%,_#241C36_0%,_#0C0512_100%)] rounded-3xl absolute right-[-70px] scale-80">
                            <span class="absolute inset-0 rounded-3xl p-[2px] plan-gradient-border"></span>
                        </div>
                        <div
                            class="w-96 h-80 bg-[radial-gradient(ellipse_53.61%_29.47%_at_13.52%_10.21%,_#241C36_0%,_#0C0512_100%)] rounded-3xl absolute right-[-35px] scale-90">
                            <span class="absolute inset-0 rounded-3xl p-[2px] plan-gradient-border"></span>
                        </div>
                        <div v-for="(item, index) in nftLists" :key="item.id"
                            class="w-96 h-80 bg-[radial-gradient(ellipse_53.61%_29.47%_at_13.52%_10.21%,_#241C36_0%,_#0C0512_100%)] rounded-3xl absolute flex items-center justify-center">
                            <!-- <NuxtImg class="max-w-96 max-h-80 object-cover w-full rounded-3xl" loading="eager"
                                fetchpriority="high" width="80" height="80" :src="`/images/plan/${item.image}`"
                                alt="" /> -->
                            <NuxtImg :src="`/images/plan/${item.image}`" alt="" />
                            <span class="absolute inset-0 rounded-3xl p-[2px] plan-gradient-border"></span>
                        </div>
                    </div>
                    <div class="w-[550px] flex flex-col justify-center">
                        <div class="text-#9893B8 text-xl mb-[25px]">{{ currentData.num + '.' }}</div>
                        <div class="text-white text-3xl font-medium mb-[14px]">{{ currentData.title }}</div>
                        <div class="text-slate-400 text-base mb-[43px]">{{ currentData.description }}</div>
                        <div>
                            <UButton color="lucky" class="text-white/90 text-sm p-[16px_20px] rounded-xl"
                                @click="openBlock(currentData)">
                                {{ currentData.btnText }}
                            </UButton>
                        </div>

                    </div>
                    <!-- <NuxtImg src="/images/plan/report.svg" alt="Report"
                        class="max-h-[524px] max-w-[1200px] object-cover w-full" loading="eager" fetchpriority="high" /> -->
                </div>
                <div class="flex flex-col items-center relative pt-[100px] ">
                    <div class="gradient-progress-bar mb-[40px] w-full max-w-[1200px]">
                        <div class="bar-bg">
                            <div class="bar-fg" :style="{
                                width: progress + '%',
                                background: 'linear-gradient(90deg, #983AD6 0%, #681EE0 80%, #fff 100%)'
                            }"></div>
                        </div>
                    </div>
                    <div class="flex justify-between w-full">
                        <div v-for="(item, index) in nftLists" :key="item.id" @click="selectTag(item, index)"
                            class="flex flex-col hover:bg-white/30 p-4 rounded-lg transition-colors cursor-pointer">
                            <div class="text-slate-400 text-base font-['Poppins']">{{ item.num + '.' }}</div>
                            <div class="text-2xl font-['Poppins']">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

</template>
<script setup lang="ts">
import { ref } from 'vue'



const nftLists = [
    {
        id: 1,
        num: '01',
        name: 'Buy NFT',
        image: 'nft1.png',
        btnText: 'Go Buy',
        title: 'Buy Partner NFT',
        description: 'Go to the trading market and buy any partner nft',
    },
    {
        id: 2,
        num: '02',
        name: 'Enable proxy',
        image: 'nft1.png',
        btnText: 'Open',
        title: 'Open Enable proxy',
        description: 'Go to Enable proxy',
    },
    {
        id: 3,
        num: '03',
        name: 'Investment ratio',
        image: 'nft1.png',
        btnText: 'Set',
        title: 'Set Investment ratio',
        description: 'Go to Set your investment ratio',
    },
    {
        id: 4,
        num: '04',
        name: 'Share your game',
        image: 'nft1.png',
        btnText: 'Share',
        title: 'Share your game',
        description: 'Go to Share your game',
    },
    // Add more NFTs as needed
]
const currentData = ref(nftLists[0])

const progress = ref(45)

const openBlock = (data: any) => {
    // Handle the click event to open the corresponding block
    console.log('Opening block for:', data);
    // You can implement your logic here, such as navigating to a new page or showing a modal
    // For example, you might use $router.push('/path-to-block');
}

const selectTag = (item: any, index: number) => {
    currentData.value = item
    progress.value = (index + 1) * 25 // Update progress based on the selected item
}
</script>

<style scoped lang="scss">
.line-bg {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, 0);
    background: url('~/assets/images/economy-bg.png') no-repeat center center;
}

.gradient-progress-bar {
    width: 100%;

    .bar-bg {
        width: 100%;
        height: 2px;
        background: #555555;
        border-radius: 1px;
        overflow: hidden;
        position: relative;
    }

    .bar-fg {
        height: 2px;
        border-radius: 1px;
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
}

.plan-gradient-border {
    background: linear-gradient(180deg, rgba(48, 48, 48, 0.2) 0%, rgba(64, 43, 117, 0.37) 25%, rgba(108, 73, 196, 0.37) 50%, rgba(228, 150, 255, 1) 75%, rgba(104, 30, 224, 1) 100%);
    -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    box-sizing: border-box;
    z-index: 20;
    display: block;
    /* 标准属性兼容 */
    // mask:
    //     linear-gradient(#fff 0 0) content-box,
    //     linear-gradient(#fff 0 0);
}
</style>