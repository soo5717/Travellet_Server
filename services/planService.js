const { Plan, Travel, Budget, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const query = require('../modules/query');
const { transportExp } = require('../modules/transportExpense');
const userService = require('./userService');

module.exports = {
    createPlan: async (date, time, place, memo, x, y, category, transport, travel_id) => {
        try {
            await Plan.create({
                date: date,
                time: time,
                place: place,
                memo: memo,
                x: x,
                y: y,
                category : category,
                transport: transport,
                travel_id: travel_id   
                }         
            );            
        } catch (e) {
            throw e;
        }
    },    
    
    calculateTransport: async(userId, planId, sx, sy, ex, ey, pathType, memo) => {
        try { 
            const transport = await transportExp(sx, sy, ex, ey, pathType);  
            const { rateTo, rateKrw } = await userService.readExchangeRate(userId, 'KRW');

            await Budget.update({
                currency: 'KRW',
                price: transport,
                priceTo: (transport*rateTo).toFixed(2),
                priceKrw: Math.round(transport*rateKrw),
                memo: memo
            },
            {
                where: {
                    plan_id: planId,
                    category: 5
                }
            });
            return transport;
        } catch(e) {
            console.error(e);
            throw e;
        }
    },

    readPlan: async (travelId) => {
        try {
            const options = {
                replacements: {
                    travelId: travelId
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

    readPlanDetail: async (id) => {
        try {
            const result = await Plan.findOne({
                include: [
                    {
                        model: Travel,
                        attributes: ['start_date']
                    }
                ],
                where: {
                    id: id
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

    updatePlan: async (date, time, place, memo, category, transport, x, y, planId) => {
        try {
            const result = await Plan.update({
                date: date,
                time: time,
                place: place,
                memo: memo,
                category: category,
                transport: transport,
                x: x,
                y: y
            },
            {
                where : {
                    id: planId
                }
            }); 
            return result;           
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    deletePlan: async (planId) => {
        try {
            await Plan.destroy({
                where : {
                    id: planId
                }
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

}