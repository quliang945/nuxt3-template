<script setup>
/**
 * 如果您的项目需要使用 ssr 请勿将接口请求放在任何页面的声明周期中,
 * 否则就会在前端发起请求, 就无法达到 ssr 的效果了.
 * 如果判断该请求是 ssr, 你看 network 有没有发起接口的请求接口, 如果发起请求了, 就不是 ssr, 反之则是
 */
import { ssrData } from '~/api/demo'
const state = reactive({ title: '',textBody:'' })
// throw createError({
//   statusCode: 404,
//   statusMessage: 'Page Not Found',
//   message:'未找到页面'
// })
const handleShowMessage1 =() => {
  console.log('凄凄切切凄凄切切凄凄切切凄凄切切凄凄切切凄凄切切QQ群')
  utilMsg.$message.error('消息消息!')
  navigateTo({ path: '/' })
}
const getList= async()=>{
  await nextTick()
  const res =  await ssrData('examination_login_bottom_txt')
  state.en = res?.result?.content || 'Not Found'
  state.title = res?.data?.textBody || 'Not Found'
}
// if(import.meta.server){
// const res =  await ssrData('examination_login_bottom_txt')
// state.en = res?.result?.content || 'Not Found'
// state.title = res?.data?.textBody || 'Not Found'
// }
onMounted(() => {
  getList()
})

// onMounted(() => {
//
// })
</script>

<template>
  <div class="text-[36px] flex items-center justify-center h-[100vh] w[100vw]">
<!--    <NuxtErrorBoundary @error="someErrorLogger">-->
<!--      &lt;!&ndash; You use the default slot to render your content &ndash;&gt;-->
<!--      <template #error="{ error, clearError }">-->
<!--        You can display the error locally here: {{ error }}-->
<!--        <button @click="clearError">-->
<!--          This will clear the error.-->
<!--        </button>-->
<!--      </template>-->
<!--    </NuxtErrorBoundary>-->
<!--    <ClientOnly>-->
    <div>

      <div>{{ state.en }}</div>
      <div class="mt-3">
        <p  v-html="state.title"></p>
      </div>
      <n-button
        ref="aaa"
        type="success"
        @click="handleShowMessage1"
      >
        显示消息 PC
      </n-button>
    </div>
<!--    </ClientOnly>-->
  </div>
</template>

<style scoped lang="scss">

</style>
