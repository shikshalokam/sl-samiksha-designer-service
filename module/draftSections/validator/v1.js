module.exports = (req) => {

    let draftSectionsValidator = {
        create: function () {
            req.checkBody('draftFrameworkId').exists().withMessage("invalid framework id")
            // req.checkBody('code').exists().withMessage("invalid code")
            // req.checkBody('name').exists().withMessage("invalid name")
        },
        list: function () {
            req.checkParams('_id').exists().withMessage("required draft framework id")
        },
        details: function () {
            req.checkParams('_id').exists().withMessage("required draft section id")
        },
        update: function () {
            req.checkParams('_id').exists().withMessage("required draft section id")
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