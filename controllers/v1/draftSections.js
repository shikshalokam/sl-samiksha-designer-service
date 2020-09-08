
/**
 * name : controllers/draftSections.js
 * author : Rakesh Kumar
 * Date : 05-Sep-2020
 * Description : Draft sections related information
 */
const draftSectionsHelper = require(MODULES_BASE_PATH + "/draftSections/helper");

module.exports = class DraftSections extends Abstract {
  constructor() {
    super("draftSections");
  }

  static get name() {
    return "draftSections";
  }

  /**
* @api {post} /design/api/v1/draftSections/create create draftSections
* @apiVersion 1.0.0
* @apiName create draftSections
* @apiGroup Draft Sections
* @apiSampleRequest /design/api/v1/draftSections/create
* @apiParamExample {json} Request:
{
    "draftFrameworkId":"5daec85d58e6e53dbdd84e0e",
    "code":"DF",
    "name": "DEFAULT-NAME"
 }
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
* @apiParamExample {json} Response:
{
    "message": "Section created successfully.",
    "status": 200,
    "result": {
        "code": "DF",
        "name": "DEFAULT-NAME",
        "isDeleted": false,
        "_id": "5f576bfefaf5394329e1e938",
        "deleted": false,
        "draftFrameworkId": "5db13f61ab5de05e77d51c4d",
        "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "updatedAt": "2020-09-08T11:33:18.671Z",
        "createdAt": "2020-09-08T11:33:18.671Z",
        "__v": 0
    }
}
*/

  async create(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftSectionsData = _.merge(req.body, { userId: req.userDetails.userId })

        let draftSectionsDocument = await draftSectionsHelper.create(draftSectionsData)

        return resolve({
          status: HTTP_STATUS_CODE["ok"].status,
          message: CONSTANTS.apiResponses.SECTION_CREATED,
          result: draftSectionsDocument
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
 * @api {post} /design/api/v1/draftSections/list/{draftFrameworkId}?search=:searchText&page=:page&limit=:limit list draftSections
 * @apiVersion 1.0.0
 * @apiName list draftSections
 * @apiGroup Draft Sections
 * @apiSampleRequest /design/api/v1/draftSections/list
 * @apiHeader {String} X-authenticated-user-token Authenticity token  
 * @apiSampleRequest /design/api/v1/draftSections/list/5daec85d58e6e53dbdd84e0e?search=a&page=1&limit=10
 * @apiUse successBody
 * @apiUse errorBody
 * @apiParamExample {json} Response:
 {
    "message": "Draft Sections fetched successfully.",
    "status": 200,
    "result": {
        "data": [
            {
                "_id": "5f55e4a759d529165d956fce",
                "code": "DEFAULT-CODE",
                "name": "DEFAULT-NAME"
            },
            {
                "_id": "5f576bfefaf5394329e1e938",
                "code": "DEFAULT-CODE",
                "name": "DEFAULT-NAME"
            }
        ],
        "count": 2
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
        matchQuery["$match"]["$or"].push({ "name": new RegExp(req.searchText, 'i') }, { "code": new RegExp(req.searchText, 'i') })

        let draftSectionsList = await draftSectionsHelper.list(matchQuery, req.pageSize, req.pageNo)

        let messageData = CONSTANTS.apiResponses.SECTION_FETCHED; 

        if (!draftSectionsList[0].count) {
          draftSectionsList[0].count = 0
          messageData = CONSTANTS.apiResponses.SECTION_NOT_FOUND;
        }

        return resolve({
          result: draftSectionsList[0],
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
 * @api {post} /design/api/v1/draftSections/details/{draftSectionId} details draftSections
 * @apiVersion 1.0.0
 * @apiName details draftSections
 * @apiGroup Draft Sections
 * @apiSampleRequest /design/api/v1/draftSections/details/5f55e4a759d529165d956fce
 * @apiHeader {String} X-authenticated-user-token Authenticity token  
 * @apiUse successBody
 * @apiUse errorBody
 * @apiParamExample {json} Response:
  {
      "message": "Draft sections details fetched successfully.",
      "status": 200,
      "result": {
          "_id": "5f55e4a759d529165d956fce",
          "code": "DEFAULT-CODE",
          "name": "DEFAULT-NAME",
          "isDeleted": false,
          "deleted": false,
          "draftFrameworkId": "5db13f61ab5de05e77d51c4d",
          "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
          "updatedAt": "2020-09-07T07:43:35.618Z",
          "createdAt": "2020-09-07T07:43:35.618Z",
          "__v": 0
      }
  }
 */

  async details(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftSectionDocument = await draftSectionsHelper.details(req.params._id, req.userDetails.userId)
        resolve(draftSectionDocument);

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
* @api {post} /design/api/v1/draftSections/update/{draftSectionId} Update draftSections
* @apiVersion 1.0.0
* @apiName update draftSections
* @apiGroup Draft Sections
* @apiSampleRequest /design/api/v1/draftSections/update/5db01480bd197138284799cf
* @apiParamExample {json} Request:
{
    "code": "SQ",
    "name" : "Survey Questions"
}
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
* @apiParamExample {json} Response:
{
    "message": "Draft Section updated successfully.",
    "status": 200,
    "result": {
        "_id": "5f55e4a759d529165d956fce",
        "code": "SQ",
        "name": "Survey Questions",
        "isDeleted": false,
        "deleted": false,
        "draftFrameworkId": "5db13f61ab5de05e77d51c4d",
        "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "updatedAt": "2020-09-08T11:41:22.617Z",
        "createdAt": "2020-09-07T07:43:35.618Z",
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

        let draftSectionDocument = await draftSectionsHelper.update(findQuery, req.body)

        return resolve({
          message: CONSTANTS.apiResponses.SECTION_UPDATED,
          result: draftSectionDocument
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
* @api {post} /design/api/v1/draftSections/delete/{draftSectionsId} Delete draftSections
* @apiVersion 1.0.0
* @apiName Delete draftSections
* @apiSampleRequest /design/api/v1/draftSections/delete/5db01480bd197138284799cf
* @apiGroup DraftSections
* @apiUse successBody
* @apiUse errorBody
* @apiParamExample {json} Response:
{
    "message": "Section deleted successfully.",
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

        await draftSectionsHelper.update(findQuery, { isDeleted: true })

        return resolve({
          message: CONSTANTS.apiResponses.SECTION_DELETED,
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
