/**
 * name : sunbird.js
 * author : Rakesh Kumar
 * Date : 24-jun-2020
 * Description : All sunbird service related information.
 */

//dependencies

const request = require('request');



/**
  * Call to sunbird service. 
  * @function
  * @name callToSunbird
  * @param {String} requestBody - Logged in user Id.
  * @param {String} token - Logged in user token.
  * @param {String} url - url of the api call.
  * @param {String} requestType - http request method
  * @returns {JSON} - sunbird service response
*/

function callToSunbird(requestType, url, token = "", requestBody = "") {
    return new Promise(async (resolve, reject) => {

        let options = {
            "headers": {
                "content-type": "application/json",
                "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN
            }
        };
        if (token) {
            options['headers']["x-authenticated-user-token"] = token;
        }

        if (requestType != "GET") {
            options['json'] = requestBody;
        }

        url = process.env.SUNBIRD_SERIVCE_HOST + process.env.SUNBIRD_SERIVCE_BASE_URL + process.env.URL_PREFIX + url;
        if (requestType == "PATCH") {
            request.patch(url, options, callback);
        } else if (requestType == "GET") {
            request.get(url, options, callback);
        } else {
            request.post(url, options, callback);
        }

        function callback(err, data) {
            if (err) {
                return reject({
                    message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN
                });
            } else {
                if (data.body && data.body.message) {
                    return resolve(data.body);
                } else {
                    return resolve(JSON.parse(data.body));
                }

            }
        }

    });
}

/**
  * To Varify token is valid or not
  * @function
  * @name verifyToken
  * @param {String} token - user token for verification 
  * @returns {JSON} - consist of token verification details
*/
const verifyToken = function (token) {
    return new Promise(async (resolve, reject) => {
        try {
            const verifyTokenEndpoint = CONSTANTS.endpoints.VERIFY_TOKEN;

            let requestBody = {
                token: token
            }
            let response = await callToSunbird("POST", verifyTokenEndpoint, "", requestBody);
            return resolve(response);
        } catch (error) {

            reject({ message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN });
        }
    })
}

/**
  * To get learning resource filters
  * @function
  * @name learningResoucesFilters
  * @param {String} token - user token for verification 
  * @returns {JSON} - response consists of learning resources filters
*/
const learningResoucesFilters = function (token) {
    return new Promise(async (resolve, reject) => {
        try {
            const resourcesFilters = CONSTANTS.endpoints.LEARNING_RESOURCES_FILTER;
            let response = await callToSunbird("GET", resourcesFilters, token);
            return resolve(response);
        } catch (error) {

            reject({ message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN });
        }
    })
}

/**
       * To get learning resource list
       * @method
       * @name  learningResoucesList
       * @param {String} token - keyclock access token.
       * @param {String} pageNo - page number
       * @param {String} pageSize - page size
       * @param {String} searchText - search text in learning resources
       * @param {String} category - learning resource category 
       * @param {Object} filters - learning resource filters
       * @param {Array} filters.board - board's for the learning resource
       * @param {Array} filters.medium - medium's for the learning resource
       * @param {Array} filters.gradeLevel - gradeLevel's for the learning resource
       * @param {Array} filters.subject - subject's of the learning resources
       * @returns {json} Response consists of learning resources list
*/
const learningResoucesList = function (token, pageNo, pageSize, searchText,filters) {
    return new Promise(async (resolve, reject) => {
        try {
            const learningResoucesEndpoint = CONSTANTS.endpoints.LEARNING_RESOURCES_LIST
                + "?page=" + pageNo
                + "&limit=" + pageSize
                + "&search=" + searchText;

            let requestBody = {
                filters:filters
            }
            let response = await callToSunbird("POST", learningResoucesEndpoint, token, requestBody);
            return resolve(response);
        } catch (error) {
            reject({ message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN });
        }
    })
}


module.exports = {
    verifyToken: verifyToken,
    learningResoucesList: learningResoucesList,
    learningResoucesFilters: learningResoucesFilters

};