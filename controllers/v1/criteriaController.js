const csv = require("csvtojson");
const FileStream = require(ROOT_PATH + "/generics/fileStream");

module.exports = class Criteria extends Abstract {

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
    super(criteriaSchema);
  }

  static get name() {
    return "criteria";
  }

  /**
  * @api {post} /assessment-design/api/v1/criteria/insert Add Criteria
  * @apiVersion 1.0.0
  * @apiName Add Criteria
  * @apiGroup Criteria
  * @apiParamExample {json} Request-Body:
* {
  "externalId": "",
*  "owner": "",
*  "timesUsed": "",
*  "weightage": "",
*  "remarks": "",
*  "name": "",
*  "description": "",
*  "criteriaType": "",
*  "score": "",
*  "resourceType": [
*    "Program",
*    "Framework",
*    "Criteria"
*  ],
*  "language": [
*    "English"
*  ],
*  "keywords": [
*    "Keyword 1",
*    "Keyword 2"
*  ],
*  "concepts": [
*    {
*      "identifier": "",
*      "name": "",
*      "objectType": "",
*      "relation": "",
*      "description": ,
*      "index": "",
*      "status": "",
*      "depth": "",
*      "mimeType": "",
*      "visibility": "",
*      "compatibilityLevel":"" 
*    },
*    {
*      "identifier": "",
*      "name": "",
*      "objectType": "",
*      "relation": "",
*      "description": "",
*      "index": "",
*      "status": "",
*      "depth": "",
*      "mimeType": "",
*      "visibility": "",
*      "compatibilityLevel": ""
*    }
*  ],
*  "flag": "",
*  "createdFor": [
*    "",
*    ""
*  ],
*  "rubric": {
*    "levels": [
*      {
*        "level": "L1",
*        "label": "Level 1",
*        "description": "",
*        "expression": "",
*        "expressionVariables": []
*      },
*      {
*        "level": "L2",
*        "label": "Level 2",
*        "description": "",
*        "expression": "",
*        "expressionVariables": []
*      },
*      {
*        "level": "L3",
*        "label": "Level 3",
*        "description": "",
*        "expression": "",
*        "expressionVariables": []
*      },
*      {
*        "level": "L4",
*        "label": "Level 4",
*        "description": "",
*        "expression": "",
*        "expressionVariables": []
*      }
*    ]
*  },
*  "evidences": []
* }
* @apiUse successBody
* @apiUse errorBody
  */

  insert(req) {

    return new Promise(async (resolve, reject) => {

      try {

        let result = {}
        let criteria = req.body
        criteria.owner = req.userDetails.id;

        let rubricStructure = {
          name: criteria.rubric.name,
          description: criteria.rubric.description,
          type: criteria.rubric.type,
          levels: {}
        }

        criteria.rubric.levels.forEach((levelELement) => {
          delete levelELement.expressionVariables
          rubricStructure.levels[levelELement.level] = levelELement
        })

        criteria.rubric = rubricStructure
        let generatedCriteriaDocument = await database.models.criteria.create(
          criteria
        );

        result._id = generatedCriteriaDocument._id


        let responseMessage = "Criteria added successfully."

        let response = { message: responseMessage, result: result };

        return resolve(response);
      } catch (error) {
        return reject({ message: error });
      }

    })
  }

  /**
  * @api {post} /assessment-design/api/v1/criteria/update/{criteriaId} Update Criteria
  * @apiVersion 1.0.0
  * @apiName Update Criteria
  * @apiGroup Criteria
  * @apiParamExample {json} Request-Body:
* {
  "externalId": "",
*  "owner": "",
*  "timesUsed": "",
*  "weightage": "",
*  "remarks": "",
*  "name": "",
*  "description": "",
*  "criteriaType": "",
*  "score": "",
*  "resourceType": [
*    "Program",
*    "Framework",
*    "Criteria"
*  ],
*  "language": [
*    "English"
*  ],
*  "keywords": [
*    "Keyword 1",
*    "Keyword 2"
*  ],
*  "concepts": [
*    {
*      "identifier": "",
*      "name": "",
*      "objectType": "",
*      "relation": "",
*      "description": ,
*      "index": "",
*      "status": "",
*      "depth": "",
*      "mimeType": "",
*      "visibility": "",
*      "compatibilityLevel":"" 
*    },
*    {
*      "identifier": "",
*      "name": "",
*      "objectType": "",
*      "relation": "",
*      "description": "",
*      "index": "",
*      "status": "",
*      "depth": "",
*      "mimeType": "",
*      "visibility": "",
*      "compatibilityLevel": ""
*    }
*  ],
*  "flag": "",
*  "createdFor": [
*    "",
*    ""
*  ],
*  "rubric": {
*    "levels": [
*      {
*        "level": "L1",
*        "label": "Level 1",
*        "description": "",
*        "expression": "",
*        "expressionVariables": []
*      },
*      {
*        "level": "L2",
*        "label": "Level 2",
*        "description": "",
*        "expression": "",
*        "expressionVariables": []
*      },
*      {
*        "level": "L3",
*        "label": "Level 3",
*        "description": "",
*        "expression": "",
*        "expressionVariables": []
*      },
*      {
*        "level": "L4",
*        "label": "Level 4",
*        "description": "",
*        "expression": "",
*        "expressionVariables": []
*      }
*    ]
*  },
*  "evidences": []
* }
* @apiUse successBody
* @apiUse errorBody
  */

  update(req) {

    return new Promise(async (resolve, reject) => {

      try {

        let criteriaQueryObject = {"_id":ObjectId(req.params._id)};
        let criteria = req.body;
        criteria.owner = req.userDetails.id;

        let rubricStructure = {
          name: criteria.rubric.name,
          description: criteria.rubric.description,
          type: criteria.rubric.type,
          levels: {}
        }

        criteria.rubric.levels.forEach((levelELement) => {
          delete levelELement.expressionVariables
          rubricStructure.levels[levelELement.level] = levelELement
        })

        criteria.rubric = rubricStructure

        let updateObject = criteria

        await database.models.criteria.findOneAndUpdate(
          criteriaQueryObject,
          updateObject
        );

        let response = { message: "Criteria updated successfully.", result: updateObject };

        return resolve(response);
      } catch (error) {
        return reject({ message: error });
      }

    })
  }

  /**
  * @api {post} /assessment-design/api/v1/criteria/delete/{criteriaId} Delete Criteria
  * @apiVersion 1.0.0
  * @apiName Delete Criteria
  * @apiGroup Criteria
  * @apiUse successBody
  * @apiUse errorBody
  */

  delete(req) {

    return new Promise(async (resolve, reject) => {

      try {

        let criteriaQueryObject = {"_id":ObjectId(req.params._id)};

        let updateObject = {
          deletedAt: new Date()
        }

        await database.models.criteria.findOneAndUpdate(
          criteriaQueryObject,
          updateObject
        );

        let response = { message:  "Criteria deleted successfully." };

        return resolve(response);
      } catch (error) {
        return reject({ message: error });
      }

    })
  }

  /**
  * @api {get} /assessment-design/api/v1/criteria/details/{criteriaId} Get criteria details
  * @apiVersion 1.0.0
  * @apiName Criteria Details
  * @apiGroup Criteria
  * @apiUse successBody
  * @apiUse errorBody
  */

  details(req) {

    return new Promise(async (resolve, reject) => {

      try {

        let criteriaQueryObject = {
          "_id":ObjectId(req.params._id),
          "deletedAt": { $exists: false }  
        };

        let criteriaDocument = await database.models.criteria.findOne(
          criteriaQueryObject
        ).lean();

        if(!criteriaDocument){
          return resolve({
            status: 400,
            message: "No criteria found for given params."
          });
        }

        let response = { message:  "Criteria details fetched successfully.",result: criteriaDocument};

        return resolve(response);
      } catch (error) {
        return reject({ message: error });
      }

    })
  }

};



