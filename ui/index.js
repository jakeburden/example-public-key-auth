const h = require('virtual-dom/h')
const hyperx = require('hyperx')
const hx = hyperx(h)
const profile = require('./profile')
const authenticate = require('./authenticate')

module.exports = worker => state => hx`
  <div>
    ${state.auth
      ? profile(worker, state)
      : authenticate(worker, state)}
  </div>
`
