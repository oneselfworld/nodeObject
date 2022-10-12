const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });


const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')

const {
    create,
    detail,
    list,
    update,
    remove,
    addLabels,
    fileInfo
} = require('../controller/moment.controller');

const {
    verifyLabelExists
} = require('../middleware/label.middleware')

// 发表动态前先验证登录
momentRouter.post('/', verifyAuth, create);

//获取动态列表 
momentRouter.get('/', list);
// 获取某一条动态
momentRouter.get('/:momentId', detail);

// 修改动态 #verifyPermission
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);

// 删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove);

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels);

// 动态配图服务
momentRouter.get('/images/:filename', fileInfo);

module.exports = momentRouter;