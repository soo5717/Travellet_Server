const { Travel } = require('../models');

module.exports = {
    createTravel: async (userId, title, startDate, endDate, budget) => {
        try {
            await Travel.create({
                user_id: userId,
                title: title,
                startDate: startDate,
                endDate: endDate,
                budget: budget
            });
        } catch (error) {
            throw error;
        }
    },

    deleteTravel: async (userId, travelId) => {
        try {
            await Travel.destroy({
                where: {                    
                    user_id: userId,
                    id: travelId
                }
            });
        } catch (error) {
            throw error;
        }
    },

    readProfile: async (id) => {
        try {
            const result = await User.findOne({
                where: {
                    id: id
                },
                attributes: ['title', 'startDate', 'endDate', 'budget']
            });
            return result;
        } catch(e) {
            throw e;
        }
    }
}