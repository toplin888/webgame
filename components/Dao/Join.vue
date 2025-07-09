<template>
    <main class="relative">
        <div class="line-bg h-[200px]"></div>

        <div class="max-w-[976px] m-auto relative py-[100px_194px]">

            <div class="flex justify-center">
                <div
                    class="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-500 font-medium text-[55px]">
                    {{ $t('dao.joinTitle') }}
                </div>
            </div>
            <div class="">
                <div class="flex gap-[14px] mt-[73px]">
                    <div class="relative">
                        <div class="flex flex-col justify-center items-center w-[362px] relative z-10 box-border">
                            <div class="p-[44px_44px_35px_44px] h-[237px]">
                                <div class="text-16px mt-[14px]">{{ $t('dao.joinCardText1') }}</div>
                                <div class="flex gap-[12px] mt-[18px]">
                                    <NuxtLink to="https://discord.gg/VEbmQxX4A4" target="_blank" data-text="Discord"
                                        active-class="active">
                                        <NuxtImg src="/images/vision/xIcon.svg" alt="Vision 1" class="w-[36px]" />
                                    </NuxtLink>
                                    <NuxtLink to="https://x.com/luckyx_game" target="_blank" data-text="Discord"
                                        active-class="active">
                                        <NuxtImg src="/images/vision/twIcon.svg" alt="Twitter 1" class="w-[36px]" />
                                    </NuxtLink>


                                </div>
                            </div>
                            <div
                                class="w-full text-[20px] text-white/80 p-[29px_37px] flex justify-between items-center border-t-[1px] border-[#565656]/50">
                                <div>
                                    {{ $t('dao.joinCardBtn1') }}
                                </div>
                                <div>
                                    <NuxtImg class="w-[20px] h-[20px]" src="/images/vision/arrow-right.svg" alt="→" />
                                </div>
                            </div>
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
                    <div class="relative">
                        <div class="flex flex-col justify-center items-center w-[362px] relative z-10 box-border">
                            <div class="p-[44px_44px_35px_44px] h-[237px]">
                                <div class="text-16px mt-[14px]">{{ $t('dao.joinCardText2') }}</div>
                                <div class="flex gap-[12px] mt-[18px]">
                                    <NuxtLink href="#">
                                        <UButton color="lucky">{{ $t('dao.joinCardBtn2') }}</UButton>
                                    </NuxtLink>
                                    <NuxtLink href="#">
                                        <UButton color="lucky" class="bg-transparent">{{ $t('dao.joinCardBtn3') }}
                                        </UButton>
                                    </NuxtLink>
                                </div>
                            </div>
                            <div
                                class="w-full text-[20px] text-white/80 p-[29px_37px] flex justify-between items-center border-t-[1px] border-[#565656]/50">
                                <div>
                                    {{ $t('dao.joinCardBtn1') }}
                                </div>
                                <div>
                                    <NuxtImg class="w-[20px] h-[20px]" src="/images/vision/arrow-right.svg" alt="→" />
                                </div>
                            </div>
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
                    <div class="relative">
                        <div class="flex flex-col justify-center items-center w-[362px] relative z-10 box-border">
                            <div class="p-[44px_44px_35px_44px] h-[237px]">
                                <div class="text-16px mt-[14px]">{{ $t('dao.joinCardText3') }}</div>
                                <div class="flex gap-[12px] mt-[18px]">
                                    <NuxtLink href="#">
                                        <UButton color="lucky">{{ $t('dao.joinCardBtn4') }}
                                        </UButton>
                                    </NuxtLink>
                                </div>
                            </div>
                            <div
                                class="w-full text-[20px] text-white/80 p-[29px_37px] flex justify-between items-center border-t-[1px] border-[#565656]/50">
                                <div>
                                    {{ $t('dao.joinCardBtn1') }}
                                </div>
                                <div>
                                    <NuxtImg class="w-[20px] h-[20px]" src="/images/vision/arrow-right.svg" alt="→" />
                                </div>
                            </div>
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
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">

</script>

<style scoped>
.line-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(143, 14, 177, 0.2) 100%);
}
</style>