const { Plan } = require('../models');

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
                where: {
                    travel_id: travelId
                },
                attributes: ['date', 'time', 'place', 'memo', 'category', 'transport', 'x', 'y']
            });
            return result;
        } catch(e) {
            throw e;
        }
    },

    updatePlan: async (date, time, place, memo, category, transport, x, y, travelId) => {
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
                    travel_id: travelId
                }
            }); 
            return result;           
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

}