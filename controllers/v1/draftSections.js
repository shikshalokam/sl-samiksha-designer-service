
/**
 * name : controllers/draftSections.js
 * author : Rakesh Kumar
 * Date : 05-Sep-2020
 * Description : Draft sections related information
 */
const draftSectionsHelper = require(MODULES_BASE_PATH + "/draftSections/helper");

module.exports = class DraftSections extends Abstract {
  constructor() {
    super("draftSections");
  }

  static get name() {
    return "draftSections";
  }

  /**
* @api {post} /design/api/v1/draftSections/create create draftSections
* @apiVersion 1.0.0
* @apiName create draftSections
* @apiGroup Draft Sections
* @apiSampleRequest /design/api/v1/draftSections/create
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

        let draftSectionsData = _.merge(req.body, { userId: req.userDetails.userId })

        let draftSectionsDocument = await draftSectionsHelper.create(draftSectionsData)

        return resolve({
          status: HTTP_STATUS_CODE["ok"].status,
          message: CONSTANTS.apiResponses.SECTION_CREATED,
          result: draftSectionsDocument
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
 * @api {post} /design/api/v1/draftSections/list/{draftFrameworkId}?search=:searchText&page=:page&limit=:limit list draftSections
 * @apiVersion 1.0.0
 * @apiName list draftSections
 * @apiGroup Draft Sections
 * @apiSampleRequest /design/api/v1/draftSections/list
 * @apiHeader {String} X-authenticated-user-token Authenticity token  
 * @apiSampleRequest /design/api/v1/draftSections/list/5daec85d58e6e53dbdd84e0e?search=a&page=1&limit=10
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
        matchQuery["$match"]["userId"] = req.userDetails.userId

        matchQuery["$match"]["$or"] = []
        matchQuery["$match"]["$or"].push({ "name": new RegExp(req.searchText, 'i') }, { "code": new RegExp(req.searchText, 'i') })

        let draftSectionsList = await draftSectionsHelper.list(matchQuery, req.pageSize, req.pageNo)

        let messageData = CONSTANTS.apiResponses.SECTION_FETCHED; 

        if (!draftSectionsList[0].count) {
          draftSectionsList[0].count = 0
          messageData = CONSTANTS.apiResponses.SECTION_NOT_FOUND;
        }

        return resolve({
          result: draftSectionsList[0],
          message: messageData
        })

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
 * @api {post} /design/api/v1/draftSections/details/{draftSectionId} details draftSections
 * @apiVersion 1.0.0
 * @apiName details draftSections
 * @apiGroup Draft Sections
 * @apiSampleRequest /design/api/v1/draftSections/details/5daec85d58e6e53dbdd84e0e
 * @apiHeader {String} X-authenticated-user-token Authenticity token  
 * @apiUse successBody
 * @apiUse errorBody
 */

  async details(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftSectionDocument = await database.models.draftSections.findOne({
          _id: req.params._id,
          userId: req.userDetails.userId
        }).lean()

        if (!draftSectionDocument) {
          throw { status: HTTP_STATUS_CODE["not_found"].status, message: CONSTANTS.apiResponses.SECTION_NOT_FOUND };
        }

        return resolve({
          message: CONSTANTS.apiResponses.SECTION_DETAILS_FETCHED,
          status: HTTP_STATUS_CODE["ok"].status,
          result: draftSectionDocument
        })

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
* @api {post} /design/api/v1/draftSections/update/{draftSectionId} Update draftSections
* @apiVersion 1.0.0
* @apiName update draftSections
* @apiGroup Draft Sections
* @apiSampleRequest /design/api/v1/draftSections/update/5db01480bd197138284799cf
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
*/

  async update(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let findQuery = {
          _id: req.params._id,
          userId: req.userDetails.userId
        }

        let draftECMDocument = await draftSectionsHelper.update(findQuery, req.body)

        return resolve({
          status: HTTP_STATUS_CODE["ok"].status,
          message: CONSTANTS.apiResponses.SECTION_UPDATED,
          result: draftECMDocument
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
* @api {post} /design/api/v1/draftSections/delete/{draftSectionsId} Delete draftSections
* @apiVersion 1.0.0
* @apiName Delete draftSections
* @apiSampleRequest /design/api/v1/draftSections/delete/5db01480bd197138284799cf
* @apiGroup DraftSections
* @apiUse successBody
* @apiUse errorBody
*/

  async delete(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let findQuery = {
          _id: req.params._id,
          userId: req.userDetails.userId
        }

        await draftSectionsHelper.update(findQuery, { isDeleted: true })

        return resolve({
          message: CONSTANTS.apiResponses.SECTION_DELETED,
          status: HTTP_STATUS_CODE["ok"].status
        })
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
