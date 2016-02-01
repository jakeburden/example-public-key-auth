module.exports = self => {
  'use strict'
  const sodium = require('sodium')
  // const Buffer = require('buffer').Buffer
  const level = require('level')
  const xhr = require('xhr')
  let state = require('./initState.js')
  const db = level('db')

  self.onmessage = ({data: {type, payload}}) => {
    const events = {
      start () {
        db.get('keypair', (err, keypair) => {
          if (err) {
            if (err.notFound) state.auth = false
            else return console.error(err)
          }
          xhr({
            uri: `/${keypair.publicKey}`,
            headers: {
              'Content-Type': 'application/json'
            }
          }, (err, resp, body) => {
            if (err) console.error(err)
            state = JSON.parse(body)
            self.postMessage(state)
          })
        })
      },

      addTodo () {
        state.todos.push(payload)
        db.get('keypair', (err, keypair) => {
          if (err) return console.error(err)
          const privateKey = keypair.privateKey
          const publicKey = keypair.publicKey
          const sig = sodium.crypto_sign_detached(JSON.stringify(state), privateKey)
          xhr({
            uri: `/${publicKey}/update`,
            body: {
              publicKey: publicKey,
              signature: sig,
              message: JSON.stringify(state)
            },
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }, (err, resp, body) => {
            if (err) return console.error(err)
          })
        })
      },

      createIdentity () {
        const keypair = sodium.crypto_sign_keypair()
        db.put('keypair', keypair, err => {
          if (err) return console.error(err)
          const publicKey = keypair.publicKey
          state.publicKey = publicKey
          xhr({
            uri: `/${publicKey}/create`,
            body: JSON.stringify(state),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }, (err, resp, body) => {
            if (err) return console.error(err)
          })
        })
      }
    }

    events[type]()
    self.postMessage(state)
  }
}
