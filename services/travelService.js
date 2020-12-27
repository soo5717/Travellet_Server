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
    readTravel: async (userId, type, date) => {
        try {
            const whereDate = new Date(date);
            let op = null;
            if(type) { 
                op = { [Op.gte] : whereDate }     
            } else { 
                op = { [Op.lt] : whereDate }
            }
            const result = await Travel.findAll({
                where: {
                    user_id: userId,
                    startDate: op
                }, 
                attributes: ['id', 'title', 'startDate', 'endDate', 'budget', 'sumBudget', 'sumExpense']
            });
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