const service = require('../service/label.service');

const verifyLabelExists = async (ctx, next) => {
    // 1.取出要添加的所有标签
    const { labels } = ctx.request.body;

    // 2.判断每一个标签在 label表 中是否存在
    const newLabels = [];
    for (let name of labels) {
        // 这里放回的是一个数组，就算是没有查到也会返回一个空的数组；
        const labelResult = await service.getLabelByName(name);

        const label = { name };
        if (!labelResult[0]) {
            const result = await service.create(name);
            label.id = result.insertId;
        } else {
            label.id = labelResult[0].id;
        }
        newLabels.push(label);
    }


    ctx.labels = newLabels;
    await next();
}


module.exports = {
    verifyLabelExists
}