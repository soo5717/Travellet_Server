const { Budget } = require('../models');
const { exchange } = require('../modules/exchange');

module.exports = {
    createBudget: async (planId, currency, price, memo, category) => {
        try {  
            //한국 통화로 변환
            const priceKrw = await exchange(price, currency, 'KRW');

            await Budget.create({
                plan_id: planId,
                currency: currency,
                price: price,
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
                attributes: { exclude: ['PlanId'] } //특정 속성 제외
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    updateBudget: async (id, currency, price, memo, category) => {
        try {
            //한국 통화로 변환
            const priceKrw = await exchange(price, currency, 'KRW');
            
            const result = await Budget.update({
                currency: currency,
                price: price,
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