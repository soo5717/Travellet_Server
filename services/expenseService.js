
const { Expense, Plan, Sequelize } = require('../models');

module.exports = {
    createExpense: async (PlanId, currency, price, priceTo, priceKrw, memo, category, payment) => {
        try {
            await Expense.create({
                PlanId,
                currency,
                price,
                priceTo,
                priceKrw,
                memo,
                category,
                payment
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readExpense: async (PlanId) => {
        try {
            const result = await Expense.findAll({
                where: {
                    PlanId
                },
                attributes: { exclude: ['PlanId'] } //특정 속성 제외
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readExpenseSum: async (PlanId) => {
        try {
            const result = await Expense.sum('priceKrw',{
                where: {
                    PlanId
                } 
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readExpenseDetail: async (id) => {
        try {
            const result = await Expense.findOne({
                where: {
                    id
                },
                attributes: { exclude: ['priceKrw', 'PlanId'] } //특정 속성 제외
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    updateExpense: async (id, currency, price, priceTo, priceKrw, memo, category, payment) => {
        try {
            const result = await Expense.update({
                currency,
                price,
                priceTo,
                priceKrw,
                memo,
                category,
                payment
            },
            {
                where: {
                    id
                }
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    deleteExpense: async (id) => {
        try {
            const result = await Expense.destroy({
                where: {              
                    id
                }
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readDaily: async(TravelId) => {
        try {
            const chart = await Expense.findAll({
                include: [{
                    model: Plan,
                    attributes: [],
                    where: {
                        TravelId
                    }
                }],
                attributes: ['Plan.date', 'payment', [Sequelize.fn('SUM', Sequelize.col('priceTo')), 'priceTo' ], [Sequelize.fn('SUM', Sequelize.col('priceKrw')), 'priceKrw' ]],
                group: ['Plan.date','payment'],
                raw: true
            });

            let dateArr = [];
            for(let i = 0; i< chart.length; i++) {
                dateArr.push(chart[i].date);
            }
            const dateSet = new Set(dateArr); //배열 중복 제거
            dateArr = [...dateSet]; //배열 중복 제거
            
            let itemArr = [];
            for(let i = 0; i < dateArr.length; i++) {
                itemArr.push(await Expense.findAll({
                    include: [{
                        model: Plan,
                        attributes: [],
                        where: {
                            TravelId,
                            date: dateArr[i]
                        }
                    }],
                    attributes: ['Plan.date', 'memo', 'category', 'payment', 'priceTo', 'priceKrw'],
                    raw: true
                }));
            }
            return { chart, date: dateArr, item: itemArr };
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readCategory: async(TravelId) => {
        try {
            
            const includeOption = {
                model: Plan,
                attributes: [ ],
                where:{
                    TravelId
                }
            };

            const result = await Expense.findAll({
                include: [ includeOption ],
                attributes: [ 'category', 'priceKrw', 'priceTo', 'memo', 'payment' ],
                group: ['category']
            });
            
            console.log(result);
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}