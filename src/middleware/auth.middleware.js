const jwt = require('jsonwebtoken');

const errorType = require('../constants/error-types');
const userService = require('../service/user.service');
const authService = require('../service/auth.service');
const md5password = require('../utils/password-handle');
const { PRIVATE_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
    // 1、获取用户名和密码
    const { name, password } = ctx.request.body;

    // 2、判断用户名和密码是否为空
    if (!name || !password) {
        const error = new Error(errorType.NAME_OE_PASSWORD_IS_REQUIRED);
        // 发射emit时需要加上事件类型，
        return ctx.app.emit('error', error, ctx);
    }
    // 3、判断用户是否存在
    const result = await userService.getUserByName(name);
    const user = result[0];
    console.log(user);
    //用户不存在时直接返回错误信息
    if (!user) {
        const error = new Error(errorType.USER_DOES_NOT_EXISTS);

        return ctx.app.emit('error', error, ctx);
    }
    // 4.判断密码是否和数据库中的密码是一致的（）
    if (md5password(password) !== user.password) {
        const error = new Error(errorType.PASSWORD_IS_INCORRENT);
        return ctx.app.emit('error', error, ctx);
    }

    ctx.user = user;
    await next();
}

const verifyAuth = async (ctx, next) => {
    try {
        const authorization = ctx.headers.authorization;
        const token = authorization.replace('Bearer ', '');
        const result = jwt.verify(token, PRIVATE_KEY, {
            algorithms: ['RS256']
        })
        ctx.user = result;
        await next();
    } catch (err) {
        const error = new Error(errorType.UNAUTHORIZATION)
        ctx.app.emit('error', error, ctx);
    }


}

// 判断用户是否有修改对应动态的权限。
const verifyPermission = async (ctx, next) => {

    // 1、获取参数 文章id 当前用户id
    const [resourceKey] = Object.keys(ctx.params);
    const tableName = resourceKey.replace('Id', '');
    // 因为传过来的也可能是其他的id 所以不能使用这个方式来取值了。 const { momentId } = ctx.params; 
    const resourceId = ctx.params[resourceKey];
    const { id } = ctx.user;


    // 2、查询是否具备权限
    try {
        // const isPermission = await authService.checkMoment(momentId, id);
        const isPermission = await authService.checkResource(tableName, resourceId, id);
        // 当这个位置的判断是没有权限时，直接抛出异常，会在下面的那个err中处理
        if (!isPermission) throw new Error();
        // 有权限就放行。
        await next();

    } catch (err) {
        const error = new Error(errorType.UNPERMISSION);
        return ctx.app.emit('error', error, ctx);
    }


}

module.exports = {
    verifyLogin, verifyAuth, verifyPermission
}