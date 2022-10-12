const fs = require('fs')

const useRoutes = (app) => {
    //获取本目录下的所有文件的导出结果，并进行挂载。
    fs.readdirSync(__dirname).forEach((file) => {
        if (file === 'index.js') return;
        const router = require(`./${file}`);
        app.use(router.routes());
        app.use(router.allowedMethods());
    })
}

module.exports = useRoutes;