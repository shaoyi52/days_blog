import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
Vue.use(VueI18n)

const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  cn: {
    message: {
      hello: '您好世界'
    }
  }
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'en',
  messages, // set locale messages
})
 
export default i18n
