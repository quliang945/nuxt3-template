<template>
  <template v-if="localIcon">
    <nuxt-icon :name="localIcon" filled v-bind="bindAttrs" />
  </template>
  <template v-else>
    <!-- 线上图标 -->
    <Icon v-if="icon" :name="icon" v-bind="bindAttrs" />
    <!-- <Icon name="uil:github" color="black" /> -->
  </template>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';

defineOptions({ name: 'SvgIcon' });

/**
 * 图标组件
 * - 支持iconify和本地svg图标
 * - 同时传递了icon和localIcon，localIcon会优先渲染
 */
interface Props {
  /** 图标名称 */
  icon?: string;
  /** 本地svg的文件名 */
  localIcon?: string;
}

const props = defineProps<Props>();

const attrs = useAttrs();

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || '',
  style: (attrs.style as string) || ''
}));

</script>

<style scoped></style>


<style lang="scss" scoped>

</style>
