const fs = require('fs');

const momentService = require('../service/moment.service');
const fileService = require('../service/file.service');
const { PICTURE_PATH } = require('../constants/file-path');

class MomentController {
    async create (ctx, next) {
        const userId = ctx.user.id;
        const content = ctx.request.body.content;
        const result = await momentService.create(userId, content);
        ctx.body = result
    }
    async detail (ctx, next) {
        // 1、获取动态id
        const momentId = ctx.params.momentId;

        // 2、根据id去查询这条数据
        const result = await momentService.getMomentById(momentId);

        ctx.body = result;
    }
    async list (ctx, next) {
        //1 获取数据（offset,size）
        const { offset, size } = ctx.query;
        //2 查询列表
        const result = await momentService.getMomentList(offset, size);
        ctx.body = result;
    }

    async update (ctx, next) {
        // 获取文章id 修改后的内容；
        const { momentId } = ctx.params;
        const content = ctx.request.body.content;

        const result = await momentService.update(content, momentId);
        ctx.body = result;
    }

    async remove (ctx, next) {
        console.log(111);
        const { momentId } = ctx.params;

        const result = await momentService.remove(momentId);
        ctx.body = result;
    }

    // 给动态添加标签
    async addLabels (ctx, next) {
        // 1、获取标签和动态id
        const { labels } = ctx;
        console.log(labels)
        const { momentId } = ctx.params;

        // 2、遍历添加所有的标签
        for (let label of labels) {
            // 2.1 判断标签是否已经和动态存在对应关系；
            const isExist = await momentService.hasLabel(momentId, label.id);
            if (!isExist) {
                await momentService.addLabel(momentId, label.id);
            }
        }
        ctx.body = '添加动态对应标签成功！';
    }

    // 动态配图
    async fileInfo (ctx, next) {
        const { filename } = ctx.params;
        const fileInfo = await fileService.getFileByFilename(filename);

        ctx.response.set('content-type', fileInfo.mimetype);
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
    }
}

module.exports = new MomentController();