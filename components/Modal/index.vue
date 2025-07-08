<template>
    <UModal>
        <UButton label="Open" color="neutral" variant="subtle" :close="{
            color: 'primary',
            variant: 'outline',
            class: 'rounded-full'
        }" />

        <template #content>
            <Placeholder class="h-48 m-4" />
        </template>
    </UModal>
</template>
