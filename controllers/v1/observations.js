/**
 * name : controllers/observations.js
 * author : Rakesh Kumar
 * Date : 10-Sep-2020
 * Description : Observations related information.
 */

const observationsHelper = require(MODULES_BASE_PATH + "/observations/helper");

module.exports = class Observations extends Abstract {

  static get name() {
    return "observations";
  }

  /**
* @api {post} /design/api/v1/observations/create create Frameworks
* @apiVersion 1.0.0
* @apiName create Frameworks
* @apiGroup Observations
* @apiSampleRequest /design/api/v1/observations/create
* @apiHeader {String} X-authenticated-user-token Authenticity token 
* @apiParamExample {json} Request:
* {
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

        let frameworkDocument = await observationsHelper.create(req.body, req.userDetails.userId)
        return resolve({ message:frameworkDocument.message,result:frameworkDocument.data });

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
  * @api {post} /design/api/v1/observations/details/{frameworkId} framework details
  * @apiVersion 1.0.0
  * @apiName Framework details
  * @apiGroup Observations
  * @apiSampleRequest /design/api/v1/observations/details/5daec85d58e6e53dbdd84e0f
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

        let draftFrameworkDocument = await observationsHelper.details(req.params._id, req.userDetails.userId);
        return resolve({ message:draftFrameworkDocument.message, result:draftFrameworkDocument.data });

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
  * @api {post} /design/api/v1/observations/getFrameworkForm/:_id get framework form
  * @apiVersion 1.0.0
  * @apiName Get framework form
  * @apiGroup Observations
  * @apiSampleRequest /design/api/v1/observations/getFrameworkForm/5f5b566fe82bbb7130dbb9e4
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  *{
    "message": "Observation framework form fetched successfully.",
    "status": 200,
    "result": [
        {
            "field": "name",
            "value": "framework",
            "visible": true,
            "editable": true,
            "label": "Solution Name",
            "width": 650,
            "input": "text",
            "validation": [
                {
                    "name": "required",
                    "validator": "required",
                    "message": "Name required"
                }
            ]
        },
        {
            "field": "description",
            "value": "ddd",
            "visible": true,
            "editable": true,
            "label": "Description",
            "width": 650,
            "input": "textarea",
            "validation": []
        },
        {
            "field": "keywords",
            "value": [
                "Framework",
                "Assessment"
            ],
            "visible": true,
            "editable": true,
            "label": "Add Keywords",
            "width": 650,
            "input": "inputchip",
            "validation": [],
            "options": []
        },
        {
            "field": "language",
            "value": {
                "label": "English",
                "value": "English"
            },
            "visible": true,
            "editable": true,
            "label": "Language",
            "width": 650,
            "input": "select",
            "validation": [
                {
                    "name": "required",
                    "validator": "required",
                    "message": "Language required"
                }
            ],
            "options": [
                {
                    "label": "English",
                    "value": "english"
                },
                {
                    "label": "Hindi",
                    "value": "hindi"
                }
            ]
        },
        {
            "field": "entityType",
            "value": {
                "label": "school",
                "value": "5ce23d633c330302e720e65f"
            },
            "visible": true,
            "editable": true,
            "label": "Entity Type",
            "width": 650,
            "input": "select",
            "validation": [
                {
                    "name": "required",
                    "validator": "required",
                    "message": "Entity Type required"
                }
            ],
            "options": [
                {
                    "label": "school",
                    "value": "5d15a959e9185967a6d5e8a6"
                }
            ]
        },
        {
            "field": "voiceOver",
            "value": {
                "label": "No"
            },
            "visible": true,
            "editable": true,
            "label": "Voice Over",
            "width": 650,
            "input": "radio",
            "validation": [],
            "options": [
                {
                    "label": "Yes",
                    "value": "yes",
                    "checked": false
                },
                {
                    "label": "No",
                    "value": "no",
                    "checked": true
                }
            ]
        }
    ]
}
  * 
  * **/

  async getFrameworkForm(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let frameworkForm = await observationsHelper.getFrameworkForm(req.params._id, req.userDetails.userId);
        return resolve({ 
          message:frameworkForm.message, 
          result:frameworkForm.data 
        });

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
* @api {post} /design/api/v1/observation/update/{frameworkId} Observation Update Frameworks
* @apiVersion 1.0.0
* @apiName update Framework
* @apiGroup Observations
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

      let frameworkDocument = await observationsHelper.update(req.params._id,req.userDetails.userId, req.body);
      return resolve({
        message: frameworkDocument.message,
        result: frameworkDocument.data
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
  * @api {post} /design/api/v1/observations/createCriteria Create Criteria
  * @apiVersion 1.0.0
  * @apiName Create Criteria
  * @apiGroup Observations
  * @apiParamExample {json} Request:
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
 * @apiParamExample {json} Response:
 *
 {
    "message": "Draft Criteria created successfully.",
    "status": 200,
    "result": {
        "externalId": "SAMPLE-EXTERNAL-ID",
        "userId": "94225c52-1761-45bc-b55a-8572aa06c3f8",
        "timesUsed": 10,
        "weightage": 20,
        "name": "SAMPLE-NAME",
        "score": "",
        "remarks": "SAMPLE-REMARKS",
        "showRemarks": true,
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
        "criteriaType": "auto",
        "isDeleted": false,
        "_id": "5f5751dda4d7022c2ea59432",
        "deleted": false,
        "draftFrameworkId": "5db13f61ab5de05e77d51c4d",
        "updatedAt": "2020-09-08T09:41:49.787Z",
        "createdAt": "2020-09-08T09:41:49.787Z",
        "__v": 0
    }
}
 * 
*/

async createCriteria(req) {
    return new Promise(async (resolve, reject) => {
      try {

       
        const draftCriteriaData = _.merge(req.body, { userId: req.userDetails.userId })

        let draftCriteriaDocument = await observationsHelper.createCriteria(draftCriteriaData)
        return resolve({
          message: draftCriteriaDocument.message,
          result: draftCriteriaDocument.data
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
* @api {post} /design/api/v1/observations/criteriaList/{draftFrameworkId}?search=:search&page=:page&limit=:limit list criteria
* @apiVersion 1.0.0
* @apiName List criteria by userId
* @apiGroup Observations
* @apiSampleRequest /design/api/v1/observations/criteriaList/5daec85d58e6e53dbdd84e0e?search=a&page=1&limit=10
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
* @apiParamExample {json} Response:
*{
    "message": "Draft criterias fetched successfully.",
    "status": 200,
    "result": {
        "data": [
            {
                "_id": "5f55e44859d529165d956fc9",
                "name": "SAMPLE-NAME",
                "description": "SAMPLE DESCRIPTION"
            }
        ],
        "count": 2
    }
}
*
*/

  async criteriaList(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let matchQuery = {}

        matchQuery["$match"] = {}
        matchQuery["$match"]["draftFrameworkId"] = ObjectId(req.params._id)
        matchQuery["$match"]["isDeleted"] = false
        matchQuery["$match"]["userId"] = req.userDetails.userId

        matchQuery["$match"]["$or"] = []
        matchQuery["$match"]["$or"].push({ "name": new RegExp(req.searchText, 'i') }, { "code": new RegExp(req.searchText, 'i') }, { "description": new RegExp(req.searchText, 'i') })

        let draftCriteriaList = await observationsHelper.criteriaList(matchQuery, req.pageSize, req.pageNo,req.userDetails.userId)

        return resolve({
            message: draftCriteriaList.message,
            result: draftCriteriaList.data
          });

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
  * @api {post} /design/api/v1/observations/updateCriteria/{criteriaId} Update Criteria
  * @apiVersion 1.0.0
  * @apiName Update Criteria
  * @apiGroup Observations
  * @apiParamExample {json} Request:
  * {
    "externalId": "sample-external-id",
  * }
  * @apiSampleRequest /design/api/v1/observations/updateCriteria/5db0292179e31f1b85d11ca9
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  {
    "message": "Draft Criteria updated successfully.",
    "status": 200,
    "result": {
        "_id": "5f5759a01b91c435dca61391",
        "externalId": "DummyCriteria",
        "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "timesUsed": 12,
        "weightage": 20,
        "name": "Dummy Name",
        "score": "",
        "remarks": "",
        "showRemarks": true,
        "description": "Dummy Description",
        "resourceType": [
            "Program",
            "Framework",
            "Criteria"
        ],
        "language": [
            "English"
        ],
        "keywords": [
            "Keyword 1",
            "Keyword 2"
        ],
        "concepts": [
            {
                "identifier": "LPD20100",
                "name": "Teacher_Performance",
                "objectType": "Concept",
                "relation": "associatedTo",
                "description": null,
                "index": null,
                "status": null,
                "depth": null,
                "mimeType": null,
                "visibility": null,
                "compatibilityLevel": null
            },
            {
                "identifier": "LPD20400",
                "name": "Instructional_Programme",
                "objectType": "Concept",
                "relation": "associatedTo",
                "description": null,
                "index": null,
                "status": null,
                "depth": null,
                "mimeType": null,
                "visibility": null,
                "compatibilityLevel": null
            },
            {
                "identifier": "LPD20200",
                "name": "Teacher_Empowerment",
                "objectType": "Concept",
                "relation": "associatedTo",
                "description": null,
                "index": null,
                "status": null,
                "depth": null,
                "mimeType": null,
                "visibility": null,
                "compatibilityLevel": null
            }
        ],
        "createdFor": [
            "0125747659358699520",
            "0125748495625912324"
        ],
        "rubric": {
            "levels": [
                {
                    "level": "L1",
                    "label": "Level 1",
                    "description": "asdad",
                    "expression": "",
                    "expressionVariables": []
                },
                {
                    "level": "L2",
                    "label": "Level 2",
                    "description": "adadad",
                    "expression": "",
                    "expressionVariables": []
                },
                {
                    "level": "L3",
                    "label": "Level 3",
                    "description": "adasdad",
                    "expression": "",
                    "expressionVariables": []
                },
                {
                    "level": "L4",
                    "label": "Level 4",
                    "description": "adadadasd",
                    "expression": "",
                    "expressionVariables": []
                }
            ]
        },
        "criteriaType": "auto",
        "isDeleted": false,
        "deleted": false,
        "draftFrameworkId": "5db13f61ab5de05e77d51c4d",
        "updatedAt": "2020-09-08T10:24:25.331Z",
        "createdAt": "2020-09-08T10:14:56.701Z",
        "__v": 0,
        "flag": ""
    }
}
*/
  async updateCriteria(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let findQuery = {
          _id: req.params._id,
          userId: req.userDetails.userId
        }

        let draftCriteriaDocument = await observationsHelper.updateCriteria(findQuery, req.body)

        return resolve({
          message: draftCriteriaDocument.message,
          result: draftCriteriaDocument.data
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
* @api {get} /design/api/v1/draftCriteria/observations/{criteriaId} Get criteria details
* @apiVersion 1.0.0
* @apiName Criteria Details
* @apiGroup Observations
* @apiSampleRequest /design/api/v1/draftCriteria/observations/5db0292179e31f1b85d11ca9
* @apiUse successBody
* @apiUse errorBody
* @apiParamExample {json} Response:
{
    "message": "Draft criterias fetched successfully.",
    "status": 200,
    "result": {
        "message": "Draft criterias fetched successfully.",
        "result": {
            "_id": "5f5751dda4d7022c2ea59432",
            "externalId": "SAMPLE-EXTERNAL-ID",
            "userId": "94225c52-1761-45bc-b55a-8572aa06c3f8",
            "timesUsed": 10,
            "weightage": 20,
            "name": "SAMPLE-NAME",
            "score": "",
            "remarks": "SAMPLE-REMARKS",
            "showRemarks": true,
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
            "criteriaType": "auto",
            "isDeleted": false,
            "deleted": false,
            "draftFrameworkId": "5db13f61ab5de05e77d51c4d",
            "updatedAt": "2020-09-08T09:41:49.787Z",
            "createdAt": "2020-09-08T09:41:49.787Z",
            "__v": 0
        }
    }
}
*
*/

  async criteriaDetails(req) {
    return new Promise(async (resolve, reject) => {
      try {


        let draftCriteriaDocument = await observationsHelper.criteriaDetails(req.params._id, req.userDetails.userId);
        
        return resolve({
          message: draftCriteriaDocument.message,
          result: draftCriteriaDocument.data
        });

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
  * @api {post} /design/api/v1/observations/getCriteriaForm/ get criteria form
  * @apiVersion 1.0.0
  * @apiName Get criteria form
  * @apiGroup Observations
  * @apiSampleRequest /design/api/v1/observations/getCriteriaForm
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  *{
    "message": "Criteria form fetched successfully.",
    "status": 200,
    "result": [
        {
            "field": "name",
            "value": "",
            "visible": true,
            "editable": true,
            "label": "Solution Name",
            "width": 650,
            "input": "text",
            "validation": [
                {
                    "name": "required",
                    "validator": "required",
                    "message": "Name required"
                }
            ]
        },
        {
            "field": "description",
            "value": "",
            "visible": true,
            "editable": true,
            "label": "Description",
            "width": 650,
            "input": "textarea",
            "validation": []
        }
     
    ]
}
  * 
  * **/

 async getCriteriaForm(req) {
  return new Promise(async (resolve, reject) => {
    try {

      let criteriaForm = await observationsHelper.getCriteriaForm(req.params._id, req.userDetails.userId);
      return resolve({ 
        message:criteriaForm.message, 
        result:criteriaForm.data 
      });

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
