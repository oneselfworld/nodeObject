const service = require('../service/label.service')

class LabelController {
    async create (ctx, next) {
        const { name } = ctx.request.body;
        const result = await service.create(name);


        ctx.body = result;
    }

    async list (ctx, next) {
        const { size, offset } = ctx.query;
        const result = await service.getLabels(size, offset);


        ctx.body = result;
    }
}

module.exports = new LabelController();