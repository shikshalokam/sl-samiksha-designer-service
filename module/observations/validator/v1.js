module.exports = (req) => {

    let observationValidator = {
        createQuestion: function () {
            req.checkBody('draftFrameworkId').isMongoId().withMessage("Invalid draft framework id")
            req.checkBody('draftEvidenceMethodId').isMongoId().withMessage("Invalid draft evidence method id")
            req.checkBody("draftSectionId").isMongoId().withMessage("Invalid draft section id")
            req.checkBody("draftCriteriaId").isMongoId().withMessage("Invalid draft criteria id")
          },
        questionlist: function () {
            req.checkParams('_id').isMongoId().withMessage("Invalid framework id")
        },
        QuestionDetails: function () {
            req.checkParams('_id').isMongoId().withMessage("Invalid question id")
        },
        updateQuestion: function () {
            req.checkParams('_id').isMongoId().withMessage("Invalid question id")
         },
         questionDelete: function () {
            req.checkParams('_id').isMongoId().withMessage("Invalid question id")
        },
        createCriteria: function () {
            req.checkBody('draftFrameworkId').isMongoId().withMessage("Invalid framework id")
        },
        criteriaList: function () {
            req.checkParams('_id').isMongoId().withMessage("Invalid framework id")
        },
        criteriaDetails: function () {
            req.checkParams('_id').isMongoId().withMessage("Invalid criteria id")
                
        },
        updateCriteria: function () {
            req.checkParams('_id').isMongoId().withMessage("Invalid criteria id")
        },
        details:function () {
            req.checkParams('_id').isMongoId().withMessage("Invalid framework id")
        },
        update:function () {
            req.checkParams('_id').isMongoId().withMessage("Invalid framework id")
        },
        getFrameworkForm:function () {
            req.checkParams('_id').isMongoId().withMessage("Invalid framework id")
        }

    }

    if (observationValidator[req.params.method]) observationValidator[req.params.method]();

};