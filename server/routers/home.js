const router = require('koa-router')()
const indexController = require('../controllers/index')

module.exports = router.get('/', indexController)