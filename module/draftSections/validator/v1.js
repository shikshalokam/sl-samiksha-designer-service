module.exports = (req) => {

    let draftSectionsValidator = {
        update: function () {
            req.checkParams('_id').exists().withMessage("required draft ECM id")
            req.checkBody('code').exists().withMessage("invalid code")
            req.checkBody('name').exists().withMessage("invalid name")
        },
        create: function () {

            req.checkBody('frameworkId').exists().withMessage("invalid framework id")
            // req.checkBody('code').exists().withMessage("invalid code")
            // req.checkBody('name').exists().withMessage("invalid name")
        },
        delete: function () {
            req.checkParams('_id').exists().withMessage("required draftSections id")
            .isMongoId().withMessage("invalid draftSections id");
        }
    }

    if (draftSectionsValidator[req.params.method]) draftSectionsValidator[req.params.method]();

};