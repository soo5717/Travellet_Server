const placeLikeService = require('../services/placeLikeService');
const rb = require('../modules/responseBody');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');

module.exports = {
    createPlaceLike: async (req, res) => {
        const { contentId } = req.body;
        if(!contentId){
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));            
        }
        try {
            await placeLikeService.createPlaceLike(req.decoded, contentId);
            return res.status(sc.CREATED).send(rb.success(sc.CREATED, rm.PLACE_LIKE_CREATE_SUCCESS));              
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PLACE_LIKE_CREATE_FAIL));
        }
    },
    readPlaceLike: async (req, res) => {
        try {
            const result = await placeLikeService.readPlaceLike(req.decoded);
            return res.status(sc.OK).send(rb.successData(sc.OK, rm.PLACE_LIKE_READ_SUCCESS, result));     
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PLACE_LIKE_READ_FAIL));
        }
    },
    deletePlaceLike: async (req, res) => {
        const { contentId } = req.body;
        if(!contentId){
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));            
        }
        try {
            await placeLikeService.deletePlaceLike(req.decoded, contentId);
            return res.status(sc.NO_CONTENT).send(rb.success(sc.NO_CONTENT, rm.PLACE_LIKE_DELETE_SUCCESS));          
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PLACE_LIKE_DELETE_FAIL));
        }
    }
}