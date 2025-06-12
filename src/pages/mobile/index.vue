<script setup>
import { decrypto, encrypto } from '~/utils'
import { NAvatar} from 'naive-ui'
/**
 * message
 */
const handleShowMessage = () => {
  userInfo.setName('李四')
  utilMsg.$message.error('Show Message Success!')
}
const { bool: detailModalVisible, toggle: openDetailModal } = useBoolean()
const handleShowNo =()=>{
  openDetailModal()
  utilMsg.$notification.success({
    content: '说点啥呢',
    meta: '想不出来',
    duration: 2500,
    keepAliveOnHover: true
  })
}

/**
 * dialog
 */
const handleShowDialog = () => {
  userInfo.$reset()
  utilMsg.$dialog.warning({
    title: 'Title',
    content: 'Content',
    onAfterLeave: () => {
      utilMsg.$message.success('Close Success!')
    }
  })
}

/**
 * loadingBar
 */
const handleShowLoadingBar = () => {
  utilMsg.$loadingBar.start()
  setTimeout(() => {
    utilMsg.$loadingBar.finish()
  }, 500)
}

// pina, don't need to import, nuxt can auto import it
const userInfo = useUserStore()

/*
 * you can change value:
 * userInfo.name = 'Fe2'
 */

// VueUse
const { x, y } = useMouse()

// fetch
const handleLogin = async () => {
  const params = {
    phone: 'phone',
    password: 'password'
  }
  try {
    const res = await apiLogin(params)
    console.log(res)
  } catch (e) {
    console.log(e)
    utilMsg.$message.error(`${e.error.message} ${e.request}`)
  }7
}

// ssr page
const toSsr = () => {

  /*
   * router.push() 是前端的行为, 无法应用于 ssr 页面
   * window.open('/ssr')
   */
  navigateTo({ path: '/ssr' })
  // location.href = '/ssr'
}
const tokenCookie = useCookie('token');
// 设置cookie
tokenCookie.value = encrypto('hahaha');
const token = useToken();
</script>

<template>
  <div class="container p-8">
    <div class="mb-8">
      <h2 class="text-2xl mb-4">
        NaiveUI{{ token}}---{{decrypto(useCookie('token').value)}} 移动
      </h2>
      <n-button
        type="success"
        @click="handleShowNo"
      >
        显示通知{{detailModalVisible}}
      </n-button>
      <n-button
        type="success"
        @click="handleShowMessage"
      >
        Show Message
      </n-button>
      <span class="ml-3" />
      <n-button
        type="success"
        @click="handleShowDialog"
      >
        Show Dialog
      </n-button>
      <span class="ml-3" />
      <n-button
        type="success"
        @click="handleShowLoadingBar"
      >
        Show LoadingBar
      </n-button>
      <span class="ml-3" />
    </div>

    <div class="mb-8 w-[500px]">
      <h2 class="text-2xl mb-4">
        unoCSS
      </h2>
      <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
        <div class="pt-6 md:p-8 text-center space-y-4">
          <blockquote>
            <p class="text-lg font-medium text-white">
              “Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to
              customize, adapts to any design, and the build size is tiny.”
            </p>
          </blockquote>
<!--          <figcaption class="font-medium">-->
            <div class="text-sky-500 dark:text-sky-400 bg-[#88888805]">
              Sarah Dayan
            </div>
            <div class="text-slate-700 dark:text-slate-500">
              Staff Engineer, Algolia
            </div>
<!--          </figcaption>-->
        </div>
      </figure>
      <!--      <span class="px-4 py-2 text-[18px] border border-[#18A058] radius-[8px]">d</span>-->
    </div>

    <div class="mb-8">
      <h2 class="text-2xl mb-4">
        Pinia
      </h2>
      <span class="text-[18px]">I'm {{ userInfo.name }}, I'm {{ userInfo.age }} year old.</span>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl mb-4">
        VueUse
      </h2>
      <span class="text-[18px]">pos: {{ x }}, {{ y }}</span>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl mb-4">
        Fetch
      </h2>
      <n-button
        type="success"
        @click="handleLogin"
      >
        Do Login
      </n-button>
      <span class="ml-3" />
      <n-button
        type="success"
        @click="toSsr"
      >
        SSR
      </n-button>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl mb-4">
        Custom Components
      </h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  h1 {
    color: $textColor;
  }
}
</style>
