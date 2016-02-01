const h = require('virtual-dom/h')
const hyperx = require('hyperx')
const hx = hyperx(h)

module.exports = worker => hx`
  <section>
    <form>
      <input placeholder='name (whatever you want!)' id='name'>
      <button onclick=${() => {
        const name = document.getElementById('name')
        if (name.length) {
          worker.postMessage({
            type: 'createIdentity',
            payload: name
          })
        }
      }}>
        Create Your Identity
      </button>
    </form>
  </section>
`
