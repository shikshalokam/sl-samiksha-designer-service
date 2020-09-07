module.exports = (req) => {

    let draftSectionsValidator = {
        create: function () {
            req.checkBody('draftFrameworkId').isMongoId().withMessage("invalid framework id")
        },
        list: function () {
            req.checkParams('_id').isMongoId().withMessage("required draft framework id")
        },
        details: function () {
            req.checkParams('_id').isMongoId().withMessage("required draft section id")
        },
        update: function () {
            req.checkParams('_id').isMongoId().withMessage("required draft section id")
        },
        delete: function () {
            req.checkParams('_id').isMongoId().withMessage("required draftSections id")
                .isMongoId().withMessage("invalid draftSections id");
        }
    }

    if (draftSectionsValidator[req.params.method]) draftSectionsValidator[req.params.method]();

};