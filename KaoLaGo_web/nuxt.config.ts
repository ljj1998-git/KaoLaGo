import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({
  // devtools: { enabled: true },
  srcDir: 'src/',

  modules: [
    '@pinia/nuxt',
    // // 'pinia-plugin-persistedstate/nuxt',
    // 'nuxt-lodash',
    // '@vueuse/nuxt',
    // 'nuxtjs-naive-ui',
    // '@unocss/nuxt'
  ],

  css: ['~/styles/global.css'],

  vite: {
    plugins: [
      AutoImport({
        imports: ['pinia'],
        dts: 'types/auto-import.d.ts'
      }),
      Components({
        dirs: ['components'],
        dts: 'types/components.d.ts',
        resolvers: [NaiveUiResolver()]
      })
    ]
  },

  compatibilityDate: '2025-04-08',
})