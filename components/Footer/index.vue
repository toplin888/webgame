<template>
    <main class="p-[67px]">
        <div class="flex gap-[85px] max-w-[1242px] m-auto ">
            <div>
                <div><img src="@/assets/images/logo.png" class="logo" alt=""></div>
                <div class="max-w-[317px] mt-[20px] text-[12px] text-[#ADADAD]">
                    {{ $t('footer.desc') }}
                </div>
            </div>
            <div class="flex flex-col gap-[16px]">
                <div class="text-[16px] text-[#ADADAD]">Help/Support</div>
                <div class="text-[14px] text-[#FAFAFA] font-medium">Game validato</div>
                <div class="text-[14px] text-[#FAFAFA] font-medium">Help Center</div>
                <div class="text-[14px] text-[#FAFAFA] font-medium">Terms of Service</div>
                <div class="text-[14px] text-[#FAFAFA] font-medium">privacy policy</div>
            </div>
            <div class="flex flex-col gap-[16px]">
                <div class="text-[#ADADAD] text-[14px] font-medium">RESOURCES</div>
                <div class="text-[14px] text-[#FAFAFA] font-medium">white paper</div>
                <div class="text-[14px] text-[#FAFAFA] font-medium">
                    business plan
                </div>
            </div>
            <div class="flex flex-col gap-[20px]">
                <div class="text-[16px] text-[#FAFAFA] font-bold">Join our community</div>
                <div class="flex gap-4">
                    <a v-for="item in joinItems" :key="item.id" :href="item.value" target="_blank"
                        rel="noopener noreferrer" class="hover:bg-white/20 rounded-full p-3">
                        <img :src="item.logoPath" :alt="item.label" class="w-4 h-4">
                    </a>
                </div>
            </div>
        </div>
        <div class="max-w-[1242px] pt-[70px] m-auto">
            <div>Copyright @ X 205 . All Rights Reserved.</div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import icon1 from '~/assets/images/social/x.png';
import icon2 from '~/assets/images/social/discord.png';
import icon3 from '~/assets/images/social/youtube.png';
import icon4 from '~/assets/images/social/linkedin.png';
import icon5 from '~/assets/images/social/instagram.png';

const { t } = useI18n()

interface JoinItem {
    id: number;
    type: string;
    logoPath: string;
    label: string;
    value: string;
}

const joinItems: JoinItem[] = [
    { id: 1, type: 'twitter', logoPath: icon1, label: t('footer.twitter'), value: 'https://twitter.com' },
    { id: 2, type: 'discord', logoPath: icon2, label: t('footer.discord'), value: 'https://discord.com' },
    { id: 3, type: 'youtube', logoPath: icon3, label: t('footer.youtube'), value: 'https://youtube.com' },
    { id: 4, type: 'linkedin', logoPath: icon4, label: t('footer.linkedin'), value: 'https://linkedin.com' },
    { id: 5, type: 'instagram', logoPath: icon5, label: t('footer.instagram'), value: 'https://instagram.com' }
]
</script>

<style scoped lang="scss">
.logo {
    /* 保持图片原始尺寸 */
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transform-origin: center;
}
</style>