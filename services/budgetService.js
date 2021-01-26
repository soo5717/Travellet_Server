const { Budget } = require('../models');

module.exports = {
    createBudget: async (planId, currency, price, priceTo, priceKrw, memo, category) => {
        try {
            await Budget.create({
                plan_id: planId,
                currency: currency,
                price: price,
                priceTo: priceTo,
                priceKrw: priceKrw,
                memo: memo,
                category: category
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    },    
    readBudget: async (planId) => {
        try {
            const result = await Budget.findAll({
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
    readBudgetSum: async (planId) => {
        try {
            const result = await Budget.sum('price_krw',{
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
    readBudgetDetail: async (id) => {
        try {
            const result = await Budget.findOne({
                where: {
                    id: id
                },
                attributes: { exclude: ['priceKrw', 'payment', 'PlanId', 'plan_id'] } //특정 속성 제외
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    updateBudget: async (id, currency, price, priceTo, priceKrw, memo, category) => {
        try {
            //한국 통화로 변환
            const priceKrw = await exchange(price, currency, 'KRW');
            
            const result = await Budget.update({
                currency: currency,
                price: price,
                priceTo: priceTo,
                priceKrw: priceKrw,
                memo: memo,
                category: category},
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
    deleteBudget: async (id) => {
        try {
            const result = await Budget.destroy({
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