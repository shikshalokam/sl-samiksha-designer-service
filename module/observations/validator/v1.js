module.exports = (req) => {

    let observationValidator = {
        createQuestion: function () {
            req.checkBody('draftFrameworkId').isMongoId().withMessage("invalid draft framework id")
            req.checkBody('draftEvidenceMethodId').isMongoId().withMessage("invalid draft evidence method id")
            req.checkBody("draftSectionId").isMongoId().withMessage("invalid draft section id")
            req.checkBody("draftCriteriaId").isMongoId().withMessage("invalid draft criteria id")
          },
        questionlist: function () {
            req.checkParams('_id').isMongoId().withMessage("required framework id")
        },
        QuestionDetails: function () {
            req.checkParams('_id').isMongoId().withMessage("required question id")
        },
        updateQuestion: function () {
            req.checkParams('_id').isMongoId().withMessage("required question id")
         },
         questionDelete: function () {
            req.checkParams('_id').isMongoId().withMessage("required question id")
        }
    }

    if (observationValidator[req.params.method]) observationValidator[req.params.method]();

};