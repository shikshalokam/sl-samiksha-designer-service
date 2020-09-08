

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
* @apiParamExample {json} Request:
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
* @apiParamExample {json} Response:
{
    "message": "Framework created successfully.",
    "status": 200,
    "result": {
        "externalId": "SAMPLE-EXTERNAL-ID",
        "name": "DRAFT FRAMEWORK",
        "description": "SAMPLE DESCRIPTION",
        "resourceType": [
            "observation"
        ],
        "language": [
            "English"
        ],
        "keywords": [
            "Framework",
            "Assessment"
        ],
        "concepts": [],
        "createdFor": [
            "0125748495625912324",
            "0125747659358699520"
        ],
        "scoringSystem": "percentage",
        "levelToScoreMapping": {
            "L1": {
                "points": 25,
                "label": "Not Good"
            },
            "L2": {
                "points": 50,
                "label": "Decent"
            },
            "L3": {
                "points": 75,
                "label": "Good"
            },
            "L4": {
                "points": 100,
                "label": "Best"
            }
        },
        "themes": [
            {
                "type": "DEFAULT-THEME",
                "label": "DEFAULT-THEME",
                "externalId": "DEFAULT-THEME",
                "name": "DEFAULT-THEME",
                "weightage": 100,
                "children": []
            }
        ],
        "noOfRatingLevels": 4,
        "isRubricDriven": true,
        "updatedBy": "SYSTEM",
        "isDeleted": false,
        "createdBy": "SYSTEM",
        "entityType": "school",
        "entityTypeId": "5ce23d633c330302e720e65f",
        "status": "draft",
        "_id": "5f5761c576e5a43c47d2da94",
        "deleted": false,
        "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "updatedAt": "2020-09-08T10:49:41.774Z",
        "createdAt": "2020-09-08T10:49:41.774Z",
        "__v": 0
    }
}
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
* @apiParamExample {json} Response:
{
    "message": "Frameworks fetched successfully",
    "status": 200,
    "result": {
        "data": [
            {
                "_id": "5f50ef4b2cb6f165eb70fcc5",
                "externalId": "SAMPLE-EXTERNAL-ID",
                "name": "framework name",
                "description": "SAMPLE DESCRIPTION"
            },
            {
                "_id": "5f50ef552cb6f165eb70fcc8",
                "externalId": "SAMPLE-EXTERNAL-ID",
                "name": "DRAFT FRAMEWORK",
                "description": "SAMPLE DESCRIPTION"
            }
        ],
        "count": 5
    }
}
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
  * @apiParamExample {json} Response:
  {
    "message": "Framework details fetched successfully.",
    "status": 200,
    "result": {
        "_id": "5f50ef552cb6f165eb70fcc8",
        "externalId": "SAMPLE-EXTERNAL-ID",
        "name": "DRAFT FRAMEWORK",
        "description": "SAMPLE DESCRIPTION",
        "resourceType": [
            "observation"
        ],
        "language": [
            "English"
        ],
        "keywords": [
            "Framework",
            "Assessment"
        ],
        "concepts": [],
        "createdFor": [
            "0125748495625912324",
            "0125747659358699520"
        ],
        "scoringSystem": "percentage",
        "levelToScoreMapping": {
            "L1": {
                "points": 25,
                "label": "Not Good"
            },
            "L2": {
                "points": 50,
                "label": "Decent"
            },
            "L3": {
                "points": 75,
                "label": "Good"
            },
            "L4": {
                "points": 100,
                "label": "Best"
            }
        },
        "themes": [
            {
                "type": "DEFAULT-THEME",
                "label": "DEFAULT-THEME",
                "externalId": "DEFAULT-THEME",
                "name": "DEFAULT-THEME",
                "weightage": 100,
                "children": []
            }
        ],
        "noOfRatingLevels": 4,
        "isRubricDriven": true,
        "updatedBy": "SYSTEM",
        "isDeleted": false,
        "createdBy": "SYSTEM",
        "entityType": "school",
        "entityTypeId": "5ce23d633c330302e720e65f",
        "status": "draft",
        "deleted": false,
        "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "updatedAt": "2020-09-03T13:27:49.780Z",
        "createdAt": "2020-09-03T13:27:49.780Z",
        "__v": 0
    }
}
  */

  async details(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftFrameworkDocument = await frameworksHelper.details(req.params._id, req.userDetails.userId);
        return resolve(draftFrameworkDocument);

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
* @apiParamExample {json} Request:
*{
*    "externalId" : "Mantra-EXCEL-2019-001",
*    "name" : "Mantra EXCEL School Assessment framework 2015"
*}
* @apiUse successBody
* @apiUse errorBody
* @apiParamExample {json} Response:
{
    "message": "Framework updated successfully.",
    "status": 200,
    "result": {
        "_id": "5f50ef552cb6f165eb70fcc8",
        "externalId": "Mantra-EXCEL-2019-001",
        "name": "DRAFT FRAMEWORK",
        "description": "SAMPLE DESCRIPTION",
        "resourceType": [
            "observation"
        ],
        "language": [
            "English"
        ],
        "keywords": [
            "Framework",
            "Assessment"
        ],
        "concepts": [],
        "createdFor": [
            "0125748495625912324",
            "0125747659358699520"
        ],
        "scoringSystem": "percentage",
        "levelToScoreMapping": {
            "L1": {
                "points": 25,
                "label": "Not Good"
            },
            "L2": {
                "points": 50,
                "label": "Decent"
            },
            "L3": {
                "points": 75,
                "label": "Good"
            },
            "L4": {
                "points": 100,
                "label": "Best"
            }
        },
        "themes": [
            {
                "type": "DEFAULT-THEME",
                "label": "DEFAULT-THEME",
                "externalId": "DEFAULT-THEME",
                "name": "DEFAULT-THEME",
                "weightage": 100,
                "children": []
            }
        ],
        "noOfRatingLevels": 4,
        "isRubricDriven": true,
        "updatedBy": "SYSTEM",
        "isDeleted": false,
        "createdBy": "SYSTEM",
        "entityType": "school",
        "entityTypeId": "5ce23d633c330302e720e65f",
        "status": "draft",
        "deleted": false,
        "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "updatedAt": "2020-09-08T11:01:35.171Z",
        "createdAt": "2020-09-03T13:27:49.780Z",
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
* @apiParamExample {json} Response:
{
    "message": "Framework deleted successfully.",
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
