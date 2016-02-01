const h = require('virtual-dom/h')
const hyperx = require('hyperx')
const hx = hyperx(h)

const list = require('./todo/list')
const input = require('./todo/input')

module.exports = (worker, state) => hx`
  <section>
    <header>
      Hello, ${state.name}
    </header>
    <article>
      <h1>Your todo list:</h1>
      ${list(state)}
      ${input(worker)}
    </article>
  </section>
`
