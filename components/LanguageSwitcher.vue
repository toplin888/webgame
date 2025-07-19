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
import { getConfigLanguagesList } from '~/composables/apiServices'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()


// const langRes = await getConfigLanguagesList({})
// const languages = ref([])
// languages.value = langRes.list || []

type LocaleCode = typeof locales.value[number]['code']

interface Language {
  code: LocaleCode
  name: string
}

const languages = computed(() =>
  locales.value.map(l => ({
    code: l.code,
    name: l.name
  }))
)

// const languages: Language[] = [
//   { code: 'zh-CN', name: '简体中文' },
//   { code: 'zh-TW', name: '繁體中文' },
//   { code: 'en', name: 'English' },
//   { code: 'ja', name: '日本語' },
// ]

const currentLanguage = computed(() => {
  return languages.value.find(lang => lang.code === locale.value) || languages.value[0]
})

const languageItems = computed(() => {
  return languages.value.map(lang => ({
    label: lang.name,
    checked: lang.code === locale.value, // 直接使用 locale.value 比较
    onSelect: () => changeLanguage(lang.code)
  }))
})

const changeLanguage = async (newLocale: LocaleCode) => {
  console.log(newLocale)
  await navigateTo(switchLocalePath(newLocale))
  window.location.reload()
}
</script>
