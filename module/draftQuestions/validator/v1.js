module.exports = (req) => {

    let draftQuestionValidator = {
        // create: function () {
        //     req.checkBody('draftFrameworkId').isMongoId().withMessage("invalid draft framework id")
        //     req.checkBody('draftEvidenceMethodId').isMongoId().withMessage("invalid draft evidence method id")
        //     req.checkBody("draftSectionId").isMongoId().withMessage("invalid draft section id")
        //     req.checkBody("draftCriteriaId").isMongoId().withMessage("invalid draft criteria id")
        //   },
        // list: function () {
        //     req.checkParams('_id').isMongoId().withMessage("required framework id")
        // },
        // details: function () {
        //     req.checkParams('_id').isMongoId().withMessage("required question id")
        // },
        // update: function () {
        //     req.checkParams('_id').isMongoId().withMessage("required question id")
        //  },
        // delete: function () {
        //     req.checkParams('_id').isMongoId().withMessage("required question id")
        // }
    }

    if (draftQuestionValidator[req.params.method]) draftQuestionValidator[req.params.method]();

};