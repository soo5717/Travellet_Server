const { User } = require('../models')

module.exports = { 
    signUp: async (email, pwd, name, country) => {
        try{
            await User.create({
                email: email,
                pwd: pwd,
                name: name,
                country: country
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
                    email: email
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
                    id: id
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
                name: name 
            },
            {
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
    deleteProfile: async (id) => {
        try {
            const result = await User.destroy({
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
};