module.exports = (req) => {

    let frameworkValidator = {
        uploadThemes: function () {
            req.checkParams('_id').exists().withMessage("required framework id");
        },
        update: function () {
            req.checkQuery('frameworkExternalId').exists().withMessage("required framework externalId");
        },
        create: function () {
            req.checkBody('externalId').exists().withMessage("invalid externalId")
            req.checkBody('name').exists().withMessage("invalid name")
            req.checkBody('description').exists().withMessage("invalid description")
            req.checkBody('resourceType').isArray().withMessage("resourceType should be an array")
            req.checkBody('language').exists().withMessage("invalid language")
            req.checkBody('keywords').isArray().withMessage("keywords should be an array")
            req.checkBody('concepts').isArray().withMessage("concepts should be an array")
            req.checkBody('createdFor').isArray().withMessage("createdFor should be an array")
            req.checkBody('questionSequenceByEcm').exists().withMessage("invalid questionSequenceByEcm")
            req.checkBody('levelToScoreMapping').exists().withMessage("invalid levelToScoreMapping")
            req.checkBody('scoringSystem').exists().withMessage("invalid scoringSystem")
            req.checkBody('noOfRatingLevels').exists().withMessage("invalid noOfRatingLevels")
            req.checkBody('isRubricDriven').exists().withMessage("invalid isRubricDriven")
        }
    }

    if (frameworkValidator[req.params.method]) frameworkValidator[req.params.method]();

};