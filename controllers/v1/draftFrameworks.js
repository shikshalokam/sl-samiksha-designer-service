

/**
 * name : controllers/draftFrameworks.js
 * author : Rakesh Kumar
 * Date : 05-Sep-2020
 * Description : Draft framework related information.
 */

const frameworksHelper = require(MODULES_BASE_PATH + "/draftFrameworks/helper");

module.exports = class DraftFrameworks extends Abstract {
  constructor() {
    super("draftFrameworks");
  }

  static get name() {
    return "draftFrameworks";
  }

  /**
* @api {post} /design/api/v1/draftFrameworks/create create Frameworks
* @apiVersion 1.0.0
* @apiName create Frameworks
* @apiGroup Draft Frameworks
* @apiSampleRequest /design/api/v1/draftFrameworks/create
* @apiHeader {String} X-authenticated-user-token Authenticity token 
* @apiParamExample {json} Request-Body:
*{
*    "externalId" : "Mantra-EXCEL-2019-001",
*    "name" : "Mantra EXCEL School Assessment framework 2015",
*    "description" : "Mantra EXCEL School Assessment framework 2015",
*    "createdBy" : "a082787f-8f8f-42f2-a706-35457ca6f1fd",
*    "resourceType" : [],
*    "language" : [ 
*        "English"
*    ],
*    "keywords" : [ 
*        "Framework", 
*        "Assessment"
*    ],
*    "concepts" : [],
*    "createdFor" : [ 
*        "0125747659358699520", 
*        "0125748495625912324"
*    ],
*    "questionSequenceByEcm" : {
*        "PI" : {
*            "Survey Questions" : [ 
*                "PI001", 
*                "PI002", 
*                "PI003", 
*                "PI026", 
*                "PI027", 
*                "PI053", 
*                "PI054"
*            ]
*        }
*    },
*    "levelToScoreMapping" : {
*        "L1" : {
*            "points" : 25,
*            "label" : "Not Good"
*        },
*        "L2" : {
*            "points" : 50,
*            "label" : "Decent"
*        },
*        "L3" : {
*            "points" : 75,
*            "label" : "Good"
*        },
*        "L4" : {
*            "points" : 100,
*            "label" : "Best"
*        }
*    },
*    "scoringSystem" : "percentage",
*    "noOfRatingLevels" : 4,
*    "isRubricDriven" : true
*} 
* @apiUse successBody
* @apiUse errorBody
*/

  async create(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let frameworkDocument = await frameworksHelper.create(req.body, req.userDetails.userId)

        return resolve({
          status: HTTP_STATUS_CODE["ok"].status,
          message: CONSTANTS.apiResponses.FRAMEWORK_CREATED,
          result: frameworkDocument
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
* @api {post} /design/api/v1/draftFrameworks/list?search=:search&page=:page&limit=:limit list frameworks
* @apiVersion 1.0.0
* @apiName List frameworks by userId
* @apiGroup Draft Frameworks
* @apiSampleRequest /design/api/v1/draftFrameworks/list?search=a&page=1&limit=10
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
*/

  async list(req) {
    return new Promise(async (resolve, reject) => {

      try {

        let matchQuery = {}

        matchQuery["$match"] = {}
        matchQuery["$match"]["isDeleted"] = false
        matchQuery["$match"]["userId"] = req.userDetails.userId

        if(req.query.listType){
          matchQuery["$match"]["status"] = req.query.listType;
        }

        matchQuery["$match"]["$or"] = []
        matchQuery["$match"]["$or"].push({ "name": new RegExp(req.searchText, 'i') }, { "description": new RegExp(req.searchText, 'i') }, { "externalId": new RegExp(req.searchText, 'i') })
        let frameworksList = await frameworksHelper.list(matchQuery, req.pageSize, req.pageNo)
        let messageData =  CONSTANTS.apiResponses.FRAMEWORK_FETCHED;
        if (!frameworksList[0].count) {
          frameworksList[0].count = 0
          messageData = CONSTANTS.apiResponses.FRAMEWORK_NOT_FOUND;
        }
        return resolve({
          result: frameworksList[0],
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
  * @api {post} /design/api/v1/draftFrameworks/details/{frameworkId} framework details
  * @apiVersion 1.0.0
  * @apiName Framework details
  * @apiGroup Draft Frameworks
  * @apiSampleRequest /design/api/v1/draftFrameworks/details/5daec85d58e6e53dbdd84e0f
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  */

  async details(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftFrameworkDocument = await database.models.draftFrameworks.findOne({
          _id: req.params._id,
          userId: req.userDetails.userId
        }).lean()

        if (!draftFrameworkDocument) {
          throw { status: HTTP_STATUS_CODE["not_found"].status, message: CONSTANTS.apiResponses.FRAMEWORK_NOT_FOUND };
        }

        return resolve({
          message: CONSTANTS.apiResponses.FRAMEWORK_DETAILS_FETCHED,
          status: HTTP_STATUS_CODE["ok"].status,
          result: draftFrameworkDocument
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
* @api {post} /design/api/v1/draftFrameworks/update/{frameworkId} Update Frameworks
* @apiVersion 1.0.0
* @apiName update Frameworks
* @apiGroup Draft Frameworks
* @apiSampleRequest /design/api/v1/draftFrameworks/update/5daec85d58e6e53dbdd84e0e
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiParamExample {json} Request-Body:
*{
*    "externalId" : "Mantra-EXCEL-2019-001",
*    "name" : "Mantra EXCEL School Assessment framework 2015"
*}
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

        let frameworkDocument = await frameworksHelper.update(findQuery, req.body)

        return resolve({
          status: HTTP_STATUS_CODE["ok"].status,
          message: CONSTANTS.apiResponses.FRAMEWORK_UPDATED,
          result: frameworkDocument
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
* @api {post} /design/api/v1/draftFrameworks/delete/{frameworksId} Delete framework
* @apiVersion 1.0.0
* @apiName Delete framework
* @apiGroup Draft Frameworks
* @apiSampleRequest /design/api/v1/draftFrameworks/delete/5daec85d58e6e53dbdd84e0e
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

        await frameworksHelper.update(findQuery, { isDeleted: true })

        return resolve({
          message: CONSTANTS.apiResponses.FRAMEWORK_DELETED,
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
