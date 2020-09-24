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

      let criteriaForm = await observationsHelper.getCriteriaForm(req.userDetails.userId);
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

 /**
  * @api {post} /design/api/v1/observations/impCategoryList/ get improvement category list
  * @apiVersion 1.0.0
  * @apiName Improvement category list
  * @apiGroup Observations
  * @apiSampleRequest /design/api/v1/observations/impCategoryList
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
{
  "message": "Project categories fetched successfully",
  "status": 200,
  "result": [
      {
          "name": "Community",
          "type": "community",
          "updatedAt": "2020-08-18T06:51:59.054Z",
          "projectsCount": 69,
          "url": "https://storage.googleapis.com/download/storage/v1/b/sl-dev-storage/o/static%2FprojectCategories%2Fdrafts.png?alt=media"
      },
      {
          "name": "Infrastructure",
          "type": "infrastructure",
          "updatedAt": "2020-08-18T06:51:59.054Z",
          "projectsCount": 11,
          "url": "https://storage.googleapis.com/download/storage/v1/b/sl-dev-storage/o/static%2FprojectCategories%2FobservationSolutions.png?alt=media"
      },
      {
          "name": "Students",
          "type": "students",
          "updatedAt": "2020-08-18T06:51:59.054Z",
          "projectsCount": 22,
          "url": "https://storage.googleapis.com/download/storage/v1/b/sl-dev-storage/o/static%2FprojectCategories%2FinstitutionalAssessments.png?alt=media"
      },
      {
          "name": "Teachers",
          "type": "teachers",
          "updatedAt": "2020-08-18T06:51:59.054Z",
          "projectsCount": 19,
          "url": "https://storage.googleapis.com/download/storage/v1/b/sl-dev-storage/o/static%2FprojectCategories%2FindividualAssessments.png?alt=media"
      }
  ]
}
**/

async impCategoryList(req) {
  return new Promise(async (resolve, reject) => {
    try {

      let improvementCategories = await observationsHelper.impCategoryList(req.userDetails.userToken,req.userDetails.userId);
      return resolve({ 
        message:improvementCategories.message, 
        result:improvementCategories.data 
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
  * @api {post} /design/api/v1/observations/improvementProjects/_id get improvement projects
  * @apiVersion 1.0.0
  * @apiName Improvement projects list
  * @apiGroup Observations
  * @apiSampleRequest /design/api/v1/observations/improvementProjects/student
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
{
    "message": "Successfully fetched projects",
    "status": 200,
    "result": {
        "data": [
            {
                "_id": "5f6b89bf09c8f34675c6ee0b",
                "averageRating": 0,
                "noOfRatings": 0,
                "name": "Test-template13",
                "externalId": "Test-template-13",
                "description": "improving school library",
                "createdAt": "2020-09-23T17:45:35.200Z",
                "new": true
            }
  ]
}
**/

async improvementProjects(req) {
  return new Promise(async (resolve, reject) => {
    try {

      let improvementProjects = await observationsHelper.improvementProjects(req.userDetails.userToken,req.userDetails.userId,req.params._id);
      return resolve({ 
        message:improvementProjects.message, 
        result:improvementProjects.data 
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
  * @api {post} /design/api/v1/observations/learningResoucesList get learning resources
  * @apiVersion 1.0.0
  * @apiName Learning resources list
  * @apiGroup Observations
  * @apiSampleRequest /design/api/v1/observations/learningResoucesList
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
{
    "message": "Learning resources found successfully.",
    "status": 200,
    "result": {
      "content": [
            {
                "ownershipType": [
                    "createdBy"
                ],
                "copyright": "Abhyas Organisation, SLDEV",
                "previewUrl": "https://sldevsunbird.blob.core.windows.net/sl-dev-assets/content/ecml/do_113078100229644288146-latest",
                "keywords": [
                    "image",
                    "andra"
                ],
                "subject": "Science",
                "plugins": [
                    {
                        "identifier": "org.ekstep.stage",
                        "semanticVersion": "1.0"
                    },
                    {
                        "identifier": "org.ekstep.image",
                        "semanticVersion": "1.1"
                    },
                    {
                        "identifier": "org.ekstep.navigation",
                        "semanticVersion": "1.0"
                    }
                ],
                "channel": "01305447637218918413",
                "downloadUrl": "https://sldevsunbird.blob.core.windows.net/sl-dev-assets/ecar_files/do_113078100229644288146/ap-test_1596448053733_do_113078100229644288146_1.0.ecar",
                "organisation": [
                    "Abhyas Organisation",
                    "SLDEV"
                ],
                "language": [
                    "English"
                ],
                "mimeType": "application/vnd.ekstep.ecml-archive",
                "variants": {
                    "spine": {
                        "ecarUrl": "https://sldevsunbird.blob.core.windows.net/sl-dev-assets/ecar_files/do_113078100229644288146/ap-test_1596448054258_do_113078100229644288146_1.0_spine.ecar",
                        "size": 2550
                    }
                },
                "editorState": "{\"plugin\":{\"noOfExtPlugins\":12,\"extPlugins\":[{\"plugin\":\"org.ekstep.contenteditorfunctions\",\"version\":\"1.2\"},{\"plugin\":\"org.ekstep.keyboardshortcuts\",\"version\":\"1.0\"},{\"plugin\":\"org.ekstep.richtext\",\"version\":\"1.0\"},{\"plugin\":\"org.ekstep.iterator\",\"version\":\"1.0\"},{\"plugin\":\"org.ekstep.navigation\",\"version\":\"1.0\"},{\"plugin\":\"org.ekstep.reviewercomments\",\"version\":\"1.0\"},{\"plugin\":\"org.ekstep.questionunit.mtf\",\"version\":\"1.2\"},{\"plugin\":\"org.ekstep.questionunit.mcq\",\"version\":\"1.3\"},{\"plugin\":\"org.ekstep.keyboard\",\"version\":\"1.1\"},{\"plugin\":\"org.ekstep.questionunit.reorder\",\"version\":\"1.1\"},{\"plugin\":\"org.ekstep.questionunit.sequence\",\"version\":\"1.1\"},{\"plugin\":\"org.ekstep.questionunit.ftb\",\"version\":\"1.1\"}]},\"stage\":{\"noOfStages\":1,\"currentStage\":\"4dcc1389-2d31-4ccd-8237-8d80b0643d17\",\"selectedPluginObject\":\"9120be5c-2d01-4c3d-a5c6-baec010647ae\"},\"sidebar\":{\"selectedMenu\":\"settings\"}}",
                "objectType": "Content",
                "gradeLevel": [
                    "Class1"
                ],
                "appIcon": "https://sldevsunbird.blob.core.windows.net/sl-dev-assets/content/do_113078101852602368148/artifact/icons8-about-30.png",
                "assets": [
                    "do_113078101273190400147"
                ],
                "collections": [
                    "do_113078121430204416149"
                ],
                "appId": "dev.dev.portal",
                "contentEncoding": "gzip",
                "artifactUrl": "https://sldevsunbird.blob.core.windows.net/sl-dev-assets/content/do_113078100229644288146/artifact/1596448053389_do_113078100229644288146.zip",
                "lockKey": "0575e41b-ae5d-48b1-8f31-015052ff2e08",
                "contentType": "Resource",
                "identifier": "do_113078100229644288146",
                "lastUpdatedBy": "56dcb023-7b5d-459d-9e92-1b679f5afe59",
                "audience": [
                    "Learner"
                ],
                "visibility": "Default",
                "consumerId": "1546ae3f-84a7-45d7-8d88-ccbbf9d37e3e",
                "mediaType": "content",
                "osId": "org.ekstep.quiz.app",
                "graph_id": "domain",
                "nodeType": "DATA_NODE",
                "lastPublishedBy": "e4326f7c-abdc-4c4d-bcaf-e483adf5bb21",
                "version": 2,
                "pragma": [],
                "license": "CC BY 4.0",
                "prevState": "Review",
                "size": 80593,
                "lastPublishedOn": "2020-08-03T09:47:33.729+0000",
                "IL_FUNC_OBJECT_TYPE": "Content",
                "name": "AP Test",
                "status": "Live",
                "totalQuestions": 0,
                "code": "org.sunbird.kZn1HV",
                "prevStatus": "Processing",
                "description": "Enter description for Resource",
                "medium": "English",
                "streamingUrl": "https://sldevsunbird.blob.core.windows.net/sl-dev-assets/content/ecml/do_113078100229644288146-latest",
                "idealScreenSize": "normal",
                "createdOn": "2020-08-03T09:43:01.941+0000",
                "contentDisposition": "inline",
                "lastUpdatedOn": "2020-08-03T09:47:31.259+0000",
                "SYS_INTERNAL_LAST_UPDATED_ON": "2020-08-03T09:47:35.975+0000",
                "dialcodeRequired": "No",
                "lastStatusChangedOn": "2020-08-03T09:47:35.968+0000",
                "createdFor": [
                    "01305447637218918413",
                    "01307587033424691266"
                ],
                "creator": "ap creator",
                "IL_SYS_NODE_TYPE": "DATA_NODE",
                "os": [
                    "All"
                ],
                "totalScore": 0,
                "pkgVersion": 1,
                "versionKey": "1596448051259",
                "idealScreenDensity": "hdpi",
                "framework": "SLDEV",
                "s3Key": "ecar_files/do_113078100229644288146/ap-test_1596448053733_do_113078100229644288146_1.0.ecar",
                "lastSubmittedOn": "2020-08-03T09:46:26.727+0000",
                "createdBy": "56dcb023-7b5d-459d-9e92-1b679f5afe59",
                "compatibilityLevel": 2,
                "IL_UNIQUE_ID": "do_113078100229644288146",
                "board": "sldev",
                "resourceType": "Teach",
                "node_id": 483
            }
          ],
        "count": 19
    }
}
**/
async learningResoucesList(req) {
  return new Promise(async (resolve, reject) => {
    try {

      let learningResoucesList = await observationsHelper.learningResoucesList(req.userDetails.userToken,req.userDetails.userId,req.pageNo,req.pageSize);
      return resolve({ 
        message:learningResoucesList.message, 
        result:learningResoucesList.data 
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
  * @api {post} /design/api/v1/observations/learningResoucesFilters get learning resources Filters
  * @apiVersion 1.0.0
  * @apiName Learning resources filters
  * @apiGroup Observations
  * @apiSampleRequest /design/api/v1/observations/learningResoucesFilters
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
{
  "message": "filters fetched successfully.",
  "status": 200,
  "result": [
      {
          "code": "board",
          "terms": [
              {
                  "code": "sldev",
                  "name": "sldev"
              }
          ]
      },
      {
          "code": "medium",
          "terms": [
              {
                  "code": "english",
                  "name": "English"
              },
              {
                  "code": "tamil",
                  "name": "Tamil"
              },
              {
                  "code": "hindi",
                  "name": "Hindi"
              },
              {
                  "code": "kannada",
                  "name": "Kannada"
              }
          ]
      },
      {
          "code": "gradeLevel",
          "terms": [
              {
                  "code": "class1",
                  "name": "Class1"
              }
          ]
      },
      {
          "code": "subject",
          "terms": [
              {
                  "code": "science",
                  "name": "Science"
              }
          ]
      }
  ]
}
**/
async learningResoucesFilters(req) {
  return new Promise(async (resolve, reject) => {
    try {

      let learningResoucesFilter = await observationsHelper.learningResoucesFilters(req.userDetails.userToken,req.userDetails.userId);
      return resolve({ 
        message:learningResoucesFilter.message, 
        result:learningResoucesFilter.data 
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
