<script setup>
import { zhCN, dateZhCN } from 'naive-ui'

/**
 * 挂载之前
 */
onBeforeMount(() => {

})

/**
 * 挂载之后
 */
onMounted(() => {
  // do something
})
</script>

<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    inline-theme-disabled
  >
    <NuxtPage />
  </NConfigProvider>
</template>

<style lang="scss"></style>
