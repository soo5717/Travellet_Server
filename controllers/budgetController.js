const budgetService = require('../services/budgetService');
const rb = require('../modules/responseBody');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');

module.exports = {
    createBudget: async(req, res) => {
        const { planId, currency, price, memo, category } = req.body;
        if(!planId || !currency || !price || !memo || !category){
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            await budgetService.createBudget(planId, currency, price, memo, category);
            return res.status(sc.CREATED).send(rb.success(sc.CREATED, rm.BUDGET_CREATE_SUCCESS));         
        } catch (e) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.BUDGET_CREATE_FAIL));
        }
    },
    readBudget: async(req, res) => {
        try {
            const result = await budgetService.readBudget(req.query.planid);
            if(Array.isArray(result) && !result.length){
                return res.status(sc.NO_CONTENT).send();
            }
            return res.status(sc.OK).send(rb.successData(sc.OK, rm.BUDGET_READ_SUCCESS, result));          
        } catch (e) {
            console.error(e);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.BUDGET_READ_FAIL));
        }
    },
    updateBudget: async(req, res) => {
        const { currency, price, memo, category } = req.body;
        if(!currency || !price || !memo || !category){
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            const result = await budgetService.updateBudget(req.params.id, currency, price, memo, category);
            if(!result[0]){
                return res.status(sc.NO_CONTENT).send();
            }
            return res.status(sc.OK).send(rb.success(sc.OK, rm.BUDGET_UPDATE_SUCCESS));
        } catch (e) {
            console.error(e);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.BUDGET_UPDATE_FAIL));
        }
    },
    deleteBudget: async(req, res) => {
        try {
            await budgetService.deleteBudget(req.params.id);
            return res.status(sc.OK).send(rb.success(sc.OK, rm.BUDGET_DELETE_SUCCESS));              
        } catch (e) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.BUDGET_DELETE_FAIL));
        }
    }
}