const fs = require('fs')
const hyperstream = require('hyperstream')
const vdom = require('virtual-dom-stream')
const gzip = require('oppressor')

module.exports = ui => (req, res) => {
  const hs = hyperstream({
    '#app': {
      _appendHtml: vdom(ui)
    }
  })

  fs.createReadStream('./browser/index.html')
    .pipe(hs)
    .pipe(gzip(req))
    .pipe(res)
}
