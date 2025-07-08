<template>
    <main>
        <section class="relative md:p-[110px]">
            <div class="m-container relative">
                <div
                    class="flex justify-between p-[50px_50px] bg-gradient-to-l from-[rgba(15,15,36,0.92)] via-[rgba(18,18,18,0.6)] to-[rgba(18,18,18,0.25)] ring-[rgba(59, 59, 59, 0.65)] rounded-[20px]">
                    <div
                        class="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-500 font-medium text-[50px] w-[387px] text-center">
                        {{ $t('home.plan7Title') }}
                    </div>
                    <div class="w-[577px]">
                        <!-- linear-gradient(135deg, #160E2D 0%, #191022 100%); -->
                        <UAccordion :items="accordionItems" :ui="{ item: 'border-0 ' }" />
                        <!-- :ui="{ leadingIcon: 'i-lucide-x', item: 'border-0 bg-gradient-to-l from-[#160E2D] to-[#191022]' }" /> -->
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
const { t } = useI18n()

// 引入多语言
const accordionItems = ref<AccordionItem[]>([
    {
        label: t('home.accordionTitle1'),
        content: t('home.accordionDesc1'),
        // trailingIcon: 'i-lucide-x'
    },
    {
        label: t('home.accordionTitle2'),
        content: t('home.accordionDesc2'),
        // trailingIcon: 'i-lucide-x'
    },
    {
        label: t('home.accordionTitle3'),
        content: t('home.accordionDesc3'),
        // trailingIcon: 'i-lucide-x'
    },
    {
        label: t('home.accordionTitle4'),
        content: t('home.accordionDesc4'),
        // trailingIcon: 'i-lucide-x'
    },
    {
        label: t('home.accordionTitle5'),
        content: t('home.accordionDesc5'),
        // trailingIcon: 'i-lucide-x'
    },
])
</script>
<style scoped>
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
</style>