const request = require('request-promise-native');
const API_KEY1 = 'S6LXq53cobz1IDLXVy7i/ew6QUkR1zT9Z/5J3rI4Av8';
const API_KEY2 = 'l7xx45199929f5df446a85d295e1e5eebe6a';
const budgetService = require('../services/budgetService');

module.exports = {
    transportExp: async(sx, sy, ex, ey, pathType) => {       
        try {    
            //pathType -> (2=bus, 3=subway, 4=taxi)
            //bus or subway
            if(pathType === 2 || pathType === 3){                
                if(pathType === 3)
                    pathType = 1;
                const options = {
                    uri: `https://api.odsay.com/v1/api/searchPubTransPath?SX=${sx}&SY=${sy}&EX=${ex}&EY=${ey}&SearchPathType=${pathType}&apiKey=${API_KEY1}`
                }; 
                const result = await request(options);
                const parseResult = JSON.parse(result).result.path[0].info.payment;          
                //return parseResult;
            } else{
                const options = {
                    uri: `https://apis.openapi.sk.com/tmap/routes?version=2&appKey=${API_KEY2}&endX=${ex}&endY=${ey}&startX=${sx}&startY=${sy}`
                };
                const result = await request(options);
                const parseResult = JSON.parse(result).features[0].properties.taxiFare;
                //return parseResult;
            }
            
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
	
}