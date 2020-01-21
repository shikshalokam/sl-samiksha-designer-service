/**
 * name : draftFrameworks.js
 * author : Aman
 * created-date : 22-Nov-2018
 * Description : Draft frameworks.
 */


// Dependencies.
const frameworksHelper = require(ROOT_PATH + "/module/draftFrameworks/helper");

module.exports = class DraftFrameworks extends Abstract {
  constructor() {
    super(draftFrameworksSchema);
  }

  static get name() {
    return "draftFrameworks";
  }

  /**
* @api {post} /assessment-design/api/v1/draftFrameworks/create create Frameworks
* @apiVersion 1.0.0
* @apiName create Frameworks
* @apiGroup Draft Frameworks
* @apiSampleRequest /assessment-design/api/v1/draftFrameworks/create
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

        let frameworkDocument = await frameworksHelper.create(req.body, req.userDetails.id)

        return resolve({
          status: 200,
          message: "Framework created successfully.",
          result: frameworkDocument
        });
      }
      catch (error) {
        reject({
          status: 500,
          message: error,
          errorObject: error
        })
      }
    })
  }

  /**
* @api {post} /assessment-design/api/v1/draftFrameworks/list?search=:search&page=:page&limit=:limit list frameworks
* @apiVersion 1.0.0
* @apiName List frameworks by userId
* @apiGroup Draft Frameworks
* @apiSampleRequest /assessment-design/api/v1/draftFrameworks/list?search=a&page=1&limit=10
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
        matchQuery["$match"]["userId"] = req.userDetails.id

        if (req.query.listType) {
          matchQuery["$match"]["status"] = req.query.listType;
        }

        matchQuery["$match"]["$or"] = []
        matchQuery["$match"]["$or"].push({ "name": new RegExp(req.searchText, 'i') }, { "description": new RegExp(req.searchText, 'i') }, { "externalId": new RegExp(req.searchText, 'i') })
        let frameworksList = await frameworksHelper.list(matchQuery, req.pageSize, req.pageNo)
        let messageData = "Frameworks fetched successfully";
        if (!frameworksList[0].count) {
          frameworksList[0].count = 0
          messageData = "No framework found"
        }
        return resolve({
          result: frameworksList[0],
          message: messageData
        })
      } catch (error) {
        return reject({
          status: 500,
          message: error
        })
      }
    })
  }

  /**
  * @api {post} /assessment-design/api/v1/draftFrameworks/details/{frameworkId} framework details
  * @apiVersion 1.0.0
  * @apiName Framework details
  * @apiGroup Draft Frameworks
  * @apiSampleRequest /assessment-design/api/v1/draftFrameworks/details/5daec85d58e6e53dbdd84e0f
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  */

  async details(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftFrameworkDocument = await database.models.draftFrameworks.findOne({
          _id: req.params._id,
          userId: req.userDetails.id
        }).lean()

        if (!draftFrameworkDocument) {
          throw { status: 404, message: "No framework found" };
        }

        return resolve({
          message: "details fetched successfully",
          status: 200,
          result: draftFrameworkDocument
        })

      } catch (error) {
        reject({
          status: error.status || 500,
          message: error.message || "Oops! something went wrong."
        })
      }

    })
  }

  /**
* @api {post} /assessment-design/api/v1/draftFrameworks/update/{frameworkId} Update Frameworks
* @apiVersion 1.0.0
* @apiName update Frameworks
* @apiGroup Draft Frameworks
* @apiSampleRequest /assessment-design/api/v1/draftFrameworks/update/5daec85d58e6e53dbdd84e0e
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
          userId: req.userDetails.id
        }

        req.body["updatedBy"] = req.userDetails.id;

        let frameworkDocument = await frameworksHelper.update(
          findQuery, 
          req.body
        )

        return resolve({
          status: 200,
          message: "Framework updated successfully.",
          result: frameworkDocument
        });
      }
      catch (error) {
        reject({
          status: error.status || 500,
          message: error.message || "Oops! something went wrong."
        })
      }
    })
  }

  /**
* @api {post} /assessment-design/api/v1/draftFrameworks/delete/{frameworksId} Delete framework
* @apiVersion 1.0.0
* @apiName Delete framework
* @apiGroup Draft Frameworks
* @apiSampleRequest /assessment-design/api/v1/draftFrameworks/delete/5daec85d58e6e53dbdd84e0e
* @apiUse successBody
* @apiUse errorBody
*/

  async delete(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let findQuery = {
          _id: req.params._id,
          userId: req.userDetails.id
        }

        await frameworksHelper.update(findQuery, { isDeleted: true })

        return resolve({
          message: "deleted successfully",
          status: 200
        })
      } catch (error) {
        reject({
          status: error.status || 500,
          message: error.message || "Oops! something went wrong."
        })
      }
    })
  }
 
};
