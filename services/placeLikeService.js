const { Like } = require('../models');

module.exports = {
    createPlaceLike: async (UserId, contentId) => {
        try {
            await Like.create({
                UserId,
                contentId
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    readPlaceLike: async (UserId) => {
        try {
            const result = await Like.findAndCountAll({
                where: {
                    UserId
                },
                attributes: ['contentId']
            });
            return result;
        } catch(e) {
            console.error(error);
            throw e;
        }
    },
    deletePlaceLike: async (UserId, contentId) => {
        try {
            await Like.destroy({
                where: {                    
                    UserId,
                    contentId
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}