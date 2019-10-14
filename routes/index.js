let authenticator = require(ROOT_PATH + "/generics/middleware/authenticator");
let pagination = require(ROOT_PATH + "/generics/middleware/pagination");
let dataRangeFilter = require(ROOT_PATH + "/generics/middleware/dateRangeFilter");
let userPrograms = require(ROOT_PATH + "/generics/middleware/userPrograms");
let slackClient = require(ROOT_PATH + "/generics/helpers/slackCommunications");
const fs = require("fs");
const inputValidator = require(ROOT_PATH + "/generics/middleware/validator");

module.exports = function (app) {

  const applicationBaseUrl = process.env.APPLICATION_BASE_URL || "/assessment/"

  app.use(applicationBaseUrl, authenticator);
  app.use(applicationBaseUrl, pagination);
  app.use(applicationBaseUrl, dataRangeFilter);
  app.use(applicationBaseUrl, userPrograms);

  var router = async function (req, res, next) {

    //req.params.controller = (req.params.controller).toLowerCase();
    req.params.controller += "Controller";
    if (!req.params.version) next();
    else if (!controllers[req.params.version]) next();
    else if (!controllers[req.params.version][req.params.controller]) next();
    else if (!controllers[req.params.version][req.params.controller][req.params.method]) next();
    else if (req.params.method.startsWith("_")) next();
    else {

      try {

        let validationError = req.validationErrors();

        if (validationError.length)
          throw { status: 400, message: validationError }

        var result = await controllers[req.params.version][req.params.controller][req.params.method](req);

        if (result.isResponseAStream == true) {
          // Check if file specified by the filePath exists 
          fs.exists(result.fileNameWithPath, function (exists) {

            if (exists) {

              res.setHeader('Content-disposition', 'attachment; filename=' + result.fileNameWithPath.split('/').pop());
              res.set('Content-Type', 'application/octet-stream');
              fs.createReadStream(result.fileNameWithPath).pipe(res);

            } else {

              throw {
                status: 500,
                message: "Oops! Something went wrong!"
              };

            }

          });

        } else {
          res.status(result.status ? result.status : 200).json({
            message: result.message,
            status: result.status ? result.status : 200,
            result: result.data,
            result: result.result,
            additionalDetails: result.additionalDetails,
            pagination: result.pagination,
            totalCount: result.totalCount,
            total: result.total,
            count: result.count,
            failed: result.failed
          });
        }
        if (ENABLE_BUNYAN_LOGGING === "ON") {
          loggerObj.info({ resp: result });
        }
        if (ENABLE_CONSOLE_LOGGING === "ON") {
          console.log('-------------------Response log starts here-------------------');
          console.log(result);
          console.log('-------------------Response log ends here-------------------');
        }
      }
      catch (error) {
        res.status(error.status ? error.status : 400).json({
          status: error.status ? error.status : 400,
          message: error.message
        });

        let customFields = {
          appDetails: '',
          userDetails: "NON_LOGGED_IN_USER"
        }

        if (req.userDetails) {
          customFields = {
            appDetails: req.headers["user-agent"],
            userDetails: req.userDetails.firstName + " - " + req.userDetails.lastName + " - " + req.userDetails.email
          }
        }

        const toLogObject = {
          method: req.method,
          url: req.url, headers: req.headers,
          body: req.body,
          errorMsg: error.errorObject ? error.errorObject.message : null,
          errorStack: error.errorObject ? error.errorObject.stack : null,
          customFields: customFields
        }
        slackClient.sendExceptionLogMessage(toLogObject)
        loggerExceptionObj.info(toLogObject);
        loggerObj.info({ resp: error });
        console.log('-------------------Response log starts here-------------------');
        console.log(error);
        console.log('-------------------Response log ends here-------------------');
      };
    }
  };

  app.all(applicationBaseUrl + "api/:version/:controller/:method", inputValidator, router);

  app.all(applicationBaseUrl + "api/:version/:controller/:method/:_id", inputValidator, router);

  app.use((req, res, next) => {
    res.status(404).send("Not found!");
  });
};

