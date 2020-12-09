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
        } catch(e) {
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
        } catch(e) {
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
        } catch(e) {
            throw e;
        }
    },
    updateProfile: async (id, name, country) => {
        try {
            const result = await User.update({
                name: name,
                country: country},
            {
                where: {
                    id: id
                }
            });
            return result;
        } catch(e) {
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
        } catch(e) {
            throw e;
        }
    }
};