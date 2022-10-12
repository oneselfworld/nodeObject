const fs = require('fs');

const useService = require('../service/user.service');
const fileService = require('../service/file.service');

const { AVATAR_PATH } = require('../constants/file-path');

class UserController {
    async create (ctx, next) {
        // 获取参数
        const user = ctx.request.body;

        // 查询数据
        const result = await useService.create(user);

        // 放回数据
        // ctx.body = 'success'
        ctx.body = result
    }

    async avatarInfo (ctx, next) {
        // 1.获取id 查询头像文件
        const { userId } = ctx.params;
        const avatarInfo = await fileService.getAvatarByUserId(userId);

        // 设置response属性 这样才能在浏览器中直接查看。
        ctx.response.set('content-type', avatarInfo.mimetype);
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
    }
}

// new 类 => {} 所以exports出去的就是一个{}
module.exports = new UserController();