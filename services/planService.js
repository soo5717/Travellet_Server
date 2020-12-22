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

    readPlan: async (userId, travelId) => {
        try {
            const result = await Plan.findAndCountAll({
                where: {
                    user_id: userId,
                    travel_id: travelId
                },
                attributes: ['date', 'time', 'place', 'memo', 'category', 'transport', 'x', 'y']
            });
            return result;
        } catch(e) {
            throw e;
        }
    }

}