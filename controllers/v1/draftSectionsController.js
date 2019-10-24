const draftSectionsHelper = require(ROOT_PATH + "/module/draftSections/helper");

module.exports = class DraftSections extends Abstract {
  constructor() {
    super(draftSectionsSchema);
  }

  static get name() {
    return "draftSections";
  }

  /**
* @api {post} /assessment-design/api/v1/draftSections/create create draftSections
* @apiVersion 1.0.0
* @apiName create draftSections
* @apiGroup Draft Sections
* @apiSampleRequest /assessment-design/api/v1/draftSections/create
  * @apiParamExample {json} Request-Body:
  * {
    "draftFrameworkId":"5daec85d58e6e53dbdd84e0e",
	  "code":"DF"
 }
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
*/

  async create(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftSectionsData = _.merge(req.body, { userId: req.userDetails.id })

        let draftSectionsDocument = await draftSectionsHelper.create(draftSectionsData)

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
 * @api {post} /assessment-design/api/v1/draftSections/list/{draftFrameworkId}?search=:searchText&page=:page&limit=:limit list draftSections
 * @apiVersion 1.0.0
 * @apiName list draftSections
 * @apiGroup Draft Sections
 * @apiSampleRequest /assessment-design/api/v1/draftSections/list
 * @apiHeader {String} X-authenticated-user-token Authenticity token  
 * @apiSampleRequest /assessment-design/api/v1/draftSections/list/5daec85d58e6e53dbdd84e0e?search=a&page=1&limit=10
 * @apiUse successBody
 * @apiUse errorBody
 */

  async list(req) {
    return new Promise(async (resolve, reject) => {

      try {


        let matchQuery = {}

        matchQuery["$match"] = {}
        matchQuery["$match"]["draftFrameworkId"] = ObjectId(req.params._id)
        matchQuery["$match"]["isDeleted"] = false
        matchQuery["$match"]["userId"] = req.userDetails.id

        matchQuery["$match"]["$or"] = []
        matchQuery["$match"]["$or"].push({ "name": new RegExp(req.searchText, 'i') }, { "code": new RegExp(req.searchText, 'i') })

        let draftSectionsList = await draftSectionsHelper.list(matchQuery, req.pageSize, req.pageNo)

        let messageData = "Draft Sections fetched successfully";

        if (!draftSectionsList[0].count) {
          draftSectionsList[0].count = 0
          messageData = "No draft sections found"
        }

        return resolve({
          result: draftSectionsList[0],
          message: messageData
        })

      } catch (error) {
        return reject({
          status: error.status || 500,
          message: error.message || "Oops! something went wrong."
        })
      }
    })
  }

  /**
 * @api {post} /assessment-design/api/v1/draftSections/details/{draftSectionId} details draftSections
 * @apiVersion 1.0.0
 * @apiName details draftSections
 * @apiGroup Draft Sections
 * @apiSampleRequest /assessment-design/api/v1/draftSections/details/5daec85d58e6e53dbdd84e0e
 * @apiHeader {String} X-authenticated-user-token Authenticity token  
 * @apiUse successBody
 * @apiUse errorBody
 */

  async details(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftSectionDocument = await database.models.draftSections.findOne({
          _id: req.params._id,
          userId: req.userDetails.id
        }).lean()

        if (!draftSectionDocument) {
          throw { status: 404, message: "No draft section found" };
        }

        return resolve({
          message: "Draft sections details fetched successfully",
          status: 200,
          result: draftSectionDocument
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
* @api {post} /assessment-design/api/v1/draftSections/update/{draftSectionId} Update draftSections
* @apiVersion 1.0.0
* @apiName update draftSections
* @apiGroup Draft Sections
* @apiSampleRequest /assessment-design/api/v1/draftSections/update/5db01480bd197138284799cf
* @apiHeader {String} X-authenticated-user-token Authenticity token  
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

        let draftECMDocument = await draftSectionsHelper.update(findQuery, req.body)

        return resolve({
          status: 200,
          message: "Draft Section updated successfully.",
          result: draftECMDocument
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
* @api {post} /assessment-design/api/v1/draftSections/delete/{draftSectionsId} Delete draftSections
* @apiVersion 1.0.0
* @apiName Delete draftSections
* @apiSampleRequest /assessment-design/api/v1/draftSections/delete/5db01480bd197138284799cf
* @apiGroup DraftSections
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

        await draftSectionsHelper.update(findQuery, { isDeleted: true })

        return resolve({
          message: "deleted successfully",
          status: 200
        })
      } catch (error) {
        reject({
          status: error.status,
          message: error.message
        })
      }
    })
  }
};
