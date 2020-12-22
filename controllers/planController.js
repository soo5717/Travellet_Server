const planService = require('../services/planService');
const rb = require('../modules/responseBody');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');

module.exports = {
    readPlan: async (req, res) => {
        try {
            console.log(req.params.travelid);
            const result = await planService.readPlan(req.params.travelid);
            return res.status(sc.OK).send(rb.successData(sc.OK, rm.PLAN_READ_SUCCESS, result));
        
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PLAN_READ_FAIL));
        }
    }
}