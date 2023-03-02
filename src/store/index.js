import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY),
    cachePages: ['LayoutIndex']
  },
  getters: {
  },
  mutations: {
    SETUSER (state, data) {
      state.user = data
      setItem(USER_KEY, state.user)
    },
    ADDCACHEPAGES (state, pageName) {
      if (state.cachePages.indexOf(pageName) === -1) {
        state.cachePages.push(pageName)
      }
    },
    REMOVECACHEPAGES (state, pageName) {
      if (state.cachePages.indexOf(pageName) !== -1) {
        state.cachePages.splice(state.cachePages.indexOf(pageName), 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
