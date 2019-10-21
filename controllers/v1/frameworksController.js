// const solutionsHelper = require(ROOT_PATH + "/module/solutions/helper");
const frameworksHelper = require(ROOT_PATH + "/module/frameworks/helper");
// const FileStream = require(ROOT_PATH + "/generics/fileStream");
// const csv = require("csvtojson");

module.exports = class Frameworks extends Abstract {
  constructor() {
    super(frameworksSchema);
  }

  static get name() {
    return "frameworks";
  }

  /**
* @api {post} /assessment-design/api/v1/frameworks/list/{criteriaId} list frameworks
* @apiVersion 1.0.0
* @apiName List frameworks
* @apiGroup Frameworks
* @apiSampleRequest /assessment-design/api/v1/frameworks/list/{frameworkId}
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
*/

  async list(req) {
    return new Promise(async (resolve, reject) => {
      return resolve({
        message: "list fetched successfully",
        status: 200
      })
    })
  }

  /**
  * @api {post} /assessment-design/api/v1/frameworks/details/{frameworksId} framework details
  * @apiVersion 1.0.0
  * @apiName Framework details
  * @apiGroup Frameworks
  * @apiSampleRequest /assessment-design/api/v1/frameworks/details/{frameworkId}
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  */

  async details(req) {
    return new Promise(async (resolve, reject) => {
      return resolve({
        message: "details fetched successfully",
        status: 200
      })
    })
  }

  /**
 * @api {post} /assessment-design/api/v1/frameworks/create create Frameworks
 * @apiVersion 1.0.0
 * @apiName create Frameworks
 * @apiGroup Frameworks
 * @apiSampleRequest /assessment-design/api/v1/frameworks/create
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
          message: "Framework inserted successfully.",
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
* @api {post} /assessment-design/api/v1/frameworks/update?frameworkExternalId={frameworkExternalId} Update Frameworks
* @apiVersion 1.0.0
* @apiName update Frameworks
* @apiGroup Frameworks
* @apiSampleRequest /assessment-design/api/v1/frameworks/update?frameworkExternalId=TAF-2019
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

  async update(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let frameworkDocument = await frameworksHelper.update(req.body, req.userDetails.id, req.query.frameworkExternalId)

        return resolve({
          status: 200,
          message: "Framework updated successfully.",
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
* @api {post} /assessment-design/api/v1/frameworks/delete/{frameworksId} Delete framework
* @apiVersion 1.0.0
* @apiName Delete framework
* @apiGroup Frameworks
* @apiUse successBody
* @apiUse errorBody
*/

async delete(req) {
  return new Promise(async (resolve, reject) => {
    return resolve({
      message: "deleted successfully",
      status: 200
    })
  })
}
};
