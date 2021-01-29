const { Plan, Travel, Budget, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const query = require('../modules/query');
const { transportExp } = require('../modules/transportExpense');

module.exports = {
    createPlan: async (plan) => {
        console.log(plan);
        try {
            await Plan.create(plan, {
                include: [
                    {
                        model: Budget
                    }                    
            ]});            
        } catch (e) {
            throw e;
        }
    },    
    
    calculateTransport: async(planId, sx, sy, ex, ey, pathType) => {
        try { 
            const transport = await transportExp(sx, sy, ex, ey, pathType);
            //교통비 환전은 어케함?
            //const price = await exchange(transport, 'KRW', 'KRW');
            await Budget.update({
                price: transport,
                priceKrw: transport,},
            {
                where: {
                    plan_id: planId,
                    category: 6
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