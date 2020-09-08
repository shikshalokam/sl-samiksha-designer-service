
/**
 * name : controllers/draftQuestions.js
 * author : Rakesh Kumar
 * Date : 05-Sep-2020
 * Description : Draft questions informations.
 */

const draftQuestionHelper = require(MODULES_BASE_PATH + "/draftQuestions/helper");


module.exports = class DraftQuestions extends Abstract {
  constructor() {
    super("draftQuestions");
  }

  static get name() {
    return "draftQuestions";
  }

  /**
* @api {post} /design/api/v1/draftQuestions/create Question create
* @apiVersion 1.0.0
* @apiName Question create
* @apiGroup Draft Questions
* @apiParamExample {json} Request:
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
* @apiSampleRequest /design/api/v1/draftQuestions/create
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
* @apiParamExample {json} Response:
{
    "message": "Draft Question created successfully.",
    "status": 200,
    "result": {
        "externalId": "SAMPLE-EXTERNAL-ID",
        "question": [],
        "tip": "DRAFT-QUESTION-TIP",
        "hint": "DRAFT-QUESTION-HINT",
        "responseType": "DRAFT-RESPONSE-TYPE",
        "value": "DRAFT-VALUE",
        "isCompleted": false,
        "showRemarks": false,
        "remarks": "DRAFT-REMARKS",
        "createdBy": "",
        "updatedBy": "",
        "options": [],
        "children": [],
        "questionGroup": [
            "A1"
        ],
        "questionType": "DRAFT-QUESTION-TYPE",
        "modeOfCollection": "DRAFT-MODE-OF-COLLECTION",
        "usedForScoring": "percentage",
        "fileName": [],
        "accessibility": "DRAFT-ACCESSIBILITY",
        "instanceIdentifier": "DRAFT-INSTANCE-IDENTIFIER",
        "noOfInstances": 0,
        "notApplicable": false,
        "canBeNotApplicable": false,
        "instanceQuestionsString": "",
        "instanceQuestions": [],
        "isAGeneralQuestion": false,
        "dateFormat": "dd-mm-yyyy",
        "autoCapture": "SAMPLE-AUTO-CAPTURE",
        "rubricLevel": "RUBRIC-LEVEL",
        "sectionHeader": "SAMPLE-SECTION-HEADER",
        "allowAudioRecording": false,
        "page": "SAMPLE-PAGE",
        "questionNumber": "SAMPLE-QUESTION-NUMBER",
        "isDeleted": false,
        "_id": "5f5769c9659c7e3e78f05dc9",
        "deleted": false,
        "draftCriteriaId": "5db0292179e31f1b85d11ca9",
        "draftFrameworkId": "5daec85d58e6e53dbdd84e0e",
        "draftEvidenceMethodId": "5daff8ae9b71b24fcad7b182",
        "draftSectionId": "5db01480bd197138284799cf",
        "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "updatedAt": "2020-09-08T11:23:53.676Z",
        "createdAt": "2020-09-08T11:23:53.676Z",
        "__v": 0
    }
}
*/

  async create(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftQuestionData = _.merge(req.body, { userId: req.userDetails.userId })

        let draftQuestionDocument = await draftQuestionHelper.create(draftQuestionData)

        return resolve({
          status: HTTP_STATUS_CODE["ok"].status,
          message: CONSTANTS.apiResponses.DRAFT_QUESTION_CREATED,
          result: draftQuestionDocument
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
* @api {get} /design/api/v1/draftQuestions/list/{draftFrameworkId}?search=:search&page=:page&limit=:limit Question list
* @apiVersion 1.0.0
* @apiName Question list
* @apiGroup Draft Questions
* @apiSampleRequest /design/api/v1/draftQuestions/list/5daec85d58e6e53dbdd84e0e?search=a&page=1&limit=10
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
* @apiParamExample {json} Response:
{
    "message": "Draft questions fetched successfully.",
    "status": 200,
    "result": {
        "data": [
            {
                "_id": "5f5769c9659c7e3e78f05dc9",
                "externalId": "SAMPLE-EXTERNAL-ID",
                "question": [],
                "responseType": "DRAFT-RESPONSE-TYPE"
            }
        ],
        "count": 1
    }
}
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
        matchQuery["$match"]["$or"].push({ "externalId": new RegExp(req.searchText, 'i') })

        let draftQuestionsList = await draftQuestionHelper.list(matchQuery, req.pageSize, req.pageNo)

        let messageData = CONSTANTS.apiResponses.DRAFT_QUESTION_FETCHED;

        if (!draftQuestionsList[0].count) {
          draftQuestionsList[0].count = 0
          messageData = CONSTANTS.apiResponses.DRAFT_QUESTION_NOT_FOUND;
        }

        return resolve({
          result: draftQuestionsList[0],
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
  * @api {post} /design/api/v1/draftQuestions/details/{draftQuestionId} Question details
  * @apiVersion 1.0.0
  * @apiName Question details
  * @apiGroup Draft Questions
  * @apiSampleRequest /design/api/v1/draftQuestions/details/5db108b4e740c01b5bbe6faa
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  {
    "message": "Draft question details fetched successfully.",
    "status": 200,
    "result": {
        "_id": "5f5769c9659c7e3e78f05dc9",
        "externalId": "SAMPLE-EXTERNAL-ID",
        "question": [],
        "tip": "DRAFT-QUESTION-TIP",
        "hint": "DRAFT-QUESTION-HINT",
        "responseType": "DRAFT-RESPONSE-TYPE",
        "value": "DRAFT-VALUE",
        "isCompleted": false,
        "showRemarks": false,
        "remarks": "DRAFT-REMARKS",
        "createdBy": "",
        "updatedBy": "",
        "options": [],
        "children": [],
        "questionGroup": [
            "A1"
        ],
        "questionType": "DRAFT-QUESTION-TYPE",
        "modeOfCollection": "DRAFT-MODE-OF-COLLECTION",
        "usedForScoring": "percentage",
        "fileName": [],
        "accessibility": "DRAFT-ACCESSIBILITY",
        "instanceIdentifier": "DRAFT-INSTANCE-IDENTIFIER",
        "noOfInstances": 0,
        "notApplicable": false,
        "canBeNotApplicable": false,
        "instanceQuestionsString": "",
        "instanceQuestions": [],
        "isAGeneralQuestion": false,
        "dateFormat": "dd-mm-yyyy",
        "autoCapture": "SAMPLE-AUTO-CAPTURE",
        "rubricLevel": "RUBRIC-LEVEL",
        "sectionHeader": "SAMPLE-SECTION-HEADER",
        "allowAudioRecording": false,
        "page": "SAMPLE-PAGE",
        "questionNumber": "SAMPLE-QUESTION-NUMBER",
        "isDeleted": false,
        "deleted": false,
        "draftCriteriaId": "5db0292179e31f1b85d11ca9",
        "draftFrameworkId": "5daec85d58e6e53dbdd84e0e",
        "draftEvidenceMethodId": "5daff8ae9b71b24fcad7b182",
        "draftSectionId": "5db01480bd197138284799cf",
        "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "updatedAt": "2020-09-08T11:23:53.676Z",
        "createdAt": "2020-09-08T11:23:53.676Z",
        "__v": 0
    }
 }
  */

  async details(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftQuestionDocument = await draftQuestionHelper.details(req.params._id, req.userDetails.userId);
        return resolve(draftQuestionDocument)

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
  * @api {post} /design/api/v1/draftQuestions/update/{draftQuestionId} Question update
  * @apiVersion 1.0.0
  * @apiName Question update
  * @apiGroup Draft Questions
  * @apiSampleRequest /design/api/v1/draftQuestions/update/5f5769c9659c7e3e78f05dc9
  * @apiHeader {String} X-authenticated-user-token Authenticity token  
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  {
    "message": "Draft Question updated successfully.",
    "status": 200,
    "result": {
        "_id": "5f5769c9659c7e3e78f05dc9",
        "externalId": "Ia/1",
        "question": [],
        "tip": "DRAFT-QUESTION-TIP",
        "hint": "DRAFT-QUESTION-HINT",
        "responseType": "DRAFT-RESPONSE-TYPE",
        "value": "DRAFT-VALUE",
        "isCompleted": false,
        "showRemarks": false,
        "remarks": "DRAFT-REMARKS",
        "createdBy": "",
        "updatedBy": "",
        "options": [],
        "children": [],
        "questionGroup": [
            "A1"
        ],
        "questionType": "DRAFT-QUESTION-TYPE",
        "modeOfCollection": "DRAFT-MODE-OF-COLLECTION",
        "usedForScoring": "percentage",
        "fileName": [],
        "accessibility": "DRAFT-ACCESSIBILITY",
        "instanceIdentifier": "DRAFT-INSTANCE-IDENTIFIER",
        "noOfInstances": 0,
        "notApplicable": false,
        "canBeNotApplicable": false,
        "instanceQuestionsString": "",
        "instanceQuestions": [],
        "isAGeneralQuestion": false,
        "dateFormat": "dd-mm-yyyy",
        "autoCapture": "SAMPLE-AUTO-CAPTURE",
        "rubricLevel": "RUBRIC-LEVEL",
        "sectionHeader": "SAMPLE-SECTION-HEADER",
        "allowAudioRecording": false,
        "page": "SAMPLE-PAGE",
        "questionNumber": "SAMPLE-QUESTION-NUMBER",
        "isDeleted": false,
        "deleted": false,
        "draftCriteriaId": "5db0292179e31f1b85d11ca9",
        "draftFrameworkId": "5daec85d58e6e53dbdd84e0e",
        "draftEvidenceMethodId": "5daff8ae9b71b24fcad7b182",
        "draftSectionId": "5db01480bd197138284799cf",
        "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "updatedAt": "2020-09-08T11:31:37.812Z",
        "createdAt": "2020-09-08T11:23:53.676Z",
        "__v": 0
    }
}
  */

  async update(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let findQuery = {
          _id: req.params._id,
          userId: req.userDetails.userId
        }

        let draftQuestionDocument = await draftQuestionHelper.update(findQuery, req.body)

        return resolve({
          status: HTTP_STATUS_CODE["ok"].status,
          message: CONSTANTS.apiResponses.DRAFT_QUESTION_UPDATED,
          result: draftQuestionDocument
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
 * @api {post} /design/api/v1/draftQuestions/delete/{draftQuestionId} Delete question
 * @apiVersion 1.0.0
 * @apiName Delete question
 * @apiGroup Draft Questions
 * @apiSampleRequest /design/api/v1/draftQuestions/delete/5db108b4e740c01b5bbe6faa
 * @apiHeader {String} X-authenticated-user-token Authenticity token  
 * @apiUse successBody
 * @apiUse errorBody
 * @apiParamExample {json} Response:
 {
    "message": "Draft question deleted successfully.",
    "status": 200
 }
 */

  async delete(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let findQuery = {
          _id: req.params._id,
          userId: req.userDetails.userId
        }

        await draftQuestionHelper.update(findQuery, { isDeleted: true })

        return resolve({
          message: CONSTANTS.apiResponses.DRAFT_QUESTION_DELETED,
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
