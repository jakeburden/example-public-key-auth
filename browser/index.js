const work = reqiure('webworkify')
const main = require('main-loop')
const worker = work(require('./worker.thread.js'))
const app = require('../ui/index.js')(worker)
const state = require('./initState.js')
const loop = main(state, app, require('virtual-dom'))
document.getElementById('app').appendChild(loop.target)

worker.onmessage = ({data: state}) => loop.update(state)
worker.postMessage({type: 'start'})

