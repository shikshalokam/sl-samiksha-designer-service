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
  * @api {post} /design/api/v1/observations/getFrameworkForm get framework form
  * @apiVersion 1.0.0
  * @apiName Get framework form
  * @apiGroup Observations
  * @apiSampleRequest /design/api/v1/observations/getFrameworkForm
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  * {
    "message": "Observation framework form fetched successfully.",
    "status": 200,
    "result": [
        {
            "_id": "5f5b309700f4c0741d9f607d",
            "name": "ObservationFramework",
            "value": [
                {
                    "field": "solutionName",
                    "value": "",
                    "visible": true,
                    "editable": true,
                    "label": "Solution Name",
                    "input": "text",
                    "validation": [
                        {
                            "name": "required",
                            "validator": "required",
                            "message": "Solution Name required"
                        }
                    ]
                },
                {
                    "field": "description",
                    "value": "",
                    "visible": true,
                    "editable": true,
                    "label": "Description",
                    "input": "textarea",
                    "validation": []
                },
                {
                    "field": "addkeywords",
                    "value": "",
                    "visible": true,
                    "editable": true,
                    "label": "Addkeywords",
                    "input": "select",
                    "validation": [],
                    "options": []
                },
                {
                    "field": "language",
                    "value": "",
                    "visible": true,
                    "editable": true,
                    "label": "Language",
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
                    "field": "entitytype",
                    "value": "",
                    "visible": true,
                    "editable": true,
                    "label": "Entitytype",
                    "input": "select",
                    "validation": [
                        {
                            "name": "required",
                            "validator": "required",
                            "message": "Entitytype required"
                        }
                    ],
                    "options": [
                        {
                            "_id": "5d9da6ed82a97bfe6bbc3f63",
                            "name": "mandal"
                        },
                        {
                            "_id": "5d9da79782a97bfe6bbc402b",
                            "name": "complex"
                        }
                    ]
                },
                {
                    "field": "voiceover",
                    "value": "",
                    "visible": true,
                    "editable": true,
                    "label": "Voiceover",
                    "input": "radio",
                    "validation": [],
                    "options": [
                        {
                            "label": "YES",
                            "value": "yes"
                        },
                        {
                            "label": "NO",
                            "value": "no"
                        }
                    ]
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

};
