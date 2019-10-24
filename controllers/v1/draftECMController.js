const draftECMHelper = require(ROOT_PATH + "/module/draftECM/helper");

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
* @apiGroup Draft Ecm
* @apiSampleRequest /assessment-design/api/v1/draftECM/create
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiParamExample {json} Request-Body:{
  "code": "LW"
  "tip": "Some tip for the criteria.",
  "name": "Learning Walk",
  "description": "DRAFT-ECM-DESCRIPTION",
  "draftFrameworkId":ObjectId("5dafe18d3dac8566cbc62608"),
  "isSubmitted": "false",
  "modeOfCollection": "onfield",
  "canBeNotApplicable": false,
  "isDeleted":false
  }
* @apiUse successBody
* @apiUse errorBody
*/

  async create(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let ecmData = _.merge(req.body, { userId: req.userDetails.id })

        let draftECMDocument = await draftECMHelper.create(ecmData)

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
* @api {post} /assessment-design/api/v1/draftECM/list/{draftFrameworkId} list draftECM
* @apiVersion 1.0.0
* @apiName list draftECM
* @apiGroup Draft Ecm
* @apiSampleRequest /assessment-design/api/v1/draftECM/list/5daec85d58e6e53dbdd84e0e
* @apiHeader {String} X-authenticated-user-token Authenticity token 
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
        matchQuery["$match"]["$or"].push({ "name": new RegExp(req.searchText, 'i') }, { "description": new RegExp(req.searchText, 'i') }, { "code": new RegExp(req.searchText, 'i') })

        let draftEcmList = await draftECMHelper.list(matchQuery, req.pageSize, req.pageNo)

        let messageData = "Draft Ecm fetched successfully";

        if (!draftEcmList[0].count) {
          draftEcmList[0].count = 0
          messageData = "No draft ecm found"
        }

        return resolve({
          result: draftEcmList[0],
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
  * @api {post} /assessment-design/api/v1/draftECM/details/{draftECMId} details draftECM
  * @apiVersion 1.0.0
  * @apiName details draftECM
  * @apiGroup Draft Ecm
  * @apiSampleRequest /assessment-design/api/v1/draftECM/details/5daff8ae9b71b24fcad7b182
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  */

  async details(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftEcmDocument = await database.models.draftECM.findOne({
          _id: req.params._id,
          userId: req.userDetails.id
        }).lean()

        if (!draftEcmDocument) {
          throw { status: 404, message: "No draft ecm found" };
        }

        return resolve({
          message: "Draft ecm details fetched successfully",
          status: 200,
          result: draftEcmDocument
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
* @api {post} /assessment-design/api/v1/draftECM/update/{draftECMId} Update draftECM
* @apiVersion 1.0.0
* @apiName update Draft ECM
* @apiGroup Draft Ecm
* @apiSampleRequest /assessment-design/api/v1/draftECM/update/5daff8ae9b71b24fcad7b182
* @apiHeader {String} X-authenticated-user-token Authenticity token
* @apiParamExample {json} Request-Body:{
  "code": "BL"
  "tip": "Some tip for the criteria.",
  "name": "Book look",
  }   
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

        let draftECMDocument = await draftECMHelper.update(findQuery, req.body)

        return resolve({
          status: 200,
          message: "Draft ECM updated successfully.",
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
* @api {post} /assessment-design/api/v1/draftECM/delete/{draftECMId} Delete draftECM
* @apiVersion 1.0.0
* @apiName Delete draftECM
* @apiGroup Draft Ecm
* @apiSampleRequest /assessment-design/api/v1/draftECM/delete/5daff8ae9b71b24fcad7b182
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

        await draftECMHelper.update(findQuery, { isDeleted: true })

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
