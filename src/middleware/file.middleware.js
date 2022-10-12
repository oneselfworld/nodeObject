const Multer = require('koa-multer');
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path');


const avatarUpload = Multer({
    dest: AVATAR_PATH
});



// 上传头像图片中间件
const avatarHandler = avatarUpload.single('avatar');


const pictureUpload = Multer({
    dest: PICTURE_PATH
});
// 上传动态配图中间件
const pictureHandler = pictureUpload.array('picture', 9);

module.exports = {
    avatarHandler,
    pictureHandler
}