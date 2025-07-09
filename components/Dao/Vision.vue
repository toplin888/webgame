<template>
    <main>
        <div class="max-w-[976px] m-auto relative py-[24px_232px]">
            <div class="line-bg"></div>
            <div class="flex justify-center">
                <div
                    class="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-500 font-medium text-[55px]">
                    {{ $t('dao.visionTitle') }}
                </div>
            </div>
            <div class="flex justify-center relative text-[16px] mt-[14px]">
                <div>{{ $t('dao.visionDesc') }}</div>
            </div>
            <div class="">
                <div class="flex gap-[14px] mt-[73px]">
                    <div class="relative">
                        <div
                            class="flex flex-col justify-center items-center w-[365px] w-full relative z-10 p-[40px_10px] box-border">
                            <NuxtImg src="/images/vision/vision1.svg" alt="Vision 1" class="w-[173px]" />
                            <div class="text-20px font-bold mt-[14px]">{{ $t('dao.visionCardTitle1') }}</div>
                            <div class="text-[15px] text-white/80 mt-[12px]">{{ $t('dao.visionCardDesc1') }}</div>
                        </div>
                        <!-- <span class="pointer-events-none absolute inset-0 rounded-[10px] border-2
    [border-image:linear-gradient(180deg,#fff_0%,#a855f7_100%)_1]"></span> -->
                        <span class="pointer-events-none absolute inset-0 rounded-[10px]" style="
                            padding:2px;
                            background:linear-gradient(180deg,rgba(48,48,48,1) 0%,#4e267e 100%);
                            -webkit-mask:
                                linear-gradient(#fff 0 0) content-box, 
                                linear-gradient(#fff 0 0);
                            -webkit-mask-composite: xor;
                            mask-composite: exclude;
                            box-sizing: border-box;
                            z-index:20;
                            display:block;
                            "></span>
                    </div>
                    <div class="relative">
                        <div
                            class="flex flex-col justify-center items-center w-[615px] w-full relative z-10 p-[40px_10px] box-border">
                            <NuxtImg src="/images/vision/vision2.svg" alt="Vision 2" class="w-[487px]" />
                            <div class="text-20px font-bold mt-[14px]">{{ $t('dao.visionCardTitle1') }}</div>
                            <div class="text-[15px] text-white/80 mt-[12px]">{{ $t('dao.visionCardDesc1') }}</div>
                        </div>
                        <span class="pointer-events-none absolute inset-0 rounded-[10px]" style="
                            padding:2px;
                            background:linear-gradient(180deg,rgba(48,48,48,1) 0%,#4e267e 100%);
                            -webkit-mask:
                                linear-gradient(#fff 0 0) content-box, 
                                linear-gradient(#fff 0 0);
                            -webkit-mask-composite: xor;
                            mask-composite: exclude;
                            box-sizing: border-box;
                            z-index:20;
                            display:block;
                            "></span>
                    </div>
                </div>
                <div class="flex gap-[14px] mt-[73px]">
                    <div class="relative">
                        <div
                            class="flex flex-col justify-center items-center w-[615px] w-full relative z-10 p-[40px_10px] box-border">
                            <NuxtImg src="/images/vision/vision3.svg" alt="Vision 3" class="w-[487px]" />
                            <div class="text-208px] font-bold mt-[14px]">{{ $t('dao.visionCardTitle3') }}</div>
                            <div class="text-[15px] text-white/80 mt-[12px]">{{ $t('dao.visionCardDesc3') }}</div>
                        </div>
                        <span class="pointer-events-none absolute inset-0 rounded-[10px]" style="
                            padding:2px;
                            background:linear-gradient(180deg,#4e267e 0%,rgba(48,48,48,1) 100%);
                            -webkit-mask:
                                linear-gradient(#fff 0 0) content-box, 
                                linear-gradient(#fff 0 0);
                            -webkit-mask-composite: xor;
                            mask-composite: exclude;
                            box-sizing: border-box;
                            z-index:20;
                            display:block;
                            "></span>
                    </div>
                    <div class="relative">
                        <div
                            class="flex flex-col justify-center items-center w-[365px] w-full relative z-10 p-[40px_10px] box-border">
                            <NuxtImg src="/images/vision/vision4.svg" alt="Vision 4" class="w-[173px]" />
                            <div class="text-208px] font-bold mt-[14px]">{{ $t('dao.visionCardTitle4') }}</div>
                            <div class="text-[15px] text-white/80 mt-[12px]">{{ $t('dao.visionCardDesc4') }}</div>
                        </div>
                        <!-- <span class="pointer-events-none absolute inset-0 rounded-[10px] border-2
    [border-image:linear-gradient(180deg,#fff_0%,#a855f7_100%)_1]"></span> -->
                        <span class="pointer-events-none absolute inset-0 rounded-[10px]" style="
                            padding:2px;
                            background:linear-gradient(180deg,#4e267e 0%,rgba(48,48,48,1) 100%);
                            -webkit-mask:
                                linear-gradient(#fff 0 0) content-box, 
                                linear-gradient(#fff 0 0);
                            -webkit-mask-composite: xor;
                            mask-composite: exclude;
                            box-sizing: border-box;
                            z-index:20;
                            display:block;
                            "></span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">

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