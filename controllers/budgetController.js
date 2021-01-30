const budgetService = require('../services/budgetService');
const userService = require('../services/userService');
const rb = require('../modules/responseBody');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');

module.exports = {
    createBudget: async(req, res) => {
        const { PlanId, currency, price, priceTo, priceKrw, memo, category } = req.body;
        if(!PlanId || !currency || !price || !priceTo || !priceKrw || !memo || category === undefined) {
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            await budgetService.createBudget(PlanId, currency, price, priceTo, priceKrw, memo, category);
            return res.status(sc.CREATED).send(rb.success(sc.CREATED, rm.BUDGET_CREATE_SUCCESS));         
        } catch (e) {
            console.error(e);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.BUDGET_CREATE_FAIL));
        }
    },
    readBudgetDetail: async(req, res) => {
        try {
           const result = await budgetService.readBudgetDetail(req.params.id);
           const exchangeRate = await userService.readExchangeRate(req.decoded, result.currency);
           result.dataValues.exchangeRate = exchangeRate;
           return res.status(sc.OK).send(rb.successData(sc.OK, rm.BUDGET_DETAIL_READ_SUCCESS, result));         
        } catch (e) {
            console.error(e);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.BUDGET_DETAIL_READ_FAIL));
        }
    },
    updateBudget: async(req, res) => {
        const { currency, price, priceTo, priceKrw, memo, category } = req.body;
        if(!currency || !price || !priceTo || !priceKrw || !memo || category === undefined) {
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            const result = await budgetService.updateBudget(req.params.id, currency, price, priceTo, priceKrw, memo, category);
            if(!result[0]) { //업데이트 변경사항이 없는 경우
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
            const result = await budgetService.deleteBudget(req.params.id);
            if(!result) { //이미 삭제된 경우
                return res.status(sc.NO_CONTENT).send();
            }
            return res.status(sc.OK).send(rb.success(sc.OK, rm.BUDGET_DELETE_SUCCESS));              
        } catch (e) {
            console.error(e);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.BUDGET_DELETE_FAIL));
        }
    },
    readBudgetDistribution: async (req, res) => {
        try {
            const result = await budgetService.readBudgetDistribution(req.query.travelid);
            return res.status(sc.OK).send(rb.successData(sc.OK, rm.BUDGET_DISTRIBUTION_READ_SUCCESS, result));              
        } catch (e) {
            console.error(e);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.BUDGET_DISTRIBUTION_READ_FAIL));
        }
    },
    updateBudgetDistribution: async (req, res) => {
        const { TravelId, lodging, food, shopping, tourism, transport, etc } = req.body;
        if(!TravelId) {
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            await budgetService.updateBudgetDistribution(req.decoded, TravelId, lodging, food, shopping, tourism, transport, etc);
            return res.status(sc.OK).send(rb.success(sc.OK, rm.BUDGET_DISTRIBUTION_UPDATE_SUCCESS));
        } catch (e) {
            console.error(e);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.BUDGET_DISTRIBUTION_UPDATE_FAIL));
        }
    }
}