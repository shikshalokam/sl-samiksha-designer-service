module.exports = (req) => {

    let criteriaValidator = {
        update: function () {
            req.checkParams('_id').exists().withMessage("required criteria id")
                .isMongoId().withMessage("invalid criteria id");
            req.checkBody('externalId').exists().withMessage("invalid externalId")
            req.checkBody('owner').exists().withMessage("invalid owner")
            req.checkBody('timesUsed').exists().withMessage("invalid timesUsed")
            req.checkBody('weightage').exists().withMessage("invalid weightage")
            req.checkBody('name').exists().withMessage("invalid name")
            req.checkBody('score').exists().withMessage("invalid score")
            req.checkBody('remarks').exists().withMessage("invalid remarks")
            req.checkBody('showRemarks').exists().withMessage("invalid showRemarks")
            req.checkBody('description').exists().withMessage("invalid description")
            req.checkBody('resourceType').exists().withMessage("invalid resourceType")
                .isArray().withMessage("resource type should be an array")
            req.checkBody('language').exists().withMessage("invalid language")
                .isArray().withMessage("language should be an array")
            req.checkBody('keywords').exists().withMessage("invalid keywords")
                .isArray().withMessage("keywords should be an array")
            req.checkBody('concepts').exists().withMessage("invalid concepts")
                .isArray().withMessage("concepts should be an array")
            req.checkBody('createdFor').exists().withMessage("invalid createdFor")
                .isArray().withMessage("created for should be an array")
            req.checkBody('rubric').exists().withMessage("invalid rubric")
            req.checkBody('evidences').exists().withMessage("invalid evidences")
                .isArray().withMessage("evidences should be an array")
            req.checkBody('flag').exists().withMessage("invalid flag")
            req.checkBody('criteriaType').exists().withMessage("invalid criteriaType")
            req.checkBody('frameworkCriteriaId').exists().withMessage("invalid framework criteria id")
                .isMongoId().withMessage("invalid framework criteria id");
        },
        delete: function () {
            req.checkParams('_id').exists().withMessage("required criteria id")
                .isMongoId().withMessage("invalid criteria id");
        },
        details: function () {
            req.checkParams('_id').exists().withMessage("required criteria id")
                .isMongoId().withMessage("invalid criteria id");
        },
        insert: function () {
            req.checkBody('externalId').exists().withMessage("invalid externalId")
            req.checkBody('owner').exists().withMessage("invalid owner")
            req.checkBody('timesUsed').exists().withMessage("invalid timesUsed")
            req.checkBody('weightage').exists().withMessage("invalid weightage")
            req.checkBody('name').exists().withMessage("invalid name")
            req.checkBody('score').exists().withMessage("invalid score")
            req.checkBody('remarks').exists().withMessage("invalid remarks")
            req.checkBody('showRemarks').exists().withMessage("invalid showRemarks")
            req.checkBody('description').exists().withMessage("invalid description")
            req.checkBody('resourceType').exists().withMessage("invalid resourceType")
                .isArray().withMessage("resource type should be an array")
            req.checkBody('language').exists().withMessage("invalid language")
                .isArray().withMessage("language should be an array")
            req.checkBody('keywords').exists().withMessage("invalid keywords")
                .isArray().withMessage("keywords should be an array")
            req.checkBody('concepts').exists().withMessage("invalid concepts")
                .isArray().withMessage("concepts should be an array")
            req.checkBody('createdFor').exists().withMessage("invalid createdFor")
                .isArray().withMessage("created for should be an array")
            req.checkBody('rubric').exists().withMessage("invalid rubric")
            req.checkBody('evidences').exists().withMessage("invalid evidences")
                .isArray().withMessage("evidences should be an array")
            req.checkBody('flag').exists().withMessage("invalid flag")
            req.checkBody('criteriaType').exists().withMessage("invalid criteriaType")
            req.checkBody('frameworkCriteriaId').exists().withMessage("invalid framework criteria id")
                .isMongoId().withMessage("invalid framework criteria id");
        },
    }

    if (criteriaValidator[req.params.method]) criteriaValidator[req.params.method]();

};