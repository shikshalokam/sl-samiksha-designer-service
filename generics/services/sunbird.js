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
  * @param requestBody - Logged in user Id.
  * @param token - Logged in user token.
  * @param url - url of the api call.
  * @param requestType - http request method
  * @returns {JSON} - sunbird service response
*/

function callToSunbird(requestType, url, token="", requestBody = "") {
    return new Promise(async (resolve, reject) => {

        let options = {
            "headers": {
                "content-type": "application/json",
                "internal-access-token":process.env.INTERNAL_ACCESS_TOKEN
            }
        };
        if(token){
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
                return resolve(data.body);
            }
        }

    });
}

/**
  * to Varify token is valid or not
  * @function
  * @name verifyToken
  * @param token - user token for verification 
  * @returns {JSON} - consist of token verification details
*/
const verifyToken = function (token) {
    return new Promise(async (resolve, reject) => {
        try {
            const verifyTokenEndpoint = CONSTANTS.endpoints.VERIFY_TOKEN;

            let requestBody = {
                token: token
            }
            let response = await callToSunbird("POST", verifyTokenEndpoint, "",requestBody);
            return resolve(response);
        } catch (error) {

            reject({ message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN });
        }
    })
}


module.exports = {
    verifyToken: verifyToken
};