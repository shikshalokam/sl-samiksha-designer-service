/**
 * name : module/helper.js
 * author : Rakesh Kumar
 * Date : 05-Sep-2020
 * Description : Observations related information.
 */

const { up } = require("../../migrations/20200910180356-creeate_observation_framework_form");

const draftFrameworkHelper = require(MODULES_BASE_PATH + "/draftFrameworks/helper");
const formsHelper = require(MODULES_BASE_PATH + "/forms/helper");
const entityTypesHelper = require(MODULES_BASE_PATH + "/entityTypes/helper");

const draftCriteriaHelper = require(MODULES_BASE_PATH + "/draftCriteria/helper");

module.exports = class ObservationsHelper {

    /**
    * To create draft framework
    * @method
    * @name  create
    * @param {Object} frameworkData - framework information.
    * @param {String} frameworkData.name - name of the framework.
    * @param {String} frameworkData.description - description of the framework.
    * @param {String} frameworkData.externalId - externalId of the framework.
    * @param {String} userId - keyclock used id.
    * @returns {json} Response consists of framework details
    */
    static create(frameworkData, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                let frameworkDocument = await draftFrameworkHelper.create(frameworkData, userId);
                return resolve({ success: true, data: frameworkDocument, message: CONSTANTS.apiResponses.FRAMEWORK_CREATED });

            } catch (error) {
                return reject({
                    message: error.message,
                    success: false,
                    data: false
                })
            }
        })
    }


    /**
    * To get details of draft framework
    * @method
    * @name  details
    * @param {String} draftFrameworkId - draft framework id.
    * @param {String} userId - keyclock user id.
    * @returns {json} Response consists of framework details
    */
    static details(draftFrameworkId, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                let frameworkDocument = await draftFrameworkHelper.details(draftFrameworkId, userId);
                return resolve({ success: true, data: frameworkDocument.result, message: CONSTANTS.apiResponses.FRAMEWORK_DETAILS_FETCHED });

            } catch (error) {
                reject({
                    message: error.message,
                    success: false,
                    data: false
                })
            }
        })
    }

    /**
    * To get framework form
    * @method
    * @name  getFrameworkForm
    * @param {String} draftFrameworkId - draft framework id.
    * @param {String} userId - keyclock user id.
    * @returns {json} Response consists of framewrok create form
    */
    static getFrameworkForm(draftFrameworkId, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                let frameworkDocument = await draftFrameworkHelper.details(draftFrameworkId, userId);
                let frameworkForm = await formsHelper.list({ name: CONSTANTS.common.FRAMEWORK_CREATE_FORM_NAME }, ["name", "value"]);
                let entityTypes = await entityTypesHelper.list({ isObservable: true }, { name: 1 });

                let entityTypeArray = [];
                entityTypes.map(type => {
                    entityTypeArray.push({
                        label: type.name,
                        value: type._id
                    })
                });

                let formDoc = frameworkDocument.result;
                if (frameworkForm.data) {
                    frameworkForm.data[0].value.map(function (data, index) {
                        if (data.field == "name") {
                            frameworkForm.data[0]['value'][index].value = formDoc.name;
                        } else if (data.field == "entityType") {
                            frameworkForm.data[0]['value'][index].options = entityTypeArray;
                            frameworkForm.data[0]['value'][index].value = formDoc.entityTypeId;

                        } else if (data.field == "description") {
                            frameworkForm.data[0]['value'][index].value = formDoc.description;
                        } else if (data.field == "language") {
                            frameworkForm.data[0]['value'][index].value = formDoc.language[0];

                        } else if (data.field == "keywords") {
                            frameworkForm.data[0]['value'][index].value = formDoc.keywords;
                        } else if (data.field == "voiceOver") {
                            frameworkForm.data[0]['value'][index].value = {
                                label: formDoc.voiceOver == true ? 'Yes' : "No",
                                value: formDoc.voiceOver
                            }
                        }
                    });
                }

                return resolve({
                    success: true,
                    data: frameworkForm.data[0]['value'],
                    message: CONSTANTS.apiResponses.OBSERVATION_FRAMEWORK_FORM_FETCHED
                });

            } catch (error) {
                reject({
                    message: error.message,
                    success: false,
                    data: false
                })
            }
        })
    }

    /**
    * To update observation draft framework
    * @method
    * @name  update
    * @param {String} frameworkId - framework id.
    * @param {Object} updateData - framework information.
    * @param {String} updateData.name - name of the framework.
    * @param {String} updateData.description - description of the framework.
    * @param {String} updateData.externalId - externalId of the framework.
   * @returns {json} Response consists of framework details
    */
    static update(frameworkId, userId, updateData) {
        return new Promise(async (resolve, reject) => {
            try {

                if (updateData.language) {
                    updateData.language = updateData.language;
                }
                if (updateData.entityType) {
                    updateData['entityTypeId'] = updateData.entityType.value;
                    updateData.entityType = updateData.entityType.label;
                }
                if (updateData.voiceOver) {
                    updateData.voiceOver = updateData.voiceOver.value;
                }

                const frameworkDoc = await draftFrameworkHelper.update({ _id: frameworkId, userId: userId }, updateData);
                return resolve({ message: CONSTANTS.apiResponses.FRAMEWORK_UPDATED, data: frameworkDoc, success: true });

            } catch (error) {
                reject({
                    message: error.message,
                    success: false,
                    data: false
                })
            }
        })
    }

    /**
        * To create draft criteria
        * @method
        * @name  create
        * @param {Object} draftCriteriaData - contains criteria details.
        * @param {String} draftCriteriaData.name - name of the criteria.
        * @param {String} draftCriteriaData.description - description of criteria.
        * @param {String} draftCriteriaData.draftFrameworkId - draft frameworkId.
        * @returns {json} Response consists of new criteria infromation
        */
    static createCriteria(draftCriteriaData) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("draftCriteriaDocument");
                let draftCriteriaDocument = await draftCriteriaHelper.create(draftCriteriaData);

                console.log("draftCriteriaDocument",draftCriteriaDocument);
                return resolve({ 
                    data: draftCriteriaDocument, 
                    success: true, 
                    message: CONSTANTS.apiResponses.DRAFT_CRITERIA_CREATED
                 })
            } catch (error) {
                reject({
                    message: error.message,
                    success: false,
                    data: false
                })
            }
        })
    }


    /**
   * To list criteria's
   * @method
   * @name  criteriaList
   * @param {Object} filteredData - query information.
   * @param {String} pageSize - page size of the request.
   * @param {String} pageNo - page number of the request.
   * @returns {json} Response consists of list of criteria's
   */
    static criteriaList(filteredData, pageSize, pageNo) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftCriteriaList = await draftCriteriaHelper.list(filteredData, pageSize, pageNo);
                let messageData = CONSTANTS.apiResponses.DRAFT_CRITERIAS_FETCHED;
                if (!draftCriteriaList[0].count) {
                    draftCriteriaList[0].count = 0
                    messageData = CONSTANTS.apiResponses.DRAFT_CRITERIAS_NOT_FOUND;
                }
                return resolve({
                    success: true,
                    data: draftCriteriaList[0].data,
                    message: messageData
                })

            } catch (error) {
                reject({
                    message: error.message,
                    success: false,
                    data: false
                })
            }
        })
    }

    /**
    * To update draft criteria
    * @method
    * @name  update
    * @param {Object} findQuery - query information.
    * @param {Object} updateData - update data.
    * @param {String} updateData.description - description of criteria.
    * @param {String} updateData.draftFrameworkId - draft frameworkId.
    * @param {String} updateData.name - name of criteria
    * @returns {json} Response consists of updated criteria details
    */
    static updateCriteria(findQuery, updateData) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftCriteriaDocument = await draftCriteriaHelper.update(findQuery,updateData);
                return resolve({
                    success: true,
                    result: draftCriteriaDocument,
                    message: CONSTANTS.apiResponses.DRAFT_CRITERIAS_UPDATED
                })
               
            } catch (error) {
                
                reject({
                    message: error.message,
                    success: false,
                    data: false
                });
            }
        })
    }

}