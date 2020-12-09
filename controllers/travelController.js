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
            console.log(req.decoded);
            await travelService.createTravel(req.decoded, title, startDate, endDate, budget);
            return res.status(sc.CREATED).send(rb.success(sc.CREATED, rm.TRAVEL_CREATE_SUCCESS));
                        
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.TRAVEL_CREATE_FAIL));
        }
    },

    deleteTravel: async (req, res) => {
        const { travelId } = req.body;
        if(!travelId){
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));            
        }

        try {
            console.log(req.decoded);
            await travelService.deleteTravel(req.decoded, travelId);
            return res.status(sc.NO_CONTENT).send(rb.success(sc.NO_CONTENT, rm.TRAVEL_DELETE_SUCCESS));
                        
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.TRAVEL_DELETE_FAIL));
        }
    }
}

