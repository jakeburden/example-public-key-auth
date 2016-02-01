const sodium = require('sodium').api
const body = require('body/any')

module.exports = db => (req, res) => {
  body(req, res, (err, params) => {
    if (err) return console.error(err)
    const sig = params.signature
    const msg = params.message
    const publicKey = params.publicKey
    db.get(publicKey, (err, user) => {
      if (err) return console.error(err)
      const verify = sodium.crypto_sign_verify_detached(sig, msg, user.publicKey)
      if (verify) {
        db.put(publicKey, msg, err => {
          if (err) return console.error(err)
        })
      }
    })
  })
}

