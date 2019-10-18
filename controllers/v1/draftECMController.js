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

        let draftECMDocument = await draftECMHelper.update(req.body,req.params._id)

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
};
