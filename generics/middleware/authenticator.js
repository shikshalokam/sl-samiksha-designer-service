const jwtDecode = require('jwt-decode');
let slackClient = require("../helpers/slackCommunications");
var ApiInterceptor = require("./lib/apiInterceptor");
var messageUtil = require("./lib/messageUtil");
var responseCode = require("../httpStatusCodes");

var shikshalokam = require("../helpers/shikshalokam");

var reqMsg = messageUtil.REQUEST;
var keyCloakConfig = {
  authServerUrl: process.env.sunbird_keycloak_auth_server_url,
  realm: process.env.sunbird_keycloak_realm,
  clientId: process.env.sunbird_keycloak_client_id,
  public: process.env.sunbird_keycloak_public
};

var cacheConfig = {
  store: process.env.sunbird_cache_store,
  ttl: process.env.sunbird_cache_ttl
};

var respUtil = function (resp) {
  return {
    status: resp.errCode,
    message: resp.errMsg,
    currentDate: new Date().toISOString()
  };
};

var tokenAuthenticationFailureMessageToSlack = function (req, token, msg) {
  let jwtInfomration = jwtDecode(token)
  jwtInfomration["x-authenticated-user-token"] = token
  const tokenByPassAllowedLog = { method: req.method, url: req.url, headers: req.headers, body: req.body, errorMsg: msg, customFields: jwtInfomration }
  slackClient.sendExceptionLogMessage(tokenByPassAllowedLog)
}

var apiInterceptor = new ApiInterceptor(keyCloakConfig, cacheConfig);
var removedHeaders = [
  "host",
  "origin",
  "accept",
  "referer",
  "content-length",
  "accept-encoding",
  "accept-language",
  "accept-charset",
  "cookie",
  "dnt",
  "postman-token",
  "cache-control",
  "connection"
];

async function getAllRoles(obj) {
  let roles = await obj.roles;
  await _.forEach(obj.organisations, async value => {
    roles = await roles.concat(value.roles);
  });
  return roles;
}

module.exports = async function (req, res, next) {

  removedHeaders.forEach(function (e) {
    delete req.headers[e];
  });

  var token = req.headers["x-authenticated-user-token"];
  if (!req.rspObj) req.rspObj = {};
  var rspObj = req.rspObj;
  
  // if ((req.path.includes("reports") || req.path.includes("gotenberg") || req.path.includes("solutionDetails") || (req.query.csv && req.query.csv == true)) && req.headers["internal-access-token"] === process.env.INTERNAL_ACCESS_TOKEN) {
  //   req.setTimeout(parseInt(REQUEST_TIMEOUT_FOR_REPORTS));
  //   next();
  //   return
  // }

  if (!token) {
    rspObj.errCode = reqMsg.TOKEN.MISSING_CODE;
    rspObj.errMsg = reqMsg.TOKEN.MISSING_MESSAGE;
    rspObj.responseCode = responseCode.unauthorized;
    return res.status(401).send(respUtil(rspObj));
  }

  apiInterceptor.validateToken(token, function (err, tokenData) {

    if (err) {
      rspObj.errCode = reqMsg.TOKEN.INVALID_CODE;
      rspObj.errMsg = reqMsg.TOKEN.INVALID_MESSAGE;
      rspObj.responseCode = responseCode.UNAUTHORIZED_ACCESS;
      tokenAuthenticationFailureMessageToSlack(req, token, "TOKEN VERIFICATION WITH KEYCLOAK FAILED")
      return res.status(401).send(respUtil(rspObj));
    } else {
      req.rspObj.userId = tokenData.userId;
      req.rspObj.userToken = req.headers["x-authenticated-user-token"];
      delete req.headers["x-authenticated-userid"];
      delete req.headers["x-authenticated-user-token"];
      // rspObj.telemetryData.actor = utilsService.getTelemetryActorData(req);
      req.headers["x-authenticated-userid"] = tokenData.userId;
      req.rspObj = rspObj;
      shikshalokam
        .userInfo(token, tokenData.userId)
        .then(async userDetails => {
          if (userDetails.responseCode == "OK") {
            req.userDetails = userDetails.result.response;
            req.userDetails.userToken = req.rspObj.userToken
            req.userDetails.allRoles = await getAllRoles(req.userDetails);
            next();
          } else {
            tokenAuthenticationFailureMessageToSlack(req, token, "TOKEN VERIFICATION - FAILED TO GET USER DETAIL FROM LEARNER SERVICE")
            rspObj.errCode = reqMsg.TOKEN.INVALID_CODE;
            rspObj.errMsg = reqMsg.TOKEN.INVALID_MESSAGE;
            rspObj.responseCode = responseCode.UNAUTHORIZED_ACCESS;
            return res.status(401).send(respUtil(rspObj));
          }
        })
        .catch(error => {
          tokenAuthenticationFailureMessageToSlack(req, token, "TOKEN VERIFICATION - ERROR FETCHING USER DETAIL FROM LEARNER SERVICE")
          return res.status(401).send(error);
        });
    }
  });
};
