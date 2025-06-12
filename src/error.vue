<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
// console.log(props.error,'statusMessage')
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="parent">
    <n-result :title="`${ error?.statusCode+' '+error?.statusMessage}`" :description="error?.message" size="huge">
      <template #icon>
<!--        <h1>{{error?.statusCode}}</h1>-->
        <SvgIcon :localIcon="error?.statusCode.toString()" class="text-200px contents align-middle h-200px"></SvgIcon>
      </template>
      <template #footer>
        <n-button @click="handleError">返回首页</n-button>
      </template>
    </n-result>
  </div>

</template>
<style  lang="scss" scoped>
.parent {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  height: 100vh;          /* 父元素高度，根据需要调整 */
}
</style>
