const { Op } = require("sequelize");
const { Budget, Plan, Sequelize } = require('../models');
const userService = require('../services/userService');

module.exports = {
    createBudget: async (PlanId, currency, price, priceTo, priceKrw, memo, category) => {
        try {
            await Budget.create({
                PlanId,
                currency,
                price,
                priceTo,
                priceKrw,
                memo,
                category
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    },    
    readBudget: async (PlanId) => {
        try {
            const result = await Budget.findAll({
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
    readBudgetSum: async (PlanId) => {
        try {
            const result = await Budget.sum('priceKrw',{
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
    readBudgetDetail: async (id) => {
        try {
            const result = await Budget.findOne({
                where: {
                    id
                },
                attributes: { exclude: ['priceKrw', 'payment', 'PlanId'] } //특정 속성 제외
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
                currency,
                price,
                priceTo,
                priceKrw,
                memo,
                category
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
    deleteBudget: async (id) => {
        try {
            const result = await Budget.destroy({
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
    readBudgetDistribution: async (TravelId) => {
        try {
            const includeOption = {
                model: Plan,
                attributes: [ ],
                where: {
                    TravelId
                }
            };  
            
            const sumBudget = await Budget.sum('priceKrw',{
                include: [ includeOption ]
            });
            const countCategory = await Budget.findAll({
                include: [ includeOption ],
                attributes: [ 'category', [Sequelize.fn('COUNT', 'category'), 'count' ]],
                where: {
                    price: {
                        [Op.eq]: 0   
                    }
                },
                group: ['category']
            });
            return { sumBudget, countCategory };
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    updateBudgetDistribution: async (UserId, TravelId, lodging, food, shopping, tourism, transport, etc) => {
        try {
            const { rateTo, rateKrw } = await userService.readExchangeRate(UserId, 'KRW');
            const arr = [ lodging, food, shopping, tourism, transport, etc ];
            
            for(let i = 0; i < arr.length; i++) {
                if(arr[i]) {
                    await Budget.update({
                        currency: 'KRW',
                        price: arr[i],
                        priceTo: (arr[i]*rateTo).toFixed(2),
                        priceKrw: Math.round(arr[i]*rateKrw)
                    },
                    {
                        include: [{
                            model: Plan,
                            attributes: [ ],
                            where: {
                                TravelId
                            }
                        }],
                        where: {
                            price: {
                                [Op.eq]: 0   
                            },
                            category: {
                                [Op.eq]: i+1
                            }
                        }
                    });
                }
            }
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}