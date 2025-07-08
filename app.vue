<template>
  <div class="app-container">
    <NuxtRouteAnnouncer />
    <UApp :locale="locales[locale.replace('-', '_') as keyof typeof locales]">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()
</script>

<style>
.custom-dropdown-bg {
  background: linear-gradient(to left,
      rgba(18, 18, 18, 0.25),
      rgba(15, 15, 36, 0.92)),
    #000 !important;

  /* --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor); */

}

.custom-dropdown-bg {
  --tw-ring-color: rgba(39, 39, 39, 1) !important;
}

button.brand-button {
  /* 使用 CSS 变量，允许被覆盖 */
  background-color: var(--brand-bg, rgba(79, 82, 255, 0.92));
  color: var(--brand-text, white);
  --tw-ring-shadow: none;
  box-shadow: none;
  padding: var(--brand-padding, 14px 20px);
  font-size: var(--brand-font-size, 15px);
  font-weight: var(--brand-font-weight, normal);
  border-radius: var(--brand-radius, 13px);
  transition: all 0.2s ease;
}

button.brand-button:hover,
button.brand-button:active,
button.brand-button:focus {
  background-color: var(--brand-bg-hover, rgba(101, 104, 255, 0.92));
}

/* 可以通过 CSS 变量覆盖的示例类 */
.brand-button-outline {
  --brand-bg: transparent;
  --brand-text: rgba(79, 82, 255, 1);
  border: 1px solid rgba(79, 82, 255, 0.5);
}

.brand-button-small {
  --brand-padding: 8px 16px;
  --brand-font-size: 12px;
}

body {
  background-color: #000;
  color: white;
  /* Optionally set default text color to white for better contrast */
  font-family: Helvetica;
}

.app-container {
  background-color: #000;
}

.m-container {
  max-width: 1112px;
  margin: 0 auto;
}
</style>
