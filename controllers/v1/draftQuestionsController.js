module.exports = class DraftQuestions extends Abstract {
  constructor() {
    super(draftQuestionsSchema);
  }

  static get name() {
    return "draftQuestions";
  }

    /**
* @api {post} /assessment-design/api/v1/draftQuestions/list/{frameworkId} Question list
* @apiVersion 1.0.0
* @apiName Question list
* @apiGroup DraftQuestion
* @apiSampleRequest /assessment-design/api/v1/questions/list/{frameworkId}
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
* @api {post} /assessment-design/api/v1/draftQuestions/details/{questionId} Question details
* @apiVersion 1.0.0
* @apiName Question details
* @apiGroup DraftQuestion
* @apiSampleRequest /assessment-design/api/v1/questions/details/{questionId}
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
* @api {post} /assessment-design/api/v1/draftQuestions/create Question create
* @apiVersion 1.0.0
* @apiName Question create
* @apiGroup DraftQuestion
* @apiSampleRequest /assessment-design/api/v1/questions/create
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
*/

async create(req) {
  return new Promise(async (resolve, reject) => {
    return resolve({
      message: "created successfully",
      status: 200
    })
  })
}

/**
* @api {post} /assessment-design/api/v1/draftQuestions/update Question update
* @apiVersion 1.0.0
* @apiName Question update
* @apiGroup DraftQuestion
* @apiSampleRequest /assessment-design/api/v1/questions/update
* @apiHeader {String} X-authenticated-user-token Authenticity token  
* @apiUse successBody
* @apiUse errorBody
*/

async update(req) {
  return new Promise(async (resolve, reject) => {
    return resolve({
      message: "updated successfully",
      status: 200
    })
  })
}

 /**
* @api {post} /assessment-design/api/v1/draftQuestions/delete/{questionId} Delete question
* @apiVersion 1.0.0
* @apiName Delete question
* @apiGroup DraftQuestion
* @apiSampleRequest /assessment-design/api/v1/questions/delete/{questionId}
* @apiHeader {String} X-authenticated-user-token Authenticity token  
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
