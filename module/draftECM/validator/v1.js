module.exports = (req) => {

    let draftECMValidator = {
        update: function () {
            req.checkParams('_id').exists().withMessage("required draft ECM id")
            // req.checkBody('frameworkId').exists().withMessage("invalid frameworkId")
            // req.checkBody('externalId').exists().withMessage("invalid externalId")
            // req.checkBody('name').exists().withMessage("invalid name")
            // req.checkBody('description').exists().withMessage("invalid description")
            // req.checkBody('tip').exists().withMessage("invalid tip")
            // req.checkBody('isSubmitted').exists().withMessage("invalid is submitted")
            // req.checkBody('modeOfCollection').exists().withMessage("invalid mode of collection")
            // req.checkBody('canBeNotApplicable').exists().withMessage("invalid can be not applicable")
        },
        create: function () {
            req.checkBody('frameworkId').exists().withMessage("invalid frameworkId")
            // req.checkBody('externalId').exists().withMessage("invalid externalId")
            // req.checkBody('name').exists().withMessage("invalid name")
            // req.checkBody('description').exists().withMessage("invalid description")
            // req.checkBody('tip').exists().withMessage("invalid tip")
            // req.checkBody('isSubmitted').exists().withMessage("invalid is submitted")
            // req.checkBody('modeOfCollection').exists().withMessage("invalid mode of collection")
            // req.checkBody('canBeNotApplicable').exists().withMessage("invalid can be not applicable")
        },
        details: function () {
            req.checkParams('_id').exists().withMessage("required draftECM id")
        },
        delete: function () {
            req.checkParams('_id').exists().withMessage("required draftECM id")
                .isMongoId().withMessage("invalid draftECM id");
        }
    }

    if (draftECMValidator[req.params.method]) draftECMValidator[req.params.method]();

};