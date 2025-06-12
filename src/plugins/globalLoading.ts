import { createDiscreteApi } from 'naive-ui'
export default defineNuxtPlugin(nuxtApp => {
  const bar = ref<any>(null)
  const timeout=ref<any>(null)
  nuxtApp.hook("app:mounted", e => {
    if (!bar.value) {
      const { loadingBar } = createDiscreteApi(["loadingBar"])
      bar.value = loadingBar
    }
  })
  nuxtApp.hook("page:start", e => {
    clearError()
    timeout.value = null
    bar.value?.start()
  })
  nuxtApp.hook("page:finish", e => {
    timeout.value = setTimeout(() => {
      bar.value?.finish()
    },150)
  })
  nuxtApp.hook("app:error", (error, instance, info) => {
    // 客户端渲染
    if (import.meta.client) {
      setTimeout(() => {
        bar.value?.finish()
      },150)
    }
  })
  nuxtApp.hook("vue:error", (error, instance, info) => {
    // 客户端渲染
    if (import.meta.client) {
      setTimeout(() => {
        bar.value?.finish()
      },150)
    }
  })
})
