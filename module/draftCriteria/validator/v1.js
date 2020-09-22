module.exports = (req) => {

    let draftCriteriaValidator = {
        create: function () {
            req.checkBody('draftFrameworkId').isMongoId().withMessage("Draft framework id is required")
        },
        list: function () {
            req.checkParams('_id').isMongoId().withMessage("required framework id")
        },
        details: function () {
            req.checkParams('_id').isMongoId().withMessage("required criteria id")
                .isMongoId().withMessage("invalid criteria id");
        },
        update: function () {
            req.checkParams('_id').isMongoId().withMessage("required criteria id")
        },
        delete: function () {
            req.checkParams('_id').isMongoId().withMessage("required criteria id")
        }
    }

    if (draftCriteriaValidator[req.params.method]) draftCriteriaValidator[req.params.method]();

};