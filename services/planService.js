const { QueryTypes } = require('sequelize');
const { Plan, Travel, Budget, sequelize } = require('../models');
const { transportExp } = require('../modules/transportExpense');
const query = require('../modules/query');
const userService = require('./userService');

module.exports = {  
    createPlan: async (plan) => {
        try {
            await Plan.create(plan, {
                include: [{
                    model: Budget,
                    model: Budget
                }]
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    },    
    readPlanDetail: async (id) => {
        try {
            const result = await Plan.findOne({
                include: [
                    {
                        model: Travel,
                        attributes: ['startDate']
                    }
                ],
                where: {
                    id
                },
                attributes: ['id', 'date', 'place', 'memo'],
                raw: true
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readPlan: async (TravelId) => {
        try {
            const options = {
                replacements: {
                    TravelId
                },
                type: QueryTypes.SELECT
            }
            const result = await sequelize.query(query.readPlan(), options);
            return result;
        } catch(e) {
            console.error(e);
            throw e;
        }
    },
    updatePlan: async (date, time, place, memo, category, transport, x, y, id) => {
        try {
            await Plan.update({
                date,
                time,
                place,
                memo,
                category,
                transport,
                x,
                y
            },
            {
                where : {
                    id
                }
            });         
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    deletePlan: async (id) => {
        try {
            await Plan.destroy({
                where : {
                    id
                }
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    calculateTransport: async(UserId, PlanId, sx, sy, ex, ey, pathType, memo) => {
        try { 
            const transport = await transportExp(sx, sy, ex, ey, pathType);  
            const { rateTo, rateKrw } = await userService.readExchangeRate(UserId, 'KRW');

            await Budget.update({
                currency: 'KRW',
                price: transport,
                priceTo: (transport*rateTo).toFixed(2),
                priceKrw: Math.round(transport*rateKrw),
                memo
            },
            {
                where: {
                    PlanId,
                    category: 5
                }
            });
            return transport;
        } catch(e) {
            console.error(e);
            throw e;
        }
    }
}