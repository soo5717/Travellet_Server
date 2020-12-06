const jwt = require('jsonwebtoken');
const { secretKey, options } = require('../config/secretKey');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    sign: async (user) => {
        const payload = {
            id: user.id,
            name: user.name
        };
        const token = {
            accessToken: jwt.sign(payload, secretKey, options)
        };
        console.log(token);
        return token;
    },
    verify: async (token) => {
        let decode;
        try{
            decode = jwt.verify(token, secretKey);
            return decode;
        } catch(e) {
            if(e.message === 'jwt expired'){
                console.log('expired token');
                return TOKEN_EXPIRED;
            } else if(e.message === 'invalid token') {
                console.log('invalid token');
                return TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return TOKEN_INVALID;
            }
        }
    }
}