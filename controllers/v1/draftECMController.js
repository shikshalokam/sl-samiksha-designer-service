// const solutionsHelper = require(ROOT_PATH + "/module/solutions/helper");
const draftECMHelper = require(ROOT_PATH + "/module/draftECM/helper");
// const FileStream = require(ROOT_PATH + "/generics/fileStream");
// const csv = require("csvtojson");

module.exports = class DraftECM extends Abstract {
  constructor() {
    super(draftECMSchema);
  }

  static get name() {
    return "draftECM";
  }

  /**
* @api {post} /assessment-design/api/v1/draftECM/list/{frameworkId} list draftECM
* @apiVersion 1.0.0
* @apiName list draftECM
* @apiGroup draftECM
* @apiSampleRequest /assessment-design/api/v1/draftECM/list/{frameworkId}
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
  * @api {post} /assessment-design/api/v1/draftECM/details/{draftECMId} details draftECM
  * @apiVersion 1.0.0
  * @apiName details draftECM
  * @apiGroup draftECM
  * @apiSampleRequest /assessment-design/api/v1/draftECM/details/{frameworkId}
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
 * @api {post} /assessment-design/api/v1/draftECM/create create draftECM
 * @apiVersion 1.0.0
 * @apiName create draftECM
 * @apiGroup draftECM
 * @apiSampleRequest /assessment-design/api/v1/draftECM/create
 * @apiHeader {String} X-authenticated-user-token Authenticity token  
 * @apiUse successBody
 * @apiUse errorBody
 */

  async create(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftECMDocument = await draftECMHelper.create(req.body)

        return resolve({
          status: 200,
          message: "Draft ECM created successfully.",
          result: draftECMDocument
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
* @api {post} /assessment-design/api/v1/draftECM/update?frameworkExternalId={frameworkExternalId} Update draftECM
* @apiVersion 1.0.0
* @apiName update draftECM
* @apiGroup draftECM
* @apiSampleRequest /assessment-design/api/v1/draftECM/update?frameworkExternalId=TAF-2019
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
*/

  async update(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftECMDocument = await draftECMHelper.update(req.body, req.params._id)

        return resolve({
          status: 200,
          message: "Draft ECM updated successfully.",
          result: draftECMDocument
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
* @api {post} /assessment-design/api/v1/draftECM/delete/{draftECMId} Delete draftECM
* @apiVersion 1.0.0
* @apiName Delete draftECM
* @apiGroup draftECM
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
