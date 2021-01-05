const expenseService = require('../services/expenseService');
const rb = require('../modules/responseBody');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');

module.exports = {
    createExpense: async(req, res) => {
        const { planId, currency, price, memo, category, payment } = req.body;
        if(!planId || !currency || !price || !memo || category === undefined || payment === undefined) {
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            await expenseService.createExpense(planId, currency, price, memo, category, payment);
            return res.status(sc.CREATED).send(rb.success(sc.CREATED, rm.EXPENSE_CREATE_SUCCESS));         
        } catch (e) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.EXPENSE_CREATE_FAIL));
        }
    },
    readExpense: async(req, res) => {
        try {
            const result = await expenseService.readExpense(req.query.planid);
            return res.status(sc.OK).send(rb.successData(sc.OK, rm.EXPENSE_READ_SUCCESS, result));          
        } catch (e) {
            console.error(e);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.EXPENSE_READ_FAIL));
        }
    },
    updateExpense: async(req, res) => {
        const { currency, price, memo, category, payment } = req.body;
        if(!currency || !price || !memo || category === undefined || payment === undefined){
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            const result = await expenseService.updateExpense(req.params.id, currency, price, memo, category, payment);
            if(!result[0]) { //업데이트 변경사항이 없는 경우
                return res.status(sc.NO_CONTENT).send();
            }
            return res.status(sc.OK).send(rb.success(sc.OK, rm.EXPENSE_UPDATE_SUCCESS));
        } catch (e) {
            console.error(e);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.EXPENSE_UPDATE_FAIL));
        }
    },
    deleteExpense: async(req, res) => {
        try {
            const result = await expenseService.deleteExpense(req.params.id);
            if(!result) { //이미 삭제된 경우
                return res.status(sc.NO_CONTENT).send();
            }
            return res.status(sc.OK).send(rb.success(sc.OK, rm.EXPENSE_DELETE_SUCCESS));              
        } catch (e) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.EXPENSE_DELETE_FAIL));
        }
    }
}