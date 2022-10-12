const errorTypes = require('../constants/error-types');

const errorHandle = (error, ctx) => {
    let status, message;
    switch (error.message) {
        case errorTypes.NAME_OE_PASSWORD_IS_REQUIRED:
            status = 400; //请求错误 参数问题时可用这个。
            message = '用户名或密码不能为空~';
            break;
        case errorTypes.USER_ALREADY_EXISTS:
            status = 409; //冲突问题时可用这个。
            message = '用户名已存在！';
            break;
        case errorTypes.USER_DOES_NOT_EXISTS:
            status = 400; //参数问题
            message = '用户不存在！';
            break;
        case errorTypes.PASSWORD_IS_INCORRENT:
            status = 400; //参数问题
            message = '密码错误！';
            break;
        case errorTypes.UNAUTHORIZATION:
            status = 401; //token无效
            message = '无效的token';
            break;
        case errorTypes.UNPERMISSION:
            status = 401; //token无效
            message = '您暂无操作权限！';
            break;

        default:
            status = 404;
            message = "NOT FOUND";
    }
    ctx.status = status;
    ctx.body = message;
}

module.exports = errorHandle;