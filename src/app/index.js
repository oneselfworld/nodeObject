const Koa = require('koa');

const bodyParser = require('koa-bodyparser');
const useRoutes = require('../router/index')
const errorHandle = require('./error-handle')



const app = new Koa();


app.use(bodyParser());

useRoutes(app);

// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());

// app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());



app.on('error', errorHandle);

module.exports = app;