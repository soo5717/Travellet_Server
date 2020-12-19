const { Like } = require('../models');

//좋아요^^
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
                },
                attributes: ['contentId']
            });
            return result;
        } catch(e) {
            throw e;
        }
    }
}