const { Plan } = require('../models');

module.exports = {

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
    }

}