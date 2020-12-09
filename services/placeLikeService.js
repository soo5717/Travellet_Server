const { Like } = require('../models');

module.exports = {
    createPlaceLike: async (userId, contentId) => {
        try {
            await Like.create({
                user_id: userId,
                contentId: contentId,
            });
        } catch (error) {
            throw error;
        }
    },

    deletePlaceLike: async (userId, contentId) => {
        try {
            await Like.delete({
                user_id: userId,
                contentId: contentId,
            });
        } catch (error) {
            throw error;
        }
    }
}