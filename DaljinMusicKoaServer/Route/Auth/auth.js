const Router = require('koa-router')

const auth = new Router();
const authCtrl = require('./authctrl')

auth.post('/' , authCtrl.check)
auth.post('/login' , authCtrl.login)
auth.post('/logout' , authCtrl.logout)

module.exports = auth;