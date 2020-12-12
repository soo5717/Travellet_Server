const { Like } = require('../models');

//좋아요를 누르는 서비스입니다^^

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