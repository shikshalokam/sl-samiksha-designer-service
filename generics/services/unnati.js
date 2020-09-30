/**
 * name : unnati.js
 * author : Rakesh Kumar
 * Date : 23-sep-2020
 * Description : All unnati service related information.
 */

//dependencies

const request = require('request');



/**
  * Call to unnati service. 
  * @function
  * @name callToUnnati
  * @param {String} requestBody - Logged in user Id.
  * @param {String} token - Logged in user token.
  * @param {String} url - url of the api call.
  * @param {String} requestType - http request method
  * @returns {JSON} - unnati service response
*/

function callToUnnati(requestType, url, token = "", requestBody = "") {
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


        url = process.env.UNNATI_SERIVCE_HOST + process.env.UNNATI_SERIVCE_BASE_URL + process.env.URL_PREFIX + url;
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
                    message: CONSTANTS.apiResponses.UNNATI_SERVICE_DOWN
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
  * To get  improvement category list
  * @function
  * @name categoryList
  * @param {String} token - user token for verification 
  * @returns {JSON} - consist of improvement projects catgory list
*/
const impCategoryList = function (token) {
    return new Promise(async (resolve, reject) => {
        try {
            const categoryListEndPoint = CONSTANTS.endpoints.IMPROVEMENT_CATEGORY_LIST;
            let response = await callToUnnati("GET", categoryListEndPoint, token, "");
            return resolve(response);
        } catch (error) {
            reject({ message: CONSTANTS.apiResponses.UNNATI_SERVICE_DOWN });
        }
    })
}

/**
  * To get  improvement projects in a category
  * @function
  * @name improvementProjects
  * @param {String} token - user token for verification 
  * @param {String} category - improvement project category
  * @param {String} searchText - search text
  * @param {String} pageNo - page number
  * @param {String} pageSize - page size
  * @returns {JSON} - response consist of improvement projects
*/
const improvementProjects = function (token, category,searchText,pageNo,pageSize) {
    return new Promise(async (resolve, reject) => {
        try {
            const impProjectsEndPoint = CONSTANTS.endpoints.IMPROVEMENT_PROJECTS + category
            +"?limit="+pageSize
            +"&page="+pageNo
            +"&search="+searchText;
            let response = await callToUnnati("GET", impProjectsEndPoint, token);
            return resolve(response);
        } catch (error) {
            reject({ message: CONSTANTS.apiResponses.UNNATI_SERVICE_DOWN });
        }
    })
}

/**
  * To get  improvement project details
  * @function
  * @name improvementProjectDetails
  * @param {String} token - user token for verification 
  * @param {String} projectId - improvement project id
  * @returns {JSON} - response consist of improvement project details
*/
const improvementProjectDetails = function (token, projectId) {
    return new Promise(async (resolve, reject) => {
        try {
            const impProjectDetailsEndPoint = CONSTANTS.endpoints.IMPROVEMENT_PROJECT_DETAILS +projectId;
            let response = await callToUnnati("GET", impProjectDetailsEndPoint, token);
            return resolve(response);
        } catch (error) {
            reject({ message: CONSTANTS.apiResponses.UNNATI_SERVICE_DOWN });
        }
    })
}





module.exports = {
    impCategoryList: impCategoryList,
    improvementProjects: improvementProjects,
    improvementProjectDetails: improvementProjectDetails
};