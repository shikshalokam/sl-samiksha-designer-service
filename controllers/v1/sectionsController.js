// const solutionsHelper = require(ROOT_PATH + "/module/solutions/helper");
const sectionsHelper = require(ROOT_PATH + "/module/sections/helper");
// const FileStream = require(ROOT_PATH + "/generics/fileStream");
// const csv = require("csvtojson");

module.exports = class Sections extends Abstract {
  constructor() {
    super(sectionsSchema);
  }

  static get name() {
    return "sections";
  }

  /**
 * @api {post} /assessment-design/api/v1/sections/create create sections
 * @apiVersion 1.0.0
 * @apiName create sections
 * @apiGroup sections
 * @apiSampleRequest /assessment-design/api/v1/sections/create
 * @apiHeader {String} X-authenticated-user-token Authenticity token  
 * @apiUse successBody
 * @apiUse errorBody
 */

  async create(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let sectionsDocument = await sectionsHelper.create(req.body)

        return resolve({
          status: 200,
          message: "Section created successfully.",
          result: sectionsDocument
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
* @api {post} /assessment-design/api/v1/sections/update?frameworkExternalId={frameworkExternalId} Update sections
* @apiVersion 1.0.0
* @apiName update sections
* @apiGroup sections
* @apiSampleRequest /assessment-design/api/v1/sections/update?frameworkExternalId=TAF-2019
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
*/

  async update(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let sectionsDocument = await sectionsHelper.update(req.body, req.params._id)

        return resolve({
          status: 200,
          message: "Section updated successfully.",
          result: sectionsDocument
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
