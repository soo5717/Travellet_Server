const { User } = require('../models')
const { exchangeRate } = require('../modules/exchange');

module.exports = { 
    signUp: async (email, pwd, name, country) => {
        try{
            await User.create({
                email,
                pwd,
                name,
                country
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    signIn: async (email) => {
        try{
            const result = await User.findOne({
                where: {
                    email
                }
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readProfile: async (id) => {
        try {
            const result = await User.findOne({
                where: {
                    id
                },
                attributes: ['email', 'name', 'country']
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    updateProfile: async (id, name) => {
        try {
            const result = await User.update({
                name
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
    deleteProfile: async (id) => {
        try {
            const result = await User.destroy({
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
    readExchangeRate: async (id, base) => {
        try {
            const user = await User.findByPk(id);
            const currency = user.country.slice(-3); //문자열 자르기
            
            let result = await exchangeRate(base, currency);
            result.currency = currency;
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    readCurrency: async (id) => {
        try {
            const user = await User.findByPk(id);
            return  user.country.slice(-3); //문자열 자르기
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
};