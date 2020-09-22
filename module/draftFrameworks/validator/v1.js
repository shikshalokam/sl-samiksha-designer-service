module.exports = (req) => {

    let draftFrameworkValidator = {
        uploadThemes: function () {
            req.checkParams('_id').isMongoId().withMessage("required framework id");
        },
        update: function () {
            req.checkParams('_id').isMongoId().withMessage("required framework internal id");
        },
        delete: function () {
            req.checkParams('_id').isMongoId().withMessage("required frameworks id")
                .isMongoId().withMessage("invalid frameworks id");
        },
    }

    if (draftFrameworkValidator[req.params.method]) draftFrameworkValidator[req.params.method]();

};