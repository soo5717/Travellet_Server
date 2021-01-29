const { Op } = require("sequelize");
const { Budget, Plan, Sequelize } = require('../models');

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
    },
    readBudgetDistribution: async (travelId) => {
        try {
            const includeOption = {
                model: Plan,
                attributes: [ ],
                where: {
                    travel_id: travelId
                }
            };  
            
            const sumBudget = await Budget.sum('price_krw',{
                include: [ includeOption ]
            });
            const result = await Budget.findAll({
                include: [ includeOption ],
                attributes: [ 'category', [Sequelize.fn('COUNT', 'category'), 'count' ]],
                where: {
                    price: {
                        [Op.eq]: 0   
                    }
                },
                group: ['category']
            });
            return { sum_budget: sumBudget, count_category: result };
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    updateBudgetDistribution: async () => {
        try {
            
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}