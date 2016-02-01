const h = require('virtual-dom/h')
const hyperx = require('hyperx')
const hx = hyperx(h)

module.exports = worker => hx`
  <input placeholder='what needs to be done?'
    onkeyup=${e => {
      if (e.keyCode === 13) {
        const todo = e.target.value
        if (todo) {
          worker.postMessage({
            type: 'addTodo',
            payload: todo
          })
          e.target.value = ''
        }
      }
    }}
  />
`

