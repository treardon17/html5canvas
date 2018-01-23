'use strict'

import debug from 'debug'

let log = debug('store:root')

const root = {

  strict: true,

  state: {
    loading: true
  },

  mutations: {

    SET_LOADING (state, { loading }) {
      state.loading = loading
    }

  },

  getters: {
  },

  actions: {

    loading (context, loading) {
      log('action loading', loading)
      return new Promise((resolve, reject) => {
        context.commit('SET_LOADING', { loading })
        resolve(loading)
      })
    }

  }

}

export default root
