const response = {
    userId : '',
    userName : '',
    authenticate : false,
    token : '',
}

exports.check = (ctx) => {
    ctx.body = {
        authenticated : false
    }
}

exports.login = (ctx) => {

    const { userId , userPw } = ctx.request.body

    const newResponse = { ...response }
    if(userId === "daljin" && userPw === "daljin") {
        newResponse.userId = userId
        newResponse.userName = 'daljin'
        newResponse.authenticate = true
        newResponse.token = 'daljin'
    }

    ctx.session.authenticate = true;
    ctx.session.save()
    ctx.body = newResponse;
}

exports.logout = (ctx) => {

    if(ctx.session.authenticate) {
        console.log("logged")
    }
    else {
        console.log("not logged")
    }

    ctx.body = { ...response } 
    
}

exports.tokenVerify = (ctx) => {
    

}
