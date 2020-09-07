
/**
 * name : controllers/draftCriteria.js
 * author : Rakesh Kumar
 * Date : 05-Sep-2020
 * Description : Draft criteria related information.
 */


const draftCriteriaHelper = require(MODULES_BASE_PATH + "/draftCriteria/helper");

module.exports = class DraftCriteria extends Abstract {

  /**
   * @apiDefine errorBody
   * @apiError {String} status 4XX,5XX
   * @apiError {String} message Error
   */

  /**
   * @apiDefine successBody
   *  @apiSuccess {String} status 200
   * @apiSuccess {String} result Data
   */

  constructor() {
    super("draftCriteria");
  }

  static get name() {
    return "draftCriteria";
  }

  /**
  * @api {post} /design/api/v1/draftCriteria/create Add Criteria
  * @apiVersion 1.0.0
  * @apiName Add Criteria
  * @apiGroup Draft Criteria
  * @apiParamExample {json} Request-Body:
  * {
	"externalId":  "SAMPLE-EXTERNAL-ID",
    "timesUsed": 10,
    "weightage": 20,
    "name":  "SAMPLE-NAME",
    "score":"",
    "remarks": "SAMPLE-REMARKS",
    "showRemarks": true,
    "description": "SAMPLE DESCRIPTION",
    "resourceType": ["observation"],
    "language": ["English"],
    "keywords": ["Framework", "Assessment"],
    "concepts": [],
    "createdFor": ["0125748495625912324", "0125747659358699520"],
    "rubric": {
    	"levels": {
          "L1": {
            "level": "L1",
            "label": "Level 1",
            "description": "sample description",
            "expression": ""
          },
          "L2": {
            "level": "L2",
            "label": "Level 2",
            "description": "sample description",
            "expression": ""
          },
          "L3": {
            "level": "L3",
            "label": "Level 3",
            "description": "sample description",
            "expression": ""
          },
          "L4": {
            "level": "L4",
            "label": "Level 4",
            "description": "sample description",
            "expression": ""
          }
        }
    },
    "flag": {},
    "criteriaType": "auto",
    "draftFrameworkId":"5daec85d58e6e53dbdd84e0e"
 }
 * @apiUse successBody
 * @apiUse errorBody
*/

  async create(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftCriteriaData = _.merge(req.body, { userId: req.userDetails.userId })

        let draftCriteriaDocument = await draftCriteriaHelper.create(draftCriteriaData)

        
        return resolve({
          status: HTTP_STATUS_CODE["ok"].status,
          message: CONSTANTS.apiResponses.DRAFT_CRITERIA_CREATED,
          result: draftCriteriaDocument
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
* @api {post} /design/api/v1/draftCriteria/list/{draftFrameworkId}?search=:search&page=:page&limit=:limit list criteria
* @apiVersion 1.0.0
* @apiName List criteria by userId
* @apiGroup Draft Criteria
* @apiSampleRequest /design/api/v1/draftCriteria/list/5daec85d58e6e53dbdd84e0e?search=a&page=1&limit=10
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
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
        matchQuery["$match"]["$or"].push({ "name": new RegExp(req.searchText, 'i') }, { "code": new RegExp(req.searchText, 'i') }, { "description": new RegExp(req.searchText, 'i') })

        let draftCriteriaList = await draftCriteriaHelper.list(matchQuery, req.pageSize, req.pageNo)

        let messageData = CONSTANTS.apiResponses.DRAFT_CRITERIAS_FETCHED;

        if (!draftCriteriaList[0].count) {
          draftCriteriaList[0].count = 0
          messageData = CONSTANTS.apiResponses.DRAFT_CRITERIAS_NOT_FOUND;
        }

        return resolve({
          result: draftCriteriaList[0],
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
* @api {get} /design/api/v1/draftCriteria/details/{criteriaId} Get criteria details
* @apiVersion 1.0.0
* @apiName Criteria Details
* @apiGroup Draft Criteria
* @apiSampleRequest /design/api/v1/draftCriteria/details/5db0292179e31f1b85d11ca9
* @apiUse successBody
* @apiUse errorBody
*/

  async details(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftCriteriaDocument = await database.models.draftCriteria.findOne({
          _id: req.params._id,
          userId: req.userDetails.userId
        }).lean()

        if (!draftCriteriaDocument) {
          throw { status:  HTTP_STATUS_CODE["not_found"].status, message: CONSTANTS.apiResponses.DRAFT_CRITERIAS_NOT_FOUND };
        }

        return resolve({
          message: CONSTANTS.apiResponses.DRAFT_CRITERIAS_FETCHED,
          status: HTTP_STATUS_CODE["ok"].status,
          result: draftCriteriaDocument
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
  * @api {post} /design/api/v1/draftCriteria/update/{criteriaId} Update Criteria
  * @apiVersion 1.0.0
  * @apiName Update Criteria
  * @apiGroup Draft Criteria
  * @apiParamExample {json} Request-Body:
  * {
    "externalId": "sample-external-id",
  * }
  * @apiSampleRequest /design/api/v1/draftCriteria/update/5db0292179e31f1b85d11ca9
  * @apiUse successBody
  * @apiUse errorBody
*/

  async update(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let findQuery = {
          _id: req.params._id,
          userId: req.userDetails.userId
        }

        let draftCriteriaDocument = await draftCriteriaHelper.update(findQuery, req.body)

        return resolve({
          status: HTTP_STATUS_CODE["ok"].status,
          message: CONSTANTS.apiResponses.DRAFT_CRITERIAS_UPDATED,
          result: draftCriteriaDocument
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
  * @api {post} /design/api/v1/draftCriteria/delete/{criteriaId} Delete Criteria
  * @apiVersion 1.0.0
  * @apiName Delete Criteria
  * @apiGroup Draft Criteria
  * @apiSampleRequest /design/api/v1/draftCriteria/delete/5db0292179e31f1b85d11ca9
  * @apiUse successBody
  * @apiUse errorBody
  */

  async delete(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let findQuery = {
          _id: req.params._id,
          userId: req.userDetails.userId
        }

        await draftCriteriaHelper.update(findQuery, { isDeleted: true })

        return resolve({
          message: CONSTANTS.apiResponses.DRAFT_CRITERIA_DELETED,
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



