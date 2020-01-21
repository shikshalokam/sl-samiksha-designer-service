module.exports = (req) => {

    let draftFrameworkValidator = {}

    if (draftFrameworkValidator[req.params.method]) draftFrameworkValidator[req.params.method]();

};