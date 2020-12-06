const travelService = require('../services/travelService');
const rb = require('../modules/responseBody');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');

module.exports = {
    createTravel: async (req, res) => {
        const { title, startDate, endDate, budget } = req.body;
        if(!title || !startDate || !endDate || !budget){
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));            
        }

        try {
            await travelService.createTravel(req.decoded, title, startDate, endDate, budget);
            return res.status(sc.CREATED).send(rb.success(sc.CREATED, rm.TRAVEL_CREATE_SUCCESS));
                        
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.TRAVEL_CREATE_FAIL));
        }
    }
}

