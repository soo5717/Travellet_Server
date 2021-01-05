const { Expense, Plan, sequelize } = require('../models');
const { exchange } = require('../modules/exchange');
const travelService = require('./travelService');

// CUD 할 때, price를 priceKrw로 변환하여 travels 테이블의 sumExpense를 변경하여야 함.
module.exports = {
    createExpense: async (planId, currency, price, memo, category, payment) => {
        try {
            //한국 통화로 변환
            const priceKrw = await exchange(price, currency, 'KRW');

            await Expense.create({
                plan_id: planId,
                currency: currency,
                price: price,
                priceKrw: priceKrw,
                memo: memo,
                category: category,
                payment: payment
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readExpense: async (planId) => {
        try {
            const result = await Expense.findAll({
                where: {
                    plan_id: planId
                },
                attributes: { exclude: ['PlanId'] } //특정 속성 제외
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    updateExpense: async (id, currency, price, memo, category, payment) => {
        try {
            //한국 통화로 변환
            const priceKrw = await exchange(price, currency, 'KRW');  
            
            const result = await Expense.update({
                currency: currency,
                price: price,
                priceKrw: priceKrw,
                memo: memo,
                category: category,
                payment: payment},
            {
                where: {
                    id: id
                }
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    deleteExpense: async (id) => {
        try {
            const result = await Expense.destroy({
                where: {              
                    id: id
                }
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}