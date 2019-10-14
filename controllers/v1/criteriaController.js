const csv = require("csvtojson");
const FileStream = require(ROOT_PATH + "/generics/fileStream");

module.exports = class Criteria extends Abstract {

  constructor() {
    super(criteriaSchema);
  }

  static get name() {
    return "criteria";
  }

  /**
  * @api {post} /assessment/api/v1/criteria/insert Add Criteria
  * @apiVersion 1.0.0
  * @apiName Add Criteria
  * @apiGroup Criteria
  * @apiParamExample {json} Request-Body:
* {
  "externalId": "",
*  "owner": "",
*  "timesUsed": "",
*  "weightage": "",
*  "remarks": "",
*  "name": "",
*  "description": "",
*  "criteriaType": "",
*  "score": "",
*  "resourceType": [
*    "Program",
*    "Framework",
*    "Criteria"
*  ],
*  "language": [
*    "English"
*  ],
*  "keywords": [
*    "Keyword 1",
*    "Keyword 2"
*  ],
*  "concepts": [
*    {
*      "identifier": "",
*      "name": "",
*      "objectType": "",
*      "relation": "",
*      "description": ,
*      "index": "",
*      "status": "",
*      "depth": "",
*      "mimeType": "",
*      "visibility": "",
*      "compatibilityLevel":"" 
*    },
*    {
*      "identifier": "",
*      "name": "",
*      "objectType": "",
*      "relation": "",
*      "description": "",
*      "index": "",
*      "status": "",
*      "depth": "",
*      "mimeType": "",
*      "visibility": "",
*      "compatibilityLevel": ""
*    }
*  ],
*  "flag": "",
*  "createdFor": [
*    "",
*    ""
*  ],
*  "rubric": {
*    "levels": [
*      {
*        "level": "L1",
*        "label": "Level 1",
*        "description": "",
*        "expression": "",
*        "expressionVariables": []
*      },
*      {
*        "level": "L2",
*        "label": "Level 2",
*        "description": "",
*        "expression": "",
*        "expressionVariables": []
*      },
*      {
*        "level": "L3",
*        "label": "Level 3",
*        "description": "",
*        "expression": "",
*        "expressionVariables": []
*      },
*      {
*        "level": "L4",
*        "label": "Level 4",
*        "description": "",
*        "expression": "",
*        "expressionVariables": []
*      }
*    ]
*  },
*  "evidences": []
* }
* @apiUse successBody
* @apiUse errorBody
  */

  insert(req) {

    return new Promise(async (resolve, reject) => {

      try {

        let result = {}
        let criteria = req.body
        criteria.owner = req.userDetails.id;

        let rubricStructure = {
          name: criteria.rubric.name,
          description: criteria.rubric.description,
          type: criteria.rubric.type,
          levels: {}
        }

        criteria.rubric.levels.forEach((levelELement) => {
          delete levelELement.expressionVariables
          rubricStructure.levels[levelELement.level] = levelELement
        })

        criteria.rubric = rubricStructure
        let generatedCriteriaDocument = await database.models.criteria.create(
          criteria
        );

        result._id = generatedCriteriaDocument._id


        let responseMessage = "Criteria added successfully."

        let response = { message: responseMessage, result: result };

        return resolve(response);
      } catch (error) {
        return reject({ message: error });
      }

    })
  }

  /**
  * @api {get} /assessment/api/v1/criteria/getEvidence/ Get Criteria Evidences
  * @apiVersion 1.0.0
  * @apiName Get Criteria Evidences
  * @apiGroup Criteria
  * @apiHeader {String} X-authenticated-user-token Authenticity token
  * @apiUse successBody
  * @apiUse errorBody
  */
  async getEvidence(req) {
    let criteria = await this.getCriterias(req);

    return new Promise(async function (resolve, reject) {
      let merged = {},
        query = [],
        sectionData = {};

      await criteria.forEach(function (value, i) {
        query.push({ _id: ObjectId(value) });
      });

      let criterias = await database.models.criteria.find({ $or: query });


      await _.forEachRight(criterias, async function (crit, i) {
        await crit.evidences.forEach(async function (evidence, i) {
          if (!merged[evidence.externalId]) {
            merged[evidence.externalId] = evidence;
          } else {
            merged[evidence.externalId] = Object.assign(
              merged[evidence.externalId],
              evidence
            );
            await _.forEachRight(evidence.sections, (section, i2) => {
              _.forEachRight(
                merged[evidence.externalId].sections,
                (Msection, mi2) => {

                  if (Msection.name == section.name) {

                    merged[evidence.externalId].sections[mi2].questions.concat(
                      section.questions
                    );

                  }
                }
              );
            });
          }
        });
      });

      return resolve(Object.values(merged));
    });
  }

  /**
  * @api {get} /assessment/api/v1/criteria/getCriteriasParentQuesAndInstParentQues/ Get Criterias Parent Ques And instanceParentQuestionId Ques
  * @apiVersion 1.0.0
  * @apiName Get Criterias Parent Ques And Instance Parent Ques
  * @apiGroup Criteria
  * @apiHeader {String} X-authenticated-user-token Authenticity token
  * @apiUse successBody
  * @apiUse errorBody
  */

  async getCriteriasParentQuesAndInstParentQues(req) {
    return new Promise(async function (resolve, reject) {

      let criteriaQueryResult = await database.models.criteria.find({});

      const questionQueryObject = {
        //responseType: "matrix"
      }

      let questionQueryResult = await database.models[
        "questions"
      ].find(questionQueryObject);

      let result = {
        criteria: new Array(),
        questions: new Array(),
        instanceParentQuestions: new Array()
      }

      questionQueryResult.forEach(question => {
        if (question.responseType == "matrix") {
          result.instanceParentQuestions.push({
            _id: question._id,
            externalId: question.externalId,
            name: question.question[0]
          })
        } else {
          result.questions.push({
            _id: question._id,
            externalId: question.externalId,
            name: question.question[0]
          })
        }
      })

      criteriaQueryResult.forEach(criteria => {
        result.criteria.push({
          _id: criteria._id,
          externalId: criteria.externalId,
          name: criteria.name
        })
      })

      let responseMessage = "Fetched requested data successfully."

      let response = { message: responseMessage, result: result };
      return resolve(response);

    }).catch(error => {
      reject(error);
    });
  }

  /**
  * @api {post} /assessment/api/v1/criteria/addQuestion Add Criteria Question
  * @apiVersion 1.0.0
  * @apiName Add Criteria Question
  * @apiGroup Criteria
  * @apiParamExample {json} Request-Body:
  * {
  * "question": [],
  * "externalId": "",
  * "parentId": "",
  * "instanceParentId": "",
  * "visibleIf": [{"operator": "===", "value": "R1"}],
  * "file": {
  *	"required": true, 
  *	"type": ["JPEG"], 
  *	"minCount": Number, 
  *	"maxCount": Number, 
  *	"caption": Boolean
  * },
  * "responseType": "",
  * "validation": {
  *  "required": Boolean
  * },
  * "children": [],
  * "fileName": [],
  * "showRemarks"
  * "isCompleted"
  * "remarks": "",
  * "value": "",
  * "canBeNotApplicable"
  * "notApplicable": "",
  * "usedForScoring": "",
  * "modeOfCollection": "",
  * "questionType": "",
  * "questionGroup": [
  *  "A1"
  * ],
  * "accessibility": "",
  * "payload": {
  *	"criteriaId": "",
  *	"evidenceId": "",
  *	"section": ""
  * }
* }
* @apiUse successBody
* @apiUse errorBody
  */

  addQuestion(req) {

    req.evidenceObjects = this.getEvidenceObjects()

    return new Promise(async (resolve, reject) => {

      try {

        let result = {}

        let question = req.body
        let questionCriteriaId = question.payload.criteriaId
        let questionEvidenceMethod = question.payload.evidenceId
        let questionSection = question.payload.section

        delete question.payload

        let criterias = await database.models.criteria.find({
          externalId: questionCriteriaId
        });

        let questionCriteria
        if (criterias[0].externalId != "") {
          questionCriteria = criterias[0]
        } else {
          throw "No criteria with ID " + questionCriteriaId + " found"
        }

        let questionCollection = {}
        let toFetchQuestionIds = new Array
        toFetchQuestionIds.push(question.externalId)
        if (question.parentId != "") { toFetchQuestionIds.push(question.parentId) }
        if (question.instanceParentId != "") { toFetchQuestionIds.push(question.instanceParentId) }

        let questionsFromDatabase = await database.models.questions.find({
          externalId: { $in: toFetchQuestionIds }
        });

        if (questionsFromDatabase.length > 0) {
          questionsFromDatabase.forEach(question => {
            questionCollection[question.externalId] = question
          })
        }

        if (questionCollection[question.externalId]) {
          throw "The question with the external ID " + question.externalId + " already exists"
        }

        if (question.parentId != "" && !questionCollection[question.parentId]) {
          throw "Parent question with external ID " + question.parentId + " not found"
        }

        if (question.instanceParentId != "" && !questionCollection[question.instanceParentId]) {
          throw "Instance Parent question with external ID " + question.instanceParentId + " not found"
        }

        if (Object.keys(question.visibleIf[0]).length <= 0) {
          question.visibleIf = ""
        } else {
          question.visibleIf[0]._id = questionCollection[question.parentId]._id
        }

        let generatedQuestionDocument = await database.models.questions.create(
          question
        );

        result._id = generatedQuestionDocument._id


        if (question.parentId != "") {
          let queryParentQuestionObject = {
            _id: questionCollection[question.parentId]._id
          }
          let updateParentQuestionObject = {}
          updateParentQuestionObject.$push = {
            ["children"]: generatedQuestionDocument._id
          }
          await database.models.questions.findOneAndUpdate(
            queryParentQuestionObject,
            updateParentQuestionObject
          )
        }

        if (question.instanceParentId != "") {
          let queryInstanceParentQuestionObject = {
            _id: questionCollection[question.instanceParentId]._id
          }
          let updateInstanceParentQuestionObject = {}
          updateInstanceParentQuestionObject.$push = {
            ["instanceQuestions"]: generatedQuestionDocument._id
          }
          await database.models.questions.findOneAndUpdate(
            queryInstanceParentQuestionObject,
            updateInstanceParentQuestionObject
          )
        }

        let criteriaEvidences = questionCriteria.evidences
        let indexOfEvidenceMethodInCriteria = criteriaEvidences.findIndex(evidence => evidence.externalId === questionEvidenceMethod);

        if (indexOfEvidenceMethodInCriteria < 0) {
          criteriaEvidences.push(req.evidenceObjects[questionEvidenceMethod])
          indexOfEvidenceMethodInCriteria = criteriaEvidences.length - 1
        }

        let indexOfSectionInEvidenceMethod = criteriaEvidences[indexOfEvidenceMethodInCriteria].sections.findIndex(section => section.name === questionSection)
        if (indexOfSectionInEvidenceMethod < 0) {
          criteriaEvidences[indexOfEvidenceMethodInCriteria].sections.push({ name: questionSection, questions: new Array })
          indexOfSectionInEvidenceMethod = criteriaEvidences[indexOfEvidenceMethodInCriteria].sections.length - 1
        }

        criteriaEvidences[indexOfEvidenceMethodInCriteria].sections[indexOfSectionInEvidenceMethod].questions.push(generatedQuestionDocument._id)

        let queryCriteriaObject = {
          _id: questionCriteria._id
        }
        let updateCriteriaObject = {}
        updateCriteriaObject.$set = {
          ["evidences"]: criteriaEvidences
        }
        await database.models.criteria.findOneAndUpdate(
          queryCriteriaObject,
          updateCriteriaObject
        )

        let responseMessage = "Question added successfully."

        let response = { message: responseMessage, result: result };

        return resolve(response);
      } catch (error) {
        return reject({ message: error });
      }

    })
  }

  getEvidenceObjectsForDCPCR() {
    return {

      "BL": {
        externalId: "BL",
        tip: "Some tip at evidence level.",
        name: "Book Look",
        description: "Some description about evidence",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      },
      "LW": {
        externalId: "LW",
        tip: "Some tip at evidence level.",
        name: "Learning Walk",
        description: "Some description about evidence",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      },
      "PI": {
        externalId: "PI",
        tip: "Some tip at evidence level.",
        name: "Principal Interview",
        description: "Some description about evidence",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      },
      "CO": {
        externalId: "CO",
        tip: "Some tip at evidence level.",
        name: "Classroom Observation",
        description: "Some description about evidence",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      },
      "TI": {
        externalId: "TI",
        tip: "Some tip at evidence level.",
        name: "Teacher Interview",
        description: "Some description about evidence",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      },
      "SI": {
        externalId: "SI",
        tip: "Some tip at evidence level.",
        name: "Student Interview",
        description: "Some description about evidence",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      },
      "AC3": {
        externalId: "AC3",
        tip: "Some tip at evidence level.",
        name: "Assessment- Class 3",
        description: "Some description about evidence",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: true
      },
      "AC5": {
        externalId: "AC5",
        tip: "Some tip at evidence level.",
        name: "Assessment- Class 5",
        description: "Some description about evidence",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: true
      },
      "AC8": {
        externalId: "AC8",
        tip: "Some tip at evidence level.",
        name: "Assessment- Class 8",
        description: "Some description about evidence",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: true
      },
      "PAI": {
        externalId: "PAI",
        tip: "Some tip at evidence level.",
        name: "Parent Interview",
        description: "Some description about evidence",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "oncall",
        canBeNotApplicable: false
      }
    }
  }

  getEvidenceObjects() {
    return {

      "DA": {
        externalId: "DA",
        tip: "Give the school leader the list of documents to be kept ready, and once they are given - begin the analysis",
        name: "Documentary Analysis",
        description: "Give the school leader the list of documents to be kept ready, and once they are given - begin the analysis",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      },
      "SW": {
        externalId: "SW",
        tip: "Conduct a school walkthrough first and then enter the data",
        name: "School Walkthrough (Observations)",
        description: "Conduct a school walkthrough first and then enter the data",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      },
      "PI": {
        externalId: "PI",
        tip: "Conduct principal interview on the first or second day, before the coordinator interview",
        name: "Principal Interview",
        description: "Conduct principal interview on the first or second day, before the coordinator interview",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      },
      "CO": {
        externalId: "CO",
        tip: "Conduct 3 pop-in observations of 10 minutes each for all teachers",
        name: "Classroom Observation",
        description: "Conduct 3 pop-in observations of 10 minutes each for all teachers",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      },
      "TI": {
        externalId: "TI",
        tip: "Conduct teacher interviews for 25% of teachers across sections or 10 teachers, whichever is greater",
        name: "Teacher Interview",
        description: "Conduct teacher interviews for 25% of teachers across sections or 10 teachers, whichever is greater",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      },
      "AC3": {
        externalId: "AC3",
        tip: "",
        name: "Assessment Class 3",
        description: "",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: true
      },
      "AC5": {
        externalId: "AC5",
        tip: "",
        name: "Assessment Class 5",
        description: "",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: true
      },
      "AC8": {
        externalId: "AC8",
        tip: "",
        name: "Assessment Class 8",
        description: "",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: true
      },
      "PAI": {
        externalId: "PAI",
        tip: "Approach parents when they are dropping children to the school or are waiting to pick children up from the school. Ask the following questions for 7-8 parents",
        name: "Parent Interview",
        description: "Approach parents when they are dropping children to the school or are waiting to pick children up from the school. Ask the following questions for 7-8 parents",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      },
      "COI": {
        externalId: "COI",
        tip: "Conduct coordinator interview on the second or third day, after the principal interview",
        name: "Coordinator Interview",
        description: "Conduct coordinator interview on the second or third day, after the principal interview",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      },
      "SFGD": {
        externalId: "SFGD",
        tip: "1 group (7-8 students from 4th and 5th)",
        name: "Student Focused Group Discussions",
        description: "1 group (7-8 students from 4th and 5th)",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      },
      "TFGD": {
        externalId: "TFGD",
        tip: "3 (primary, middle, high)",
        name: "Teacher Focused Group Discussions",
        description: "3 (primary, middle, high)",
        startTime: "",
        endTime: "",
        isSubmitted: false,
        sections: [],
        modeOfCollection: "onfield",
        canBeNotApplicable: false
      }
    }
  }

  /**
  * @api {post} /assessment/api/v1/criteria/uploadRubricExpressions Upload Rubric Expressions
  * @apiVersion 1.0.0
  * @apiName Upload Rubric Expressions
  * @apiGroup Criteria
  * @apiParam {File} criteria     Mandatory criteria file of type CSV.
  * @apiUse successBody
  * @apiUse errorBody
  */
  async uploadRubricExpressions(req) {

    return new Promise(async (resolve, reject) => {

      try {

        let criteriaData = await csv().fromString(req.files.criteria.data.toString());

        let programQueryList = {}
        let programId = ""
        criteriaData.forEach(criteria => {
          programId = criteria.programId
          programQueryList[criteria.programId] = criteria.programId
        });

        let programsFromDatabase = await database.models.programs.find(
          { externalId: { $in: Object.values(programQueryList) } },
          { name: 1, components: 1, externalId: 1 }
        );

        const programsData = programsFromDatabase.reduce(
          (ac, program) => ({ ...ac, [program.externalId]: program }), {})

        criteriaData = await Promise.all(criteriaData.map(async (criteria) => {

          let criteriaQueryObject = {
            externalId: criteria.externalId
          }

          const existingCriteria = await database.models.criteria.findOne(
            criteriaQueryObject,
            { name: 1, description: 1, criteriaType: 1, rubric: 1 }
          )

          if (!existingCriteria) {
            return
          }

          let expressionVariables = {}
          let expressionVariablesArray = criteria.expressionVariables.split("###")
          expressionVariablesArray.forEach(expressionVariable => {
            let tempExpressionVariableArray = expressionVariable.split("=")
            let expressionVariableArray = new Array
            expressionVariableArray.push(tempExpressionVariableArray.shift())
            expressionVariableArray.push(tempExpressionVariableArray.join('='))
            let defaultVariableArray = expressionVariableArray[0].split("-")
            if (defaultVariableArray.length > 1) {
              if (!expressionVariables.default) expressionVariables.default = {};
              expressionVariables.default[defaultVariableArray[0]] = expressionVariableArray[1]
            } else {
              expressionVariables[expressionVariableArray[0]] = expressionVariableArray[1]
            }
          })
          let rubric = {
            name: existingCriteria.name,
            description: existingCriteria.description,
            type: existingCriteria.criteriaType,
            expressionVariables: expressionVariables,
            levels: {}
          }

          let existingCriteriaRubricLevels

          if (Array.isArray(existingCriteria.rubric.levels)) {
            existingCriteriaRubricLevels = existingCriteria.rubric.levels
          } else {
            existingCriteriaRubricLevels = Object.values(existingCriteria.rubric.levels)
          }

          existingCriteriaRubricLevels.forEach(levelObject => {
            rubric.levels[levelObject.level] = {
              level: levelObject.level,
              label: levelObject.label,
              description: levelObject.description,
              expression: criteria[levelObject.level]
            }
          })

          let updateObject = {}

          let queryOptions = {
            queryOptions: true
          }

          updateObject.$set = {
            rubric: rubric
          }

          criteria = await database.models.criteria.findOneAndUpdate(
            criteriaQueryObject,
            updateObject,
            queryOptions
          );

          return criteria


        }));


        if (criteriaData.findIndex(criteria => criteria === undefined) >= 0) {
          throw "Something went wrong, not all records were inserted/updated."
        }

        let submissionDocumentCriterias = [];

        for (
          let counter = 0;
          counter < programsData[programId].components.length;
          counter++
        ) {

          let solutionDocument = await database.models.solutions.findOne(
            { _id: programsData[programId].components[counter] },
            { themes: 1, name: 1, description: 1, externalId: 1, questionSequenceByEcm: 1 }
          );

          let criteriasId = new Array
          let criteriaObject = {}
          let criteriasIdArray = gen.utils.getCriteriaIdsAndWeightage(solutionDocument.themes);

          criteriasIdArray.forEach(eachCriteriaId => {
            criteriasId.push(eachCriteriaId.criteriaId)
            criteriaObject[eachCriteriaId.criteriaId.toString()] = {
              weightage: eachCriteriaId.weightage
            }
          })

          let criteriaQuestionDocument = await database.models.criteriaQuestions.find({ _id: { $in: criteriasId } })

          criteriaQuestionDocument.forEach(criteria => {
            criteria.weightage = criteriaObject[criteria._id.toString()].weightage
            submissionDocumentCriterias.push(
              _.omit(criteria._doc, [
                "resourceType",
                "language",
                "keywords",
                "concepts",
                "createdFor",
                "evidences"
              ])
            );
          });
        }

        let updatedCriteriasObject = {}

        updatedCriteriasObject.$set = {
          criteria: submissionDocumentCriterias
        }

        let updateSubmissions = await database.models.submissions.updateMany(
          { programId: programsData[programId]._id },
          updatedCriteriasObject
        );

        let responseMessage = "Criteria rubric updated successfully."

        let response = { message: responseMessage };

        return resolve(response);

      } catch (error) {
        return reject({
          status: 500,
          message: error,
          errorObject: error
        });
      }

    })
  }

  /**
  * @api {post} /assessment/api/v1/criteria/upload Upload Criteria CSV
  * @apiVersion 1.0.0
  * @apiName Upload Criteria CSV
  * @apiGroup Criteria
  * @apiParam {File} criteria Mandatory criteria file of type CSV.
  * @apiUse successBody
  * @apiUse errorBody
  */

  async upload(req) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!req.files || !req.files.criteria) {
          throw "Csv file for criterias should be selected"
        }

        let criteriaData = await csv().fromString(req.files.criteria.data.toString())

        const fileName = `Criteria-Upload`;
        let fileStream = new FileStream(fileName);
        let input = fileStream.initStream();

        (async function () {
          await fileStream.getProcessorPromise();
          return resolve({
            isResponseAStream: true,
            fileNameWithPath: fileStream.fileNameWithPath()
          });
        }());


        await Promise.all(criteriaData.map(async criteria => {

          let csvData = {}
          let rubric = {}
          let parsedCriteria = gen.utils.valueParser(criteria)

          rubric.name = parsedCriteria.criteriaName
          rubric.description = parsedCriteria.criteriaName
          rubric.type = parsedCriteria.type
          rubric.expressionVariables = {}
          rubric.levels = {};
          let countLabel = 1;

          Object.keys(parsedCriteria).forEach(eachCriteriaKey => {

            let regExpForLevels = /^L+[0-9]/
            if (regExpForLevels.test(eachCriteriaKey)) {

              let label = "Level " + countLabel++;

              rubric.levels[eachCriteriaKey] = {
                level: eachCriteriaKey,
                label: label,
                description: parsedCriteria[eachCriteriaKey],
                expression: ""
              }
            }
          })

          let criteriaStructure = {
            owner: req.userDetails.id,
            name: parsedCriteria.criteriaName,
            description: parsedCriteria.criteriaName,
            resourceType: [
              "Program",
              "Framework",
              "Criteria"
            ],
            language: [
              "English"
            ],
            keywords: [
              "Keyword 1",
              "Keyword 2"
            ],
            concepts: [
              {
                identifier: "LPD20100",
                name: "Teacher_Performance",
                objectType: "Concept",
                relation: "associatedTo",
                description: null,
                index: null,
                status: null,
                depth: null,
                mimeType: null,
                visibility: null,
                compatibilityLevel: null
              },
              {
                identifier: "LPD20400",
                name: "Instructional_Programme",
                objectType: "Concept",
                relation: "associatedTo",
                description: null,
                index: null,
                status: null,
                depth: null,
                mimeType: null,
                visibility: null,
                compatibilityLevel: null
              },
              {
                identifier: "LPD20200",
                name: "Teacher_Empowerment",
                objectType: "Concept",
                relation: "associatedTo",
                description: null,
                index: null,
                status: null,
                depth: null,
                mimeType: null,
                visibility: null,
                compatibilityLevel: null
              }
            ],
            createdFor: [
              "0125747659358699520",
              "0125748495625912324"
            ],
            evidences: [],
            deleted: false,
            externalId: criteria.criteriaID,
            owner: req.userDetails.id,
            timesUsed: 12,
            weightage: 20,
            remarks: "",
            name: parsedCriteria.criteriaName,
            description: parsedCriteria.criteriaName,
            criteriaType: "auto",
            score: "",
            flag: "",
            rubric: rubric
          };

          let criteriaDocuments = await database.models.criteria.create(
            criteriaStructure
          );

          csvData["Criteria Name"] = parsedCriteria.criteriaName
          csvData["Criteria External Id"] = parsedCriteria.criteriaID

          if (criteriaDocuments._id) {
            csvData["Criteria Internal Id"] = criteriaDocuments._id
          } else {
            csvData["Criteria Internal Id"] = "Not inserted"
          }

          input.push(csvData)
        }))

        input.push(null)

      }
      catch (error) {
        return reject({
          status: 500,
          message: error,
          errorObject: error
        });
      }
    })
  }

};



