const request = require('request-promise-native');
const API_KEY_1 = require('../config/transportExp').API_KEY1;
const API_KEY_2 = require('../config/transportExp').API_KEY2;

module.exports = {
    transportExp: async(sx, sy, ex, ey, pathType) => {       
        try {    
            //pathType -> (2=bus, 3=subway, 4=taxi)
            //bus or subway
            if(sx == 0 || sy == 0 || ex == 0 || ey == 0){
                return 0;
            }
            else if(pathType === 2 || pathType === 3){                
                if(pathType === 3)
                    pathType = 1;
                const options = {
                    uri: `https://api.odsay.com/v1/api/searchPubTransPath?SX=${sx}&SY=${sy}&EX=${ex}&EY=${ey}&SearchPathType=${pathType}&apiKey=${API_KEY_1}`
                }; 
                const result = await request(options);
                console.log(result);
                const parseResult = JSON.parse(result).result.path[0].info.payment;          
                return parseResult;
            } 
            //taxi
            else if(pathType === 4){
                const options = {
                    uri: `https://apis.openapi.sk.com/tmap/routes?version=2&appKey=${API_KEY_2}&endX=${ex}&endY=${ey}&startX=${sx}&startY=${sy}`
                };
                const result = await request(options);
                //console.log(result);
                const parseResult = JSON.parse(result).features[0].properties.taxiFare;
                return parseResult;
            }
            //walk, car
            else{
                return 0;
            }
            
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
	
}