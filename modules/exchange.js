const request = require('request-promise-native');
const { API_KEY } = require('../config/exchange');

module.exports = { //환율 변환 모듈 (대상 통화 금액, 대상 통화 단위, 변환 통화 단위)
    exchange: async(price, base, to) => {
        const options = {
            uri: `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`
        };
        console.log(options.uri);
        try {
            if(base === to) //변환하려는 통화가 같을 경우
                return (price).toFixed(2);

            //JSON 파싱
            const result = await request(options);
            const parseResult = JSON.parse(result).conversion_rates;

            return (parseResult[to]*price).toFixed(2); //소수점 2자리에서 반올림
        } catch (e) {
            throw e;
        }
    }
}