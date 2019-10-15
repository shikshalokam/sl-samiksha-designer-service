module.exports = (req) => {

    let criteriaValidator = {
        update: function () {
            req.checkParams('_id').exists().withMessage("required criteria id")
            .isMongoId().withMessage("invalid criteria id");
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
            // req.checkBody('data').exists().withMessage("required data")
            // req.check('timesUsed')
            // .exists().withMessage("invalid timesUsed")
            // .isNumeric().withMessage("timesUsed field should be numaric")
            // req.check('weightage').exists().withMessage("invalid weightage")
            // .isNumeric().withMessage("weightage field should be numaric")
            // req.check('remarks').exists().withMessage("required remarks")
            // req.check('name').isEmpty().withMessage("name cannot be empty")
            // req.check('description').exists().withMessage("required description")
            // req.check('criteriaType').exists().withMessage("required criteria type")
            // req.check('score').exists().withMessage("required score")
            // req.check('resourceType').exists().withMessage("required resourceType")
            // .isLength({min:1}).withMessage("resource type cannot be empty")
            // req.check('language').exists().withMessage("required language")
            // .isLength({min:1}).withMessage("language cannot be empty")
            // req.check('keywords').exists().withMessage("required keywords")
            // .isLength({min:1}).withMessage("keywords cannot be empty")
            // req.check('parents.*.name').exists().withMessage("invalid name")
            // req.check('parents.*.gender').exists().withMessage("invalid gender")
            // req.check('parents.*.type').exists().withMessage("invalid type")
            // req.check('parents.*.typeLabel').optional().withMessage("invalid type label")
            // req.check('parents.*.phone1').exists().withMessage("invalid phone1")
            // req.check('parents.*.phone2').exists().withMessage("invalid phone2")
            // req.check('parents.*.address').exists().withMessage("invalid address")
            // req.check('parents.*.schoolId').exists().withMessage("invalid school id")
            // req.check('parents.*.schoolName').exists().withMessage("invalid school name")
            // req.check('parents.*.programId').exists().withMessage("invalid program id name")
        },
    }

    if (criteriaValidator[req.params.method]) criteriaValidator[req.params.method]();

};