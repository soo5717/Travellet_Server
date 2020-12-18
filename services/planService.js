const { Plan } = require('../models');

module.exports = {
    createPlan: async (date, time, place, memo, category, transport, mapx, mapy, travelId) => {
        try {
            await Plan.create({
                date: date,
                time: time,
                place: place,
                memo: memo,
                category: category,
                transport: transport,
                x: mapx,
                y: mapy,                
                travel_id: travelId
            });            
        } catch (e) {
            throw e;
        }
    }

}