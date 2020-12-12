const { Like } = require('../models');

module.exports = {
    createPlaceLike: async (userId, contentId) => {
        try {
            await Like.create({
                user_id: userId,
                contentId: contentId
            });
        } catch (error) {
            throw error;
        }
    },

    deletePlaceLike: async (userId, contentId) => {
        try {
            await Like.destroy({
                where: {                    
                    user_id: userId,
                    contentId: contentId
                }
            });
        } catch (error) {
            throw error;
        }
    },

    readPlaceLike: async (userId) => {
        try {
            const result = await Like.findAndCountAll({
                where: {
                    user_id: userId
                }
            });
            return result;
        } catch(e) {
            throw e;
        }
    }
}