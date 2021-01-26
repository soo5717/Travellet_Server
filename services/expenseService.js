const { Expense } = require('../models');

module.exports = {
    createExpense: async (planId, currency, price, priceTo, priceKrw, memo, category, payment) => {
        try {
            await Expense.create({
                plan_id: planId,
                currency: currency,
                price: price,
                priceTo: priceTo,
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
                attributes: { exclude: ['PlanId', 'plan_id'] } //특정 속성 제외
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readExpenseSum: async (planId) => {
        try {
            const result = await Expense.sum('price_krw',{
                where: {
                    plan_id: planId
                } 
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readExpenseDetail: async (id) => {
        try {
            const result = await Expense.findOne({
                where: {
                    id: id
                },
                attributes: { exclude: ['priceKrw', 'PlanId', 'plan_id'] } //특정 속성 제외
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    updateExpense: async (id, currency, price, priceTo, priceKrw, memo, category, payment) => {
        try {
            const result = await Expense.update({
                currency: currency,
                price: price,
                priceTo: priceTo,
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