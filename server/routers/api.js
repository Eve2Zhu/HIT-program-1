const router = require('koa-router')()
const apiController = require('../controllers/api')

const routers = router
  .get('/xf/tts', apiController.ttsXF)


module.exports = routers