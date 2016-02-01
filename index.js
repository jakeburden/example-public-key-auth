const http = require('http')
const level = require('level')
const routes = require('patterns')()
const ecstatic = require('ecstatic')({
  root: 'browser/dist'
})

const db = level('db', {
  valueEncoding: 'json',
  keyEncoding: require('bytewise')
})

http.createSever((req, res) => {
  const m = routes.match(`${req.method} ${req.url}`)
  if (!m) {
    ecstatic(req, res)
    return
  }
  const fn = m.value
  req.params = m.params
  fn(req, res)
}).listen('9090', () => console.log('server => http://127.0.0.1:9090')
