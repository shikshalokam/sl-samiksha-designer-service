module.exports = (req) => {

    let draftFrameworkValidator = {
        uploadThemes: function () {
            req.checkParams('_id').exists().withMessage("required framework id");
        },
        update: function () {
            req.checkParams('_id').exists().withMessage("required framework internal id");
            // req.checkBody('externalId').exists().withMessage("invalid externalId")
            // req.checkBody('name').exists().withMessage("invalid name")
            // req.checkBody('description').exists().withMessage("invalid description")
            // req.checkBody('resourceType').isArray().withMessage("resourceType should be an array")
            // req.checkBody('language').exists().withMessage("invalid language")
            // req.checkBody('keywords').isArray().withMessage("keywords should be an array")
            // req.checkBody('concepts').isArray().withMessage("concepts should be an array")
            // req.checkBody('createdFor').isArray().withMessage("createdFor should be an array")
            // req.checkBody('questionSequenceByEcm').exists().withMessage("invalid question sequence by Ecm")
            // req.checkBody('levelToScoreMapping').exists().withMessage("invalid level to score mapping")
            // req.checkBody('scoringSystem').exists().withMessage("invalid scoring system")
            // req.checkBody('noOfRatingLevels').exists().withMessage("invalid no of rating levels")
            // req.checkBody('isRubricDriven').exists().withMessage("invalid is rubric driven")
        },
        // create: function () {
        //     req.checkBody('externalId').exists().withMessage("invalid externalId")
        //     req.checkBody('name').exists().withMessage("invalid name")
        //     req.checkBody('description').exists().withMessage("invalid description")
        //     req.checkBody('resourceType').isArray().withMessage("resourceType should be an array")
        //     req.checkBody('language').exists().withMessage("invalid language")
        //     req.checkBody('keywords').isArray().withMessage("keywords should be an array")
        //     req.checkBody('concepts').isArray().withMessage("concepts should be an array")
        //     req.checkBody('createdFor').isArray().withMessage("createdFor should be an array")
        //     req.checkBody('questionSequenceByEcm').exists().withMessage("invalid question sequence by Ecm")
        //     req.checkBody('levelToScoreMapping').exists().withMessage("invalid level to score mapping")
        //     req.checkBody('scoringSystem').exists().withMessage("invalid scoring system")
        //     req.checkBody('noOfRatingLevels').exists().withMessage("invalid no of rating levels")
        //     req.checkBody('isRubricDriven').exists().withMessage("invalid is rubric driven")
        // },
        delete: function () {
            req.checkParams('_id').exists().withMessage("required frameworks id")
                .isMongoId().withMessage("invalid frameworks id");
        },
    }

    if (draftFrameworkValidator[req.params.method]) draftFrameworkValidator[req.params.method]();

};