const { Travel, sequelize } = require('../models');
const { Op } = require('sequelize');

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
            const whereDate = new Date(date);
            const upcoming = await Travel.findAll({
                where: {
                    user_id: userId,
                    startDate: { [Op.gte] : whereDate }
                }, 
                attributes: ['id', 'title', 'startDate', 'endDate', 'budget', 'sumBudget', 'sumExpense']
            });
            const past = await Travel.findAll({
                where: {
                    user_id: userId,
                    startDate: { [Op.lt] : whereDate }
                }, 
                attributes: ['id', 'title', 'startDate', 'endDate', 'budget', 'sumBudget', 'sumExpense']
            });
            
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
    },
    updateSumBudget: async (id, priceKrw, operator) => {
        try {
            await Travel.update({
                sumBudget: sequelize.literal(`sum_budget${operator}${priceKrw}`)},
            {
                where: {
                    id: id
                }
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    updateSumExpense: async (id, priceKrw, operator) => {
        try {
            await Travel.update({
                sumExpense: sequelize.literal(`sum_expense${operator}${priceKrw}`)},
            {
                where: {
                    id: id
                }
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}