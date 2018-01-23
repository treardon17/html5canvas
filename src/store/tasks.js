'use strict'

import debug from 'debug'
let log = debug('store:tasks')

const tasks = {

  namespaced: true,

  state: {
    all: [
      { id: 1, title: 'First Task', isComplete: false },
      { id: 2, title: 'Another Task', isComplete: false }
    ],
    activeTask: null
  },

  mutations: {

    SYNC_TASK (state, { task }) {
      log('mutation SYNC_TASK', task)
      let cached = state.all.find(item => item.id === task.id)
      if (cached) {
        // update existing task
        for (let k in task) {
          cached[k] = task[k]
        }
      } else {
        // add new task
        state.all.push(task)
      }
    },

    SET_ACTIVE_TASK (state, { task }) {
      log('mutation SYNC_TASK', task)
      let cached = state.all.find(item => item.id === task.id)
      if (cached) {
        state.activeTask = task
      }
      // else task not in all so ignore
    }

  },

  getters: {
    exampleGetter (state, getters) {
      return null
    }
  },

  actions: {

    syncTask (context, task) {
      log('action syncTask', task)
      context.commit('SYNC_TASK', { task })
      return Promise.resolve()
    },

    setActiveTask (context, task) {
      log('action setActiveTask', task)
      context.commit('SET_ACTIVE_TASK', { task })
      return Promise.resolve()
    }

  }

}

export default tasks
