module.exports = (req) => {

    let draftECMValidator = {
        create: function () {
            req.checkBody('draftFrameworkId').isMongoId().withMessage("Draft frameworkId is required")
        },
        list: function () {
            req.checkParams('_id').isMongoId().withMessage("required draft framework id")
        },
        details: function () {
            req.checkParams('_id').isMongoId().withMessage("required draftECM id")
        },
        update: function () {
            req.checkParams('_id').isMongoId().withMessage("required draft ECM id")
        },
        delete: function () {
            req.checkParams('_id').isMongoId().withMessage("required draftECM id")
                .isMongoId().withMessage("invalid draftECM id");
        }
    }

    if (draftECMValidator[req.params.method]) draftECMValidator[req.params.method]();

};