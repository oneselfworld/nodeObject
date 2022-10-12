const Router = require('koa-router');

const {
    create,
    avatarInfo
} = require('../controller/user.controller');

const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')

const {
    verifyUser,
    handlePassword
} = require('../middleware/user.middleware');

const userRouter = new Router({ prefix: '/users' });

// 注册是在这个文件，但是具体的处理逻辑就抽取到controller文件去
userRouter.post('/', verifyUser, handlePassword, create);
// userRouter.get('/:userId/avatar', verifyAuth, verifyPermission, avatarInfo);
userRouter.get('/:userId/avatar', avatarInfo);

module.exports = userRouter;