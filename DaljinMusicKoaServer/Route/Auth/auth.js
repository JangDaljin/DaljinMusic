const Router = require('koa-router')

const auth = new Router();
const authCtrl = require('./authctrl')

auth.post('/' , authCtrl.check)
auth.post('/login' , authCtrl.login)
auth.post('/logout' , authCtrl.logout)
auth.post('/tokenverify' , authCtrl.tokenVerify)
module.exports = auth;