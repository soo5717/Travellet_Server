const planService = require('../services/planService');
const budgetService = require('../services/budgetService');
const expenseService = require('../services/expenseService');
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
    
    readPlanDetail: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await planService.readPlanDetail(id);
            const sumBudget = await budgetService.readBudgetSum(id);
            const sumExpense = await expenseService.readExpenseSum(id);
            const budget = await budgetService.readBudget(id);
            const expense = await expenseService.readExpense(id);

            result.sum_budget = sumBudget;
            result.sum_expense = sumExpense;
            result.budget = budget;
            result.expense = expense;
            
            return res.status(sc.OK).send(rb.successData(sc.OK, rm.PLAN_DETAIL_READ_SUCCESS, result));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PLAN_DETAIL_READ_FAIL));
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
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PLAN_UPDATE_FAIL));
        }
    },

    deletePlan: async (req, res) => {
        try{
            const result = await planService.deletePlan(req.params.id);
            return res.status(sc.NO_CONTENT).send(rb.successData(sc.NO_CONTENT, rm.PLAN_DELETE_SUCCESS, result));
        } catch(error) {
            console.error(error);
            return res.statussc(INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PLAN_DELETE_FAIL));
        }
    }
   
}