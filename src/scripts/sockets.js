'use strict'

import io from 'socket.io-client'
// import Config from 'framework/config'
import store from '@/store'
import debug from 'debug'

let log = debug('sockets')

class Sockets {

  constructor () {
    let server = 'http://localhost:3000'
    log('Socket server', server)
    this.socket = io(server)
    this.socket.on('connect', this.socketConnect)
    this.socket.on('state', this.socketState)
    this.socket.on('disconnect', this.socketDisconnect)
  }

  socketConnect () {
    log('socket connect')
    store.dispatch('game/setConnected', true)
  }

  socketState (data) {
    log('socket state')
    store.dispatch('game/syncServer', data)
  }

  socketDisconnect () {
    log('socket disconnect')
    store.dispatch('game/setConnected', false)
  }

}

// Singleton
export default new Sockets()
