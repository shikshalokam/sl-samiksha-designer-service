/**
 * name : samiksha.js
 * author : Aman Jung Karki
 * Date : 21-jan-2020
 * Description : All samiksha related api call.
 */

var request = require('request');
const samikshaServiceUrl = process.env.APPLICATION_BASE_HOST + process.env.SAMIKSHA_SERVICE_BASE_URL+"api/v1/"

 /**
    * Create questions.
    * @method
    * @name createQuestions
    * @param {String} token - logged in user token.
    * @param {Object} requestData - requested question body data.
    * @returns {Object} created questions data 
*/


var createQuestions = function (token,requestData) {

    let questionCreateUrl = samikshaServiceUrl + "questions/create";

    return new Promise((resolve, reject) => {
        try {

            const samikshaCallBack = function (err, response) {
                if (err) {

                    let errorObject = {
                        message: `Samiksha service is down for address ${err.address}`
                    }

                    // slackClient.samikshaErrorAlert(errorObject)
                    console.log("Failed to connect to samiksha service.")
                } else {
                    let createQuestions = response.body.result;
                    return resolve(createQuestions)
                }
            }

            request.post(questionCreateUrl, {
                headers: {
                    "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN,
                    "content-type": "application/json",
                    "x-authenticated-user-token": token
                },
                json: requestData
            }, samikshaCallBack);
        } catch (error) {
            return reject(error)
        }
    })

}

/**
    * Create criteria.
    * @method
    * @name createCriteria
    * @param {String} token - logged in user token.
    * @param {Object} requestData - requested criteria data.
    * @returns {Object} created criteria data 
*/

var createCriteria = function (token,requestData) {

    let questionCreateUrl = samikshaServiceUrl + "criteria/create";

    return new Promise((resolve, reject) => {
        try {

            const samikshaCallBack = function (err, response) {
                if (err) {

                    let errorObject = {
                        message: `Samiksha service is down for address ${err.address}`
                    }

                    // slackClient.samikshaErrorAlert(errorObject)
                    console.log("Failed to connect to samiksha service.")
                } else {
                    let createCriteria = response.body.result;
                    return resolve(createCriteria)
                }
            }

            request.post(questionCreateUrl, {
                headers: {
                    "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN,
                    "content-type": "application/json",
                    "x-authenticated-user-token": token
                },
                json: requestData
            }, samikshaCallBack);
        } catch (error) {
            return reject(error)
        }
    })

}

/**
    * Create framework.
    * @method
    * @name createFramework
    * @param {String} token - logged in user token.
    * @param {Object} requestData - requested framework data.
    * @returns {Object} created framework data 
*/

var createFramework = function (token,requestData) {

    let questionCreateUrl = samikshaServiceUrl + "frameworks/make";

    return new Promise((resolve, reject) => {
        try {

            const samikshaCallBack = function (err, response) {
                if (err) {

                    let errorObject = {
                        message: `Samiksha service is down for address ${err.address}`
                    }

                    // slackClient.samikshaErrorAlert(errorObject)
                    console.log("Failed to connect to samiksha service.")
                } else {
                    let createFramework = response.body.result;
                    return resolve(createFramework)
                }
            }

            request.post(questionCreateUrl, {
                headers: {
                    "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN,
                    "content-type": "application/json",
                    "x-authenticated-user-token": token
                },
                json: requestData
            }, samikshaCallBack);
        } catch (error) {
            return reject(error)
        }
    })

}

/**
    * Import observations solutions for framework.
    * @method
    * @name importObservationSolutionsFromFramework
    * @param {String} token - logged in user token.
    * @param {String} frameworkExternalId - framework external id.
    * @param {String} entityType - entity type.
    * @returns {Object} solutions craeted
*/

var importObservationSolutionsFromFramework = function (token,frameworkExternalId,entityType) {

    let observationImportFromFrameworkUrl = `${samikshaServiceUrl}observations/importFromFramework?frameworkId=${frameworkExternalId}&entityType=${entityType}`;

    return new Promise((resolve, reject) => {
        try {

            const samikshaCallBack = function (err, response) {
                if (err) {

                    let errorObject = {
                        message: `Samiksha service is down for address ${err.address}`
                    }

                    // slackClient.samikshaErrorAlert(errorObject)
                    console.log("Failed to connect to samiksha service.")
                } else {
                    let createFramework = JSON.parse(response.body);
                    console.log(createFramework);
                    return resolve(createFramework)
                }
            }

            request.get(observationImportFromFrameworkUrl, {
                headers: {
                    "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN,
                    "content-type": "application/json",
                    "x-authenticated-user-token": token
                }
            }, samikshaCallBack);
        } catch (error) {
            return reject(error)
        }
    })

}

/**
    * Update solution. So that evidencesMethods and sections is present inside solutins.
    * @method
    * @name solutionUpdate
    * @param {String} token - logged in user token.
    * @param {Object} updateSolutionData - Solution fields to be updated.
    * @param {String} solutionExternalId - solution external id.
    * @returns {Object} solutions updated
*/

var solutionUpdate = function (token,updateSolutionData,solutionExternalId) {

    let solutionUpdateUrl = `${samikshaServiceUrl}solutions/updateSolutions?solutionExternalId=${solutionExternalId}`;

    return new Promise((resolve, reject) => {
        try {

            const samikshaCallBack = function (err, response) {
                if (err) {

                    let errorObject = {
                        message: `Samiksha service is down for address ${err.address}`
                    }

                    // slackClient.samikshaErrorAlert(errorObject)
                    console.log("Failed to connect to samiksha service.")
                } else {
                    let solutionUpdate = response.body.result;
                    return resolve(solutionUpdate)
                }
            }

            request.post(solutionUpdateUrl, {
                headers: {
                    "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN,
                    "content-type": "application/json",
                    "x-authenticated-user-token": token
                },
                json: updateSolutionData
            }, samikshaCallBack);
        } catch (error) {
            return reject(error)
        }
    })

}

var criteriaUpdate = function (token,updateCriteriaData,frameworkExternalId) {

    let criteriaUpdateUrl = `${samikshaServiceUrl}criteria/update?externalId=${frameworkExternalId}&frameworkIdExists=true`;

    return new Promise((resolve, reject) => {
        try {

            const samikshaCallBack = function (err, response) {
                if (err) {

                    let errorObject = {
                        message: `Samiksha service is down for address ${err.address}`
                    }

                    // slackClient.samikshaErrorAlert(errorObject)
                    console.log("Failed to connect to samiksha service.")
                } else {
                    let solutionUpdate = response.body;
                    return resolve(solutionUpdate)
                }
            }

            request.post(criteriaUpdateUrl, {
                headers: {
                    "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN,
                    "content-type": "application/json",
                    "x-authenticated-user-token": token
                },
                json: updateCriteriaData
            }, samikshaCallBack);
        } catch (error) {
            return reject(error)
        }
    })

}

module.exports = {
    createQuestions: createQuestions,
    createCriteria : createCriteria,
    createFramework : createFramework,
    importObservationSolutionsFromFramework : importObservationSolutionsFromFramework,
    solutionUpdate : solutionUpdate,
    criteriaUpdate : criteriaUpdate
};
