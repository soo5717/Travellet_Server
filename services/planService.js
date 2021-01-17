const { Plan, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const query = require('../modules/query');
const { transportExp } = require('../modules/transportExpense');

module.exports = {
    createPlan: async (date, time, place, memo, category, transport, x, y, travelId) => {
        try {
            await Plan.create({
                date: date,
                time: time,
                place: place,
                memo: memo,
                category: category,
                transport: transport,
                x: x,
                y: y,                
                travel_id: travelId
            });            
        } catch (e) {
            throw e;
        }
    },

    readPlan: async (travelId) => {
        try {
            const options = {
                replacements: { 
                    travelId: travelId
                 },
                 type: QueryTypes.SELECT
            }
            const result = await sequelize.query(query.readPlan(), options);
            
                //샘플
                sx=126.9027279;
                sy=37.5349277;
                ex=126.9145430;
                ey=37.5499421;
                pathType=2;
            const test = await transportExp(sx, sy, ex, ey, pathType);
            return test;
        } catch(e) {
            console.error(e);
            throw e;
        }
    },

    updatePlan: async (date, time, place, memo, category, transport, x, y, planId) => {
        try {
            const result = await Plan.update({
                date: date,
                time: time,
                place: place,
                memo: memo,
                category: category,
                transport: transport,
                x: x,
                y: y
            },
            {
                where : {
                    id: planId
                }
            }); 
            return result;           
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    deletePlan: async (planId) => {
        try {
            await Plan.destroy({
                where : {
                    id: planId
                }
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

}