const draftSectionsHelper = require(ROOT_PATH + "/module/draftSections/helper");

module.exports = class draftSections extends Abstract {
  constructor() {
    super(draftSectionsSchema);
  }

  static get name() {
    return "draftSections";
  }

  /**
 * @api {post} /assessment-design/api/v1/draftSections/list/{frameworkId} list draftSections
 * @apiVersion 1.0.0
 * @apiName list draftSections
 * @apiGroup DraftSections
 * @apiSampleRequest /assessment-design/api/v1/draftSections/list/{frameworkId}
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
 * @api {post} /assessment-design/api/v1/draftSections/details/{sectionId} details draftSections
 * @apiVersion 1.0.0
 * @apiName details draftSections
 * @apiGroup DraftSections
 * @apiSampleRequest /assessment-design/api/v1/draftSections/details/{frameworkId}
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
 * @api {post} /assessment-design/api/v1/draftSections/create create draftSections
 * @apiVersion 1.0.0
 * @apiName create draftSections
 * @apiGroup DraftSections
 * @apiSampleRequest /assessment-design/api/v1/draftSections/create
 * @apiHeader {String} X-authenticated-user-token Authenticity token  
 * @apiUse successBody
 * @apiUse errorBody
 */

  async create(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftSectionsDocument = await draftSectionsHelper.create(req.body)

        return resolve({
          status: 200,
          message: "Section created successfully.",
          result: draftSectionsDocument
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
* @api {post} /assessment-design/api/v1/draftSections/update?frameworkExternalId={frameworkExternalId} Update draftSections
* @apiVersion 1.0.0
* @apiName update draftSections
* @apiGroup DraftSections
* @apiSampleRequest /assessment-design/api/v1/draftSections/update?frameworkExternalId=TAF-2019
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
*/

  async update(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftSectionsDocument = await draftSectionsHelper.update(req.body, req.params._id)

        return resolve({
          status: 200,
          message: "Section updated successfully.",
          result: draftSectionsDocument
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
* @api {post} /assessment-design/api/v1/draftSections/delete/{draftSectionsId} Delete draftSections
* @apiVersion 1.0.0
* @apiName Delete draftSections
* @apiGroup DraftSections
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
