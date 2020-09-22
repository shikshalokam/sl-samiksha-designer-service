
/**
 * name : controllers/draftECM.js
 * author : Rakesh Kumar
 * Date : 05-Sep-2020
 * Description : Draft ecm related information.
 */
const draftECMHelper = require(MODULES_BASE_PATH + "/draftECM/helper");

module.exports = class DraftECM extends Abstract {
  constructor() {
    super("draftECM");
  }

  static get name() {
    return "draftECM";
  }


  /**
* @api {post} /design/api/v1/draftECM/create create draftECM
* @apiVersion 1.0.0
* @apiName create draftECM
* @apiGroup Draft Ecm
* @apiSampleRequest /design/api/v1/draftECM/create
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiParamExample {json} Request:
{
  "code": "LW"
  "tip": "Some tip for the criteria.",
  "name": "Learning Walk",
  "description": "DRAFT-ECM-DESCRIPTION",
  "draftFrameworkId":5db13f61ab5de05e77d51c4d",
  "isSubmitted": "false",
  "modeOfCollection": "onfield",
  "canBeNotApplicable": false,
  "isDeleted":false
  }
* @apiUse successBody
* @apiUse errorBody
* @apiParamExample {json} Response:
{
    "message": "Draft ECM created successfully.",
    "status": 200,
    "result": {
        "code": "LW",
        "tip": "Some tip for the criteria.",
        "name": "Learning Walk",
        "description": "DRAFT-ECM-DESCRIPTION",
        "startTime": "Tue Sep 08 2020 15:27:40 GMT+0530 (IST)",
        "endTime": "Tue Sep 08 2020 15:27:40 GMT+0530 (IST)",
        "isSubmitted": false,
        "modeOfCollection": "onfield",
        "isDeleted": false,
        "canBeNotApplicable": false,
        "_id": "5f5755fde22f3031851187da",
        "deleted": false,
        "draftFrameworkId": "5db13f61ab5de05e77d51c4d",
        "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "updatedAt": "2020-09-08T09:59:25.735Z",
        "createdAt": "2020-09-08T09:59:25.735Z",
        "__v": 0
    }
}
*
*/

  async create(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let ecmData = _.merge(req.body, { userId: req.userDetails.userId })

        let draftECMDocument = await draftECMHelper.create(ecmData)

        return resolve({
          status: HTTP_STATUS_CODE["ok"].status,
          message: CONSTANTS.apiResponses.DRAFT_ECM_CREATED,
          result: draftECMDocument
        });

      }
      catch (error) {
        return reject({
          status:
            error.status ||
            HTTP_STATUS_CODE["internal_server_error"].status,

          message:
            error.message ||
            HTTP_STATUS_CODE["internal_server_error"].message
        });
      }
    })
  }

  /**
* @api {post} /design/api/v1/draftECM/list/{draftFrameworkId}?search=:search&page=:page&limit=:limit list draftECM
* @apiVersion 1.0.0
* @apiName list draftECM
* @apiGroup Draft Ecm
* @apiSampleRequest /design/api/v1/draftECM/list/5daec85d58e6e53dbdd84e0e?search=a&page=1&limit=10
* @apiHeader {String} X-authenticated-user-token Authenticity token 
* @apiUse successBody
* @apiUse errorBody
* @apiParamExample {json} Response:
{
    "message": "Draft Ecm fetched successfully.",
    "status": 200,
    "result": {
        "data": [
            {
                "_id": "5f55e4b159d529165d956fcf",
                "code": "DRAFT-ECM-CODE",
                "name": "DRAFT-ECM-NAME",
                "description": "DRAFT-ECM-DESCRIPTION"
            }
        ],
        "count": 3
    }
}
*/

  async list(req) {
    return new Promise(async (resolve, reject) => {
      try {


        let matchQuery = {}

        matchQuery["$match"] = {}
        matchQuery["$match"]["draftFrameworkId"] = ObjectId(req.params._id)
        matchQuery["$match"]["isDeleted"] = false
        matchQuery["$match"]["userId"] = req.userDetails.userId

        matchQuery["$match"]["$or"] = []
        matchQuery["$match"]["$or"].push({ "name": new RegExp(req.searchText, 'i') }, { "description": new RegExp(req.searchText, 'i') }, { "code": new RegExp(req.searchText, 'i') })

        let draftEcmList = await draftECMHelper.list(matchQuery, req.pageSize, req.pageNo)

        let messageData = CONSTANTS.apiResponses.DRAFT_ECM_FOUND;

        if (!draftEcmList[0].count) {
          draftEcmList[0].count = 0
          messageData =  CONSTANTS.apiResponses.DRAFT_ECM_NOT_FOUND; 
        }

        return resolve({
          result: draftEcmList[0],
          message: messageData
        })

      } catch (error) {
        return reject({
          status:
            error.status ||
            HTTP_STATUS_CODE["internal_server_error"].status,

          message:
            error.message ||
            HTTP_STATUS_CODE["internal_server_error"].message
        });
      }
    })
  }

  /**
  * @api {post} /design/api/v1/draftECM/details/{draftECMId} details draftECM
  * @apiVersion 1.0.0
  * @apiName details draftECM
  * @apiGroup Draft Ecm
  * @apiSampleRequest /design/api/v1/draftECM/details/5daff8ae9b71b24fcad7b182
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  {
    "message": "Draft Ecm fetched successfully.",
    "status": 200,
    "result": {
        "_id": "5f575db5ad990a36381b6cfb",
        "code": "LW",
        "tip": "Some tip for the criteria.",
        "name": "Learning Walk",
        "description": "DRAFT-ECM-DESCRIPTION",
        "startTime": "Tue Sep 08 2020 15:46:14 GMT+0530 (IST)",
        "endTime": "Tue Sep 08 2020 15:46:14 GMT+0530 (IST)",
        "isSubmitted": false,
        "modeOfCollection": "onfield",
        "isDeleted": false,
        "canBeNotApplicable": false,
        "deleted": false,
        "draftFrameworkId": "5db13f61ab5de05e77d51c4d",
        "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "updatedAt": "2020-09-08T10:32:21.194Z",
        "createdAt": "2020-09-08T10:32:21.194Z",
        "__v": 0
    }
}
  */

  async details(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftEcmDetails = await draftECMHelper.details(req.params._id, req.userDetails.userId);

        return resolve(draftEcmDetails)

      } catch (error) {
        return reject({
          status:
            error.status ||
            HTTP_STATUS_CODE["internal_server_error"].status,

          message:
            error.message ||
            HTTP_STATUS_CODE["internal_server_error"].message
        });
      }
    })
  }


  /**
* @api {post} /design/api/v1/draftECM/update/{draftECMId} Update draftECM
* @apiVersion 1.0.0
* @apiName update Draft ECM
* @apiGroup Draft Ecm
* @apiSampleRequest /design/api/v1/draftECM/update/5daff8ae9b71b24fcad7b182
* @apiHeader {String} X-authenticated-user-token Authenticity token
* @apiParamExample {json} Request:
{
	"frameworkId":"5da97c8786c28965d0aa5925",
	"code" : "PI",
    "tip" : "Conduct principal interview on the first or second day, before the coordinator interview",
    "name" : "Principal Interview",
    "description" : "Conduct principal interview on the first or second day, before the coordinator interview",
    "startTime" : "",
    "endTime" : "",
    "isSubmitted" : false,
    "modeOfCollection" : "onfield",
    "canBeNotApplicable" : false
} 
* @apiUse successBody
* @apiUse errorBody
* @apiParamExample {json} Response:
{
    "message": "Draft ECM updated successfully.",
    "status": 200,
    "result": {
        "_id": "5f575db5ad990a36381b6cfb",
        "code": "PI",
        "tip": "Conduct principal interview on the first or second day, before the coordinator interview",
        "name": "Principal Interview",
        "description": "Conduct principal interview on the first or second day, before the coordinator interview",
        "startTime": "",
        "endTime": "",
        "isSubmitted": false,
        "modeOfCollection": "onfield",
        "isDeleted": false,
        "canBeNotApplicable": false,
        "deleted": false,
        "draftFrameworkId": "5db13f61ab5de05e77d51c4d",
        "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "updatedAt": "2020-09-08T10:34:09.385Z",
        "createdAt": "2020-09-08T10:32:21.194Z",
        "__v": 0
    }
}
*/

  async update(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let findQuery = {
          _id: req.params._id,
          userId: req.userDetails.userId
        }

        let draftECMDocument = await draftECMHelper.update(findQuery, req.body)

        return resolve({
          status: HTTP_STATUS_CODE["ok"].status,
          message: CONSTANTS.apiResponses.DRAFT_ECM_UPDATED,
          result: draftECMDocument
        });
      }
      catch (error) {
        return reject({
          status:
            error.status ||
            HTTP_STATUS_CODE["internal_server_error"].status,

          message:
            error.message ||
            HTTP_STATUS_CODE["internal_server_error"].message
        });
      }
    })
  }

  /**
* @api {post} /design/api/v1/draftECM/delete/{draftECMId} Delete draftECM
* @apiVersion 1.0.0
* @apiName Delete draftECM
* @apiGroup Draft Ecm
* @apiSampleRequest /design/api/v1/draftECM/delete/5daff8ae9b71b24fcad7b182
* @apiUse successBody
* @apiUse errorBody
* @apiParamExample {json} Response:
{
    "message": "Draft ECM deleted successfully.",
    "status": 200
}
*/

  async delete(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let findQuery = {
          _id: req.params._id,
          userId: req.userDetails.userId
        }

        await draftECMHelper.update(findQuery, { isDeleted: true })

        return resolve({
          message: CONSTANTS.apiResponses.DRAFT_ECM_DELETED,
          status: HTTP_STATUS_CODE["ok"].status
        })
      } catch (error) {
        return reject({
          status:
            error.status ||
            HTTP_STATUS_CODE["internal_server_error"].status,

          message:
            error.message ||
            HTTP_STATUS_CODE["internal_server_error"].message
        });
      }
    })
  }

};
