module.exports = (req) => {

    let questionValidator = {
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
    }

    if (questionValidator[req.params.method]) questionValidator[req.params.method]();

};