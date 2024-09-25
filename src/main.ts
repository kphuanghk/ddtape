import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import { router } from './router'

import en from '@/locales/en.json'
import cn from '@/locales/cn.json'
import hk from '@/locales/hk.json'

const i18n = createI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  messages: {
    en,
    hk,
    cn
  }
})

createApp(App).use(i18n).use(router).mount('#app')
