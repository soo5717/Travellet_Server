const { Expense } = require('../models');

module.exports = {
    createExpense: async (PlanId, currency, price, priceTo, priceKrw, memo, category, payment) => {
        try {
            await Expense.create({
                PlanId,
                currency,
                price,
                priceTo,
                priceKrw,
                memo,
                category,
                payment
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readExpense: async (PlanId) => {
        try {
            const result = await Expense.findAll({
                where: {
                    PlanId
                },
                attributes: { exclude: ['PlanId'] } //특정 속성 제외
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readExpenseSum: async (PlanId) => {
        try {
            const result = await Expense.sum('priceKrw',{
                where: {
                    PlanId
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
                    id
                },
                attributes: { exclude: ['priceKrw', 'PlanId'] } //특정 속성 제외
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
                currency,
                price,
                priceTo,
                priceKrw,
                memo,
                category,
                payment
            },
            {
                where: {
                    id
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
                    id
                }
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}