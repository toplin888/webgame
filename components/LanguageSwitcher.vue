<template>
  <div>
    <UDropdownMenu :items="languageItems" :ui="{
      content: 'w-48 custom-dropdown-bg outline-none ring-1 ring-custom-border',
      itemLabel: 'text-white text-base font-normal',
      itemActive: 'bg-[#7578FF] text-white',
      itemChecked: 'bg-[#7578FF] text-white'
    }">
      <UButton icon="i-custom-lang" size="xs" class="" variant="ghost" />
    </UDropdownMenu>
  </div>
</template>

<script setup lang="ts">

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

type LocaleCode = typeof locales.value[number]['code']

interface Language {
  code: LocaleCode
  name: string
}

const languages: Language[] = [
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
]

const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === locale.value) || languages[0]
})

const languageItems = computed(() => {
  return languages.map(lang => ({
    label: lang.name,
    checked: lang.code === locale.value, // 直接使用 locale.value 比较
    onSelect: () => changeLanguage(lang.code)
  }))
})

const changeLanguage = async (newLocale: LocaleCode) => {
  await navigateTo(switchLocalePath(newLocale))
}
</script>
