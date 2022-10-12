const errorType = require('../constants/error-types');
const service = require('../service/user.service');
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
    // 1.获取用户名 密码
    const { name, password } = ctx.request.body;
    // 2、判断是否为空
    if (!name || !password) {
        const error = new Error(errorType.NAME_OE_PASSWORD_IS_REQUIRED);
        // 发射emit时需要加上事件类型，
        return ctx.app.emit('error', error, ctx);
    }
    // 3、判断用户名是否存在
    const result = await service.getUserByName(name);
    if (result.length) {
        const error = new Error(errorType.USER_ALREADY_EXISTS);

        return ctx.app.emit('error', error, ctx);
    }


    await next();
}


const handlePassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    ctx.request.body.password = md5password(password.toString());

    await next();
}

module.exports = {
    verifyUser,
    handlePassword
}