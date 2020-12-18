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

    deleteTravel: async (travelId) => {
        try {
            await Travel.destroy({
                where: {              
                    id: travelId
                }
            });
        } catch (error) {
            throw error;
        }
    },

    readTravel: async (userId) => {
        try {
            const result = await Travel.findAndCountAll({
                where: {
                    user_id: userId
                }, attributes: ['user_id', 'title', 'startDate', 'endDate', 'budget']
            });
            return result;
        } catch(e) {
            throw e;
        }
    },

    readTravelId: async (userId, travelId) => {
        try{
            const result = await Travel.findOne({
                where: {
                    user_id: userId,
                    id: travelId
                }
                // attributes: ['user_id', 'title', 'startDate', 'endDate', 'budget']
            });
            return result;
        } catch(e) {
            throw e;
        }
    }
}