module.exports = (req) => {

    let draftQuestionValidator = {
        list: function () {
            req.checkParams('_id').exists().withMessage("required framework id")
                .isMongoId().withMessage("invalid framework id");
        },
        details: function () {
            req.checkParams('_id').exists().withMessage("required question id")
                .isMongoId().withMessage("invalid question id");
        },
        delete: function () {
            req.checkParams('_id').exists().withMessage("required question id")
                .isMongoId().withMessage("invalid question id");
        },
        update: function () {
            req.checkParams('_id').exists().withMessage("required question id")
                .isMongoId().withMessage("invalid question id");
            req.checkBody('externalId').exists().withMessage("invalid externalId")
            req.checkBody('criteriaId').exists().withMessage("invalid criteriaId")
                .isMongoId().withMessage("invalid criteria id");
            req.checkBody('frameworkId').exists().withMessage("invalid framework id")
                .isMongoId().withMessage("invalid framework id");
            req.checkBody('evidenceMethod').exists().withMessage("invalid evidence method")
            req.checkBody('question').exists().withMessage("invalid question")
                .isArray().withMessage("question should be an array")
            req.checkBody('tip').exists().withMessage("invalid tip")
            req.checkBody('hint').exists().withMessage("invalid hint")
            req.checkBody('responseType').exists().withMessage("invalid response type")
            req.checkBody('value').exists().withMessage("invalid value")
            req.checkBody('isCompleted').exists().withMessage("invalid is completed")
                .isBoolean().withMessage("isCompleted should be true or false")
            req.checkBody('showRemarks').exists().withMessage("invalid show remarks")
                .isBoolean().withMessage("show remarks should be true or false")
            req.checkBody('remarks').exists().withMessage("invalid remarks")
            req.checkBody('visibleIf').exists().withMessage("invalid visible if")
            req.checkBody('createdBy').exists().withMessage("invalid createdBy")
            req.checkBody('updatedBy').exists().withMessage("invalid updatedBy")
            req.checkBody('options').exists().withMessage("invalid options")
                .isArray().withMessage("options should be an array")
            req.checkBody('children').exists().withMessage("invalid children")
                .isArray().withMessage("children should be an array")
            req.checkBody('questionGroup').exists().withMessage("invalid question group")
                .isArray().withMessage("question group should be an array")
            req.checkBody('questionType').exists().withMessage("invalid question type")
            req.checkBody('modeOfCollection').exists().withMessage("invalid mode of collection")
            req.checkBody('usedForScoring').exists().withMessage("invalid used for scoring")
            req.checkBody('file').exists().withMessage("invalid file")
            req.checkBody('fileName').exists().withMessage("invalid fileName")
                .isArray().withMessage("fine name should be an array")
            req.checkBody('validation').exists().withMessage("invalid validation")
            req.checkBody('accessibility').exists().withMessage("invalid accessibility")
            req.checkBody('instanceIdentifier').exists().withMessage("invalid instance identifier")
            req.checkBody('noOfInstances').exists().withMessage("invalid no of instances")
            req.checkBody('notApplicable').exists().withMessage("invalid not applicable")
            req.checkBody('canBeNotApplicable').exists().withMessage("invalid can be not applicable")
            req.checkBody('instanceQuestionsString').exists().withMessage("invalid instance questions string")
            req.checkBody('instanceQuestions').exists().withMessage("invalid instance questions")
                .isArray().withMessage("instace questions should be an array")
            req.checkBody('isAGeneralQuestion').exists().withMessage("invalid is a general question")
                .isBoolean().withMessage("is a general question should be true or false")
            req.checkBody('dateFormat').exists().withMessage("invalid date format")
            req.checkBody('autoCapture').exists().withMessage("invalid auto capture")
            req.checkBody('rubricLevel').exists().withMessage("invalid rubric level")
            req.checkBody('sectionHeader').exists().withMessage("invalid section header")
            req.checkBody('allowAudioRecording').exists().withMessage("invalid allow audio recording")
                .isBoolean().withMessage("allow audio recording should be true or false")
            req.checkBody('page').exists().withMessage("invalid page")
            req.checkBody('questionNumber').exists().withMessage("invalid question number")
        },
        create: function () {
            req.checkBody('externalId').exists().withMessage("invalid externalId")
            req.checkBody('criteriaId').exists().withMessage("invalid criteriaId")
                .isMongoId().withMessage("invalid criteria id");
            req.checkBody('frameworkId').exists().withMessage("invalid framework id")
                .isMongoId().withMessage("invalid framework id");
            req.checkBody('evidenceMethod').exists().withMessage("invalid evidence method")
            req.checkBody('question').exists().withMessage("invalid question")
                .isArray().withMessage("question should be an array")
            req.checkBody('tip').exists().withMessage("invalid tip")
            req.checkBody('hint').exists().withMessage("invalid hint")
            req.checkBody('responseType').exists().withMessage("invalid response type")
            req.checkBody('value').exists().withMessage("invalid value")
            req.checkBody('isCompleted').exists().withMessage("invalid is completed")
                .isBoolean().withMessage("isCompleted should be true or false")
            req.checkBody('showRemarks').exists().withMessage("invalid show remarks")
                .isBoolean().withMessage("show remarks should be true or false")
            req.checkBody('remarks').exists().withMessage("invalid remarks")
            req.checkBody('visibleIf').exists().withMessage("invalid visible if")
            req.checkBody('createdBy').exists().withMessage("invalid createdBy")
            req.checkBody('updatedBy').exists().withMessage("invalid updatedBy")
            req.checkBody('options').exists().withMessage("invalid options")
                .isArray().withMessage("options should be an array")
            req.checkBody('children').exists().withMessage("invalid children")
                .isArray().withMessage("children should be an array")
            req.checkBody('questionGroup').exists().withMessage("invalid question group")
                .isArray().withMessage("question group should be an array")
            req.checkBody('questionType').exists().withMessage("invalid question type")
            req.checkBody('modeOfCollection').exists().withMessage("invalid mode of collection")
            req.checkBody('usedForScoring').exists().withMessage("invalid used for scoring")
            req.checkBody('file').exists().withMessage("invalid file")
            req.checkBody('fileName').exists().withMessage("invalid fileName")
                .isArray().withMessage("fine name should be an array")
            req.checkBody('validation').exists().withMessage("invalid validation")
            req.checkBody('accessibility').exists().withMessage("invalid accessibility")
            req.checkBody('instanceIdentifier').exists().withMessage("invalid instance identifier")
            req.checkBody('noOfInstances').exists().withMessage("invalid no of instances")
            req.checkBody('notApplicable').exists().withMessage("invalid not applicable")
            req.checkBody('canBeNotApplicable').exists().withMessage("invalid can be not applicable")
            req.checkBody('instanceQuestionsString').exists().withMessage("invalid instance questions string")
            req.checkBody('instanceQuestions').exists().withMessage("invalid instance questions")
                .isArray().withMessage("instace questions should be an array")
            req.checkBody('isAGeneralQuestion').exists().withMessage("invalid is a general question")
                .isBoolean().withMessage("is a general question should be true or false")
            req.checkBody('dateFormat').exists().withMessage("invalid date format")
            req.checkBody('autoCapture').exists().withMessage("invalid auto capture")
            req.checkBody('rubricLevel').exists().withMessage("invalid rubric level")
            req.checkBody('sectionHeader').exists().withMessage("invalid section header")
            req.checkBody('allowAudioRecording').exists().withMessage("invalid allow audio recording")
                .isBoolean().withMessage("allow audio recording should be true or false")
            req.checkBody('page').exists().withMessage("invalid page")
            req.checkBody('questionNumber').exists().withMessage("invalid question number")
        }
    }

    if (draftQuestionValidator[req.params.method]) draftQuestionValidator[req.params.method]();

};