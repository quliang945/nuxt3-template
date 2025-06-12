// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { config } from 'dotenv'
// import vueJsx from '@vitejs/plugin-vue-jsx'
const envConfig = config({
  path: `env/.env${process.env.MODE ? `.${process.env.MODE}` : ''}`
})
const conf: any = envConfig.parsed
export default defineNuxtConfig({
  typescript: {
    shim: false,
    tsConfig: {
      compilerOptions: {
        jsx: 'preserve',
        jsxImportSource: 'vue'
      }
    }
  },
  runtimeConfig: {
    // apiSecret 只能在服务器端上访问
    apiSecret: '',
    // public 命名空间中定义的，在服务器端和客户端都可以普遍访问
    public: {
      baseURL: process.env.NUXT_PUBLIC_API_BASE,
      apiURL: process.env.NUXT_PUBLIC_API,
      loading: {
        delay: 200 // 全局默认延迟时间
      }
    }
  },
  // 添加静态生成配置
  // generate: {
  //   routes: [
  //     '/',
  //     '/login',
  //     '/register',
  //     '/forget',
  //     '/exam',
  //     '/publicity',
  //     '/commitment',
  //     '/entry/home',
  //     '/entry/notes',
  //     '/entry/details',
  //     '/entry/collect',
  //     '/entry/informationSheet',
  //     '/entry/basic',
  //     '/entry/photo',
  //     '/entry/job',
  //     '/entry/writtenPay',
  //     '/entry/auditResult',
  //     '/entry/area',
  //     '/entry/ticketPrint',
  //     '/entry/writtenResults',
  //     '/entry/interviewPay',
  //     '/entry/interviewPrint'
  //   ]
  // },
  // 增加内存限制
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false // 允许单个页面生成失败不影响整体
    },
    devProxy: {
      '/examination': {
        target: process.env.NUXT_PUBLIC_API_BASE || 'http://[::1]:4000',
        changeOrigin: true
      },
      '/captchaManage': {
        target: process.env.NUXT_PUBLIC_API,
        changeOrigin: true
      }
    },
    // 该配置用于服务端请求转发
    routeRules: {
      '/server/**': {
        proxy: process.env.NUXT_PUBLIC_API_BASE || 'http://[::1]:4000' + '/**'
      },
      '/entry/**': {
        ssr: true
      }
    }
  },
  devtools: { enabled: false },
  srcDir: 'src/',

  imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ['stores', 'api']
  },

  app: {
    head: {
      // app.name
      title: '考生报名',
      // titleTemplate: '%s - Nuxt 3 Awesome Starter',
      meta: [
        // { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
        },
        { name: 'keywords', content: '考生报名' },
        { name: 'description', content: '考生报名' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  css: [
    '@/assets/css/tailwind.css',
    // '@/assets/css/display.css',
    // '@/assets/css/transition.css'
  ], //引入全局样式
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/icon',
    'nuxt-icons'
  ],
  unocss: {
    uno: true, // 启用默认预设
    icons: true, // 启用图标
    attributify: true, // 启用属性化模式
    shortcuts: {
      // 自定义快捷方式
      btn: 'px-4 py-2 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700'
    },
    rules: [
      // 自定义规则
    ]
  },
  postcss: {
    plugins: {
      autoprefixer: {}
    }
  },
  //   开发服务器配置
  devServer: {
    host: conf?.NUXT_PUBLIC_API_BASE ? conf.NUXT_PUBLIC_API_BASE : '/',
    // host:"0.0.0.0",
    https: false,
    port: 9527
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer',
            'pinia-plugin-persistedstate/nuxt'
          ]
        : ['@juggle/resize-observer', 'pinia-plugin-persistedstate/nuxt']
  },

  vite: {
    plugins: [
      Components({
        // Automatically register all components in the `components` directory
        resolvers: [NaiveUiResolver()]
      })
      // vueJsx()
    ],
    ssr: {
      noExternal: ['naive-ui', 'vueuc', '@juggle/resize-observer', '@css-render/vue3-ssr']
    },
    optimizeDeps: {
      include: process.env.NODE_ENV === 'development' ? ['naive-ui', 'vueuc'] : []
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "~/assets/styles/main.scss" as *;`
        }
      }
    }
  },
  sourcemap: {
    //修复unocss 警告
    server: true,
    client: false
  },
  compatibilityDate: '2025-02-27'
})
