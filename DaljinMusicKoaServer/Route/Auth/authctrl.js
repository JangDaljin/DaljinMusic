exports.check = (ctx) => {
    ctx.body = {
        authenticated : false
    }
}

exports.login = (ctx) => {

    const { userid , userpw } = ctx.request.body

    let response = {
        authenticated : false
    }

    if(userid === "daljin" && userpw === "daljin") {
        response.authenticated = true;
    }

    ctx.body = response;
}

exports.logout = (ctx) => {
    ctx.body = {
        authenticated : false
    }
}