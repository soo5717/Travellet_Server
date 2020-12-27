const { Plan } = require('../models');
const { Budget } = require('../models');
const { Expense } = require('../models');

module.exports = {
    createPlan: async (date, time, place, memo, category, transport, x, y, travelId) => {
        try {
            await Plan.create({
                date: date,
                time: time,
                place: place,
                memo: memo,
                category: category,
                transport: transport,
                x: x,
                y: y,                
                travel_id: travelId
            });            
        } catch (e) {
            throw e;
        }
    },

    readPlan: async (travelId) => {
        try {
            const result = await Plan.findAll({
                include: [
                    {
                        model: Budget, 
                        attributes: ['priceKrw']
                    },
                    {
                        model: Expense,
                        attributes: ['priceKrw']
                    }
                ],
                where: {
                    travel_id: travelId
                },
                attributes: ['id', 'date', 'time', 'place', 'memo', 'category', 'transport', 'x', 'y', 'priceKrw', 'priceKrw']
            });            
            return result;
        } catch(e) {
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