<template>
    <main>
        <section class="md:p-[110px]">
            <div class="m-container">
                <div class="flex justify-center items-center flex-col md:gap-[205px]">
                    <div class="flex justify-between items-center gap-[100px]">
                        <div>
                            <div class="text-[42px] ">Get a lot of LCX in two simple steps</div>
                            <div class="text-[15px] ">
                                1.Connect your Web3 wallet<br />
                                2.Play any game on the platform to get LCX
                            </div>
                        </div>
                        <div>
                            <img class="w-[453px] h-[320px]" :src="p1">
                        </div>
                    </div>
                    <div class="flex justify-between items-center gap-[100px]">
                        <div>
                            <img class="w-[453px] h-[320px]" :src="p1">
                        </div>
                        <div>
                            <div class="text-[42px] ">Get a lot of LCX in two simple steps</div>
                            <div class="text-[15px] ">
                                1.Connect your Web3 wallet<br />
                                2.Play any game on the platform to get LCX
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup lang="ts">
import p1 from '~/assets/images/step.png'

</script>
<style scoped></style>