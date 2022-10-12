const Router = require('koa-router');

const {
    verifyAuth
} = require('../middleware/auth.middleware');

const {
    avatarHandler,
    pictureHandler
} = require('../middleware/file.middleware');

const {
    saveAvatarInfo,
    savePictureInfo
} = require('../controller/file.controller')

const fileRouter = new Router({ prefix: '/upload' });

// 用户头像
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo);
// 动态配图
fileRouter.post('/picture', verifyAuth, pictureHandler, savePictureInfo);


module.exports = fileRouter;

