const Router = require('koa-router');

const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')


const {
    create,
    reply,
    update,
    remove,
    list
} = require('../controller/commment.controller')

const commentRouter = new Router({ prefix: '/comment' });

// verfyAuth:验证是否已登录
// 发表评论
commentRouter.post('/', verifyAuth, create);
// 回复评论
commentRouter.post('/:commentId/reply', verifyAuth, reply);
// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update);
// 删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove);

// 获取评论列表
commentRouter.get('/', list);


module.exports = commentRouter;