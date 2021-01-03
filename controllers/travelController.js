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
        } catch (e) {
            console.error(e);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.TRAVEL_CREATE_FAIL));
        }
    },
    readTravel: async (req, res) => {
        try {
            //
            const { upcoming, past } = req.query;
            let result = null;
            if(upcoming) {
                result = await travelService.readTravel(req.decoded, 1, upcoming);
            } else if(past) {
                result = await travelService.readTravel(req.decoded, 0, past);
            }
            if(Array.isArray(result) && !result.length){
                return res.status(sc.NO_CONTENT).send();
            }
            return res.status(sc.OK).send(rb.successData(sc.OK, rm.TRAVEL_READ_SUCCESS, result));          
        } catch (e) {
            console.error(e);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.TRAVEL_READ_FAIL));
        }
    },
    deleteTravel: async (req, res) => {
        try {
            const result = await travelService.deleteTravel(req.params.id);
            if(!result){
                return res.status(sc.NO_CONTENT).send();
            }
            return res.status(sc.OK).send(rb.success(sc.OK, rm.TRAVEL_DELETE_SUCCESS));              
        } catch (e) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.TRAVEL_DELETE_FAIL));
        }
    }
}

