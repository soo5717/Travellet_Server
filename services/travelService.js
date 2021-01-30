const { QueryTypes } = require('sequelize');
const { Travel, sequelize } = require('../models');
const query = require('../modules/query');

module.exports = {
    createTravel: async (UserId, title, startDate, endDate, budget) => {
        try {
            await Travel.create({
                UserId,
                title,
                startDate,
                endDate,
                budget
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readTravel: async (UserId, endDate) => {
        try {
            const options = {
                replacements: { 
                    UserId,
                    endDate
                },
                type: QueryTypes.SELECT
            }
            const upcoming = await sequelize.query(query.readTravel('>='),  options);
            const past = await sequelize.query(query.readTravel('<'), options);
            
            const result = { 
                upcoming, 
                past
            };
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    deleteTravel: async (id) => {
        try {
            const result = await Travel.destroy({
                where: {              
                    id
                }
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}