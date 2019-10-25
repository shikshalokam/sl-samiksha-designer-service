const draftQuestionHelper = require(ROOT_PATH + "/module/draftQuestions/helper");


module.exports = class DraftQuestions extends Abstract {
  constructor() {
    super(draftQuestionsSchema);
  }

  static get name() {
    return "draftQuestions";
  }

  /**
* @api {post} /assessment-design/api/v1/draftQuestions/create Question create
* @apiVersion 1.0.0
* @apiName Question create
* @apiGroup Draft Questions
* @apiParamExample {json} Request-Body:
{
	"externalId":"SAMPLE-EXTERNAL-ID",
    "draftCriteriaId":"5db0292179e31f1b85d11ca9",
    "draftFrameworkId":"5daec85d58e6e53dbdd84e0e",
    "draftEvidenceMethodId":"5daff8ae9b71b24fcad7b182",
    "draftSectionId":"5db01480bd197138284799cf",
    "question":[],
    "tip":"DRAFT-QUESTION-TIP",
    "hint":"DRAFT-QUESTION-HINT",
    "responseType":"DRAFT-RESPONSE-TYPE",
    "value":"DRAFT-VALUE",
    "isCompleted": false,
    "showRemarks": false,
    "remarks":"DRAFT-REMARKS",
    "visibleIf":{},
    "createdBy":"",
    "updatedBy":"",
    "options":[],
    "children":[],
    "questionGroup": ["A1"],
    "questionType":"DRAFT-QUESTION-TYPE",
    "modeOfCollection":"DRAFT-MODE-OF-COLLECTION",
    "usedForScoring":"percentage",
    "file":{},
    "fileName": [],
    "validation": {},
    "accessibility":"DRAFT-ACCESSIBILITY",
    "instanceIdentifier":"DRAFT-INSTANCE-IDENTIFIER",
    "noOfInstances":0,
    "notApplicable": false,
    "canBeNotApplicable":false,
    "instanceQuestionsString":"",
    "instanceQuestions":[],
    "isAGeneralQuestion":false,
    "dateFormat":"dd-mm-yyyy",
    "autoCapture":"SAMPLE-AUTO-CAPTURE",
    "rubricLevel":"RUBRIC-LEVEL",
    "sectionHeader":"SAMPLE-SECTION-HEADER",
    "allowAudioRecording":false,
    "page":"SAMPLE-PAGE",
    "questionNumber":"SAMPLE-QUESTION-NUMBER"
}
* @apiSampleRequest /assessment-design/api/v1/draftQuestions/create
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
*/

  async create(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftQuestionData = _.merge(req.body, { userId: req.userDetails.id })

        let draftQuestionDocument = await draftQuestionHelper.create(draftQuestionData)

        return resolve({
          status: 200,
          message: "Draft Question created successfully.",
          result: draftQuestionDocument
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
* @api {get} /assessment-design/api/v1/draftQuestions/list/{draftFrameworkId}?search=:search&page=:page&limit=:limit Question list
* @apiVersion 1.0.0
* @apiName Question list
* @apiGroup Draft Questions
* @apiSampleRequest /assessment-design/api/v1/draftQuestions/list/5daec85d58e6e53dbdd84e0e?search=a&page=1&limit=10
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
        matchQuery["$match"]["$or"].push({ "externalId": new RegExp(req.searchText, 'i') })

        let draftQuestionsList = await draftQuestionHelper.list(matchQuery, req.pageSize, req.pageNo)

        let messageData = "Draft questions fetched successfully";

        if (!draftQuestionsList[0].count) {
          draftQuestionsList[0].count = 0
          messageData = "No draft questions found"
        }

        return resolve({
          result: draftQuestionsList[0],
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
  * @api {post} /assessment-design/api/v1/draftQuestions/details/{draftQuestionId} Question details
  * @apiVersion 1.0.0
  * @apiName Question details
  * @apiGroup Draft Questions
  * @apiSampleRequest /assessment-design/api/v1/draftQuestions/details/5db108b4e740c01b5bbe6faa
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  */

  async details(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftQuestionDocument = await database.models.draftQuestions.findOne({
          _id: req.params._id,
          userId: req.userDetails.id
        }).lean()

        if (!draftQuestionDocument) {
          throw { status: 404, message: "No draft question found" };
        }

        return resolve({
          message: "Draft question details fetched successfully",
          status: 200,
          result: draftQuestionDocument
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
  * @api {post} /assessment-design/api/v1/draftQuestions/update/{draftQuestionId} Question update
  * @apiVersion 1.0.0
  * @apiName Question update
  * @apiGroup Draft Questions
  * @apiSampleRequest /assessment-design/api/v1/draftQuestions/update/5db108b4e740c01b5bbe6faa
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

        let draftQuestionDocument = await draftQuestionHelper.update(findQuery, req.body)

        return resolve({
          status: 200,
          message: "Draft Question updated successfully.",
          result: draftQuestionDocument
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
 * @api {post} /assessment-design/api/v1/draftQuestions/delete/{draftQuestionId} Delete question
 * @apiVersion 1.0.0
 * @apiName Delete question
 * @apiGroup Draft Questions
 * @apiSampleRequest /assessment-design/api/v1/draftQuestions/delete/5db108b4e740c01b5bbe6faa
 * @apiHeader {String} X-authenticated-user-token Authenticity token  
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

        await draftQuestionHelper.update(findQuery, { isDeleted: true })

        return resolve({
          message: "Draft question deleted successfully",
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
