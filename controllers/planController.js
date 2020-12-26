const planService = require('../services/planService');
const rb = require('../modules/responseBody');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');

module.exports = {
    createPlan: async (req, res) => {
        const { date, time, place, memo, category, transport, x, y, travelId } = req.body; 
        
        if(!date || !time || !place || !memo || !category || !transport || !travelId){
           return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }

        try {
            await planService.createPlan(date, time, place, memo, category, transport, x, y, travelId);
            return res.status(sc.CREATED).send(rb.success(sc.CREATED, rm.PLAN_CREATE_SUCCESS));
                        
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PLAN_CREATE_FAIL));
        }
    },

    readPlan: async (req, res) => {
        try {
            //console.log(req.query.travelid);
            const result = await planService.readPlan(req.query.travelid);
            return res.status(sc.OK).send(rb.successData(sc.OK, rm.PLAN_READ_SUCCESS, result));
        
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PLAN_READ_FAIL));
        }
    },

    updatePlan: async (req, res) => {
        const { date, time, place, memo, category, transport, x, y } = req.body;
        if(!date || !time || !place || !memo || !category || !transport ){
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
         }
 
        try {
            const result = await planService.updatePlan(date, time, place, memo, category, transport, x, y, req.params.id);
            return res.status(sc.OK).send(rb.success(sc.OK, rm.PLAN_UPDATE_SUCCESS));
            
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PROFILE_UPDATE_FAIL));
        }
    }
}