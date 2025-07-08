<template>
    <main>
        <section class="relative md:p-[110px] ">
            <div class="line-bg"></div>
            <div class="m-container">
                <div class="flex justify-center">
                    <div
                        class="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-500 font-bold text-[50px] max-w-[979px] text-center">
                        {{ $t('home.chainTransparentTitle') }}
                    </div>
                </div>
                <div class="flex justify-center relative">
                    <div>{{ $t('home.chainTransparentDesc') }}</div>
                </div>
            </div>
            <!-- 2行3列 -->
            <div class="relative">
                <div class="grid grid-cols-3 gap-[30px] max-w-[1118px] mx-auto mt-[50px]">
                    <div class="ring-1 ring-purple-500/20 rounded-[20px] p-[50px_28px_46px]"
                        v-for="(item, index) in chainsTag" :key="item.title">
                        <div class="mb-5">
                            <UIcon :name="`i-custom-feature${index + 1}`" class="w-[28px] h-[28px]" />
                        </div>
                        <div class="text-[24px] font-bold mb-[10px]">{{ $t(`home.chainTitle${index + 1}`) }}</div>
                        <div class="text-[16px]">{{ $t(`home.chainDesc${index + 1}`) }}</div>
                    </div>

                </div>
            </div>
        </section>
    </main>
</template>
<script setup lang="ts">
const chainsTag = ref([
    { icon: '', title: 'Transparent rules', desc: 'Using web3.0 technology, the game rules are written into the smart contract, and the game process is open and transparent.' },
    { title: 'Smart contract:', desc: 'Advanced security for digital asset protection.' },
    { title: 'RNG random algorithm', desc: 'Advanced security for digital asset protection.' },
    { title: 'Buy back and destroy', desc: 'Advanced security for digital asset protection.' },
    { title: 'DAO', desc: 'Advanced security for digital asset protection.' }
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
</style>