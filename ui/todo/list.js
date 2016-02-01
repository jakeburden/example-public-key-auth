const h = require('virtual-dom/h')
const hyperx = require('hyperx')
const hx = hyperx(h)

module.exports = state => hx`
  <ul>
    ${state.todos.map(item => hx`<li>${item}</li>`)}
  </ul>
`

