const { Travel, sequelize } = require('../models');
const { Op, QueryTypes } = require('sequelize');
const query = require('../modules/query');

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
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readTravel: async (userId, date) => {
        try {
            const options = {
                replacements: { 
                    userId: userId,
                    date: date
                 },
                 type: QueryTypes.SELECT
            }
            const upcoming = await sequelize.query(query.readTravel('>='),  options);
            const past = await sequelize.query(query.readTravel('<'), options);
            
            const result = { 
                upcoming: upcoming, 
                past: past
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
                    id: id
                }
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}