// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // app: {
  //   baseURL: '/', // 确保不是 "/&" 或其他异常值
  // },
  router: {
    //   middleware: ['redirect-root']
  },
  routeRules: {
    '/': { redirect: '/game' },
  },
  spaLoadingTemplate: true, // 启用 SPA 加载模板
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@vueuse/nuxt'
  ],

  // 国际化配置
  i18n: {
    strategy: 'prefix_and_default', // 强制所有路由都带前缀，解决水合问题
    bundle: {
      optimizeTranslationDirective: false // 官方建议禁用，避免未来报错
    },
    locales: [
      {
        code: 'zh-CN', // 修改 code 以匹配类型
        iso: 'zh-CN',
        name: '简体中文',
        file: 'zh-cn.json'
      },
      {
        code: 'zh-TW', // 修改 code 以匹配类型
        iso: 'zh-TW',
        name: '繁體中文',
        file: 'zh-tw.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'ja',
        iso: 'ja',
        name: '日本語',
        file: 'ja.json'
      }
    ],
    langDir: 'locales/',
    defaultLocale: 'zh-CN', // 更新默认语言
    lazy: false, // 禁用懒加载
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false
    }
    // detectBrowserLanguage: false
  },

  // 使用 Nuxt Icon 自定义UIcon 指定路径
  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: './assets/icons'
    }]
  },

  ui: {
    fonts: false, // 禁用 Google Fonts 获取
    theme: {
      colors: [
        'primary',
        'secondary',
        'lucky',
        'transparent', // 添加透明色
        'info',
        'success',
        'warning',
        'error'
      ]
    }
  },

  // Vite 配置
  vite: {
    build: {
      sourcemap: false // 禁用 sourcemap 以避免警告
    },
    css: {
      devSourcemap: false // 禁用 CSS sourcemap
    }
  },

  // 构建配置
  build: {
    transpile: ['@headlessui/vue'] // 转译可能有问题的依赖
  },

  // 5. 服务端渲染模式
  // ssr: false,
  // 实验性功能配置
  experimental: {
    payloadExtraction: false // 减少构建警告
  },

  // Nitro 配置
  nitro: {
    experimental: {
      wasm: false // 禁用 WASM 实验性功能
    }
  },
  css: ['~/assets/css/main.css'],
  devServer: {
    host: '0.0.0.0',  // 同时允许 localhost 和 IP 地址访问
    port: 3000       // 使用默认端口或指定其他端口
  }
})