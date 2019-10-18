module.exports = (req) => {

    let sectionsValidator = {
        update: function () {
            req.checkParams('_id').exists().withMessage("required draft ECM id")
            req.checkBody('code').exists().withMessage("invalid code")
            req.checkBody('name').exists().withMessage("invalid name")
        },
        create: function () {
            req.checkBody('code').exists().withMessage("invalid code")
            req.checkBody('name').exists().withMessage("invalid name")
        }
    }

    if (sectionsValidator[req.params.method]) sectionsValidator[req.params.method]();

};