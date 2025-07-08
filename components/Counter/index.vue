<template>
    <span ref="target">{{ displayValue }}</span>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useIntersectionObserver, useIntervalFn, TransitionPresets, rand } from '@vueuse/core'

const props = defineProps<{
    value: number
    duration?: number // ms
}>()

const target = useTemplateRef<HTMLDivElement>('target')
const startNum = shallowRef(0)

const output = useTransition(startNum, {
    duration: props.duration ?? 1500,
    transition: TransitionPresets.easeOutExpo,
})
const displayValue = computed(() => {
    const num = Math.round(output.value)
    return `${num}`
})

useIntersectionObserver(target, ([{ isIntersecting }]) => {
    console.log('isIntersecting:', isIntersecting)
    if (isIntersecting) {
        startNum.value = props.value
    } else {
        startNum.value = 0
    }
})

</script>

<style scoped></style>
