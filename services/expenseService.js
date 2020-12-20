const { Expense, Plan, sequelize } = require('../models');
const { exchange } = require('../modules/exchange');
const planService = require('./planService');
const travelService = require('./travelService');

// CUD 할 때, price를 priceKrw로 변환하여 travels 테이블의 sumExpense를 변경하여야 함.
module.exports = {
    createExpense: async (planId, currency, price, memo, category, payment) => {
        try {
            //한국 통화로 변환
            const priceKrw = await exchange(price, currency, 'KRW');
            const { travel_id } = await Plan.findByPk(planId);
            
            /*  트랜잭션을 사용해서 지출 추가 시, 여행 지출 합을 변경하도록 했는데,
                속도가 너무 느린 문제가 있어서 어떻게 해야할지 모르겠다.
                트리거(or Hook)을 만들거나 뷰를 생성해야 하나? */
            await sequelize.transaction(async (t) => {
                await Expense.create({
                    plan_id: planId,
                    currency: currency,
                    price: price,
                    priceKrw: priceKrw,
                    memo: memo,
                    category: category,
                    payment: payment
                }, {transaction : t});

                await travelService.updateSumExpense(travel_id, priceKrw, '+');
            });
        } catch (e) {
            throw e;
        }
    },
    readExpense: async (planId) => {
        try {
            
        } catch (e) {
            throw e;
        }
    },
    updateExpense: async (id, currency, price, memo, category, payment) => {
        try {
            
        } catch (e) {
            throw e;
        }
    },
    deleteExpense: async (id) => {
        try {
            const { plan_id, priceKrw } = await Expense.findByPk(id);
            const { travel_id } = await Plan.findByPk(plan_id);
            
            await sequelize.transaction(async (t) => {
                
                await Expense.destroy({
                    where: {              
                        id: id
                    },
                    transaction : t
                });
                await travelService.updateSumExpense(travel_id, priceKrw, '-');
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}