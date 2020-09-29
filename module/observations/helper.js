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
const usersHelper = require(MODULES_BASE_PATH + "/users/helper");
const unnatiService = require(GENERIC_SERVICES_PATH + "/unnati");

const sunbirdService = require(GENERIC_SERVICES_PATH + "/sunbird");


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

                let users = await usersHelper.getUserRoles(userId);
                if (users && users.data && users.data.includes(CONSTANTS.common.DESIGNER_ROLE)) {


                    let frameworkDocument = await draftFrameworkHelper.create(frameworkData, userId);
                    return resolve({ success: true, data: frameworkDocument, message: CONSTANTS.apiResponses.FRAMEWORK_CREATED });

                } else {
                    throw new Error(CONSTANTS.apiResponses.INVALID_ACCESS);
                }

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

                let users = await usersHelper.getUserRoles(userId);
                if (users && users.data && users.data.includes(CONSTANTS.common.DESIGNER_ROLE)) {

                    let frameworkDocument = await draftFrameworkHelper.details(draftFrameworkId, userId);
                    return resolve({ success: true, data: frameworkDocument.result, message: CONSTANTS.apiResponses.FRAMEWORK_DETAILS_FETCHED });

                } else {
                    throw new Error(CONSTANTS.apiResponses.INVALID_ACCESS);
                }

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

                let users = await usersHelper.getUserRoles(userId);
                if (users && users.data && users.data.includes(CONSTANTS.common.DESIGNER_ROLE)) {

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

                } else {
                    throw new Error(CONSTANTS.apiResponses.INVALID_ACCESS);
                }

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

                let users = await usersHelper.getUserRoles(userId);
                if (users && users.data && users.data.includes(CONSTANTS.common.DESIGNER_ROLE)) {

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

                } else {
                    throw new Error(CONSTANTS.apiResponses.INVALID_ACCESS);
                }

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
                let users = await usersHelper.getUserRoles(draftCriteriaData.userId);
                if (users && users.data && users.data.includes(CONSTANTS.common.DESIGNER_ROLE)) {
                    let draftCriteriaDocument = await draftCriteriaHelper.create(draftCriteriaData);
                    return resolve({
                        data: draftCriteriaDocument,
                        success: true,
                        message: CONSTANTS.apiResponses.DRAFT_CRITERIA_CREATED
                    })
                } else {
                    throw new Error(CONSTANTS.apiResponses.INVALID_ACCESS);
                }
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
    static criteriaList(filteredData, pageSize, pageNo, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                let users = await usersHelper.getUserRoles(userId);
                if (users && users.data && users.data.includes(CONSTANTS.common.DESIGNER_ROLE)) {
                    let draftCriteriaList = await draftCriteriaHelper.list(filteredData, pageSize, pageNo);
                    let messageData = CONSTANTS.apiResponses.DRAFT_CRITERIAS_FETCHED;
                    if (!draftCriteriaList[0].count) {
                        draftCriteriaList[0].count = 0
                        messageData = CONSTANTS.apiResponses.DRAFT_CRITERIAS_NOT_FOUND;
                    }
                    return resolve({
                        success: true,
                        data: draftCriteriaList[0],
                        message: messageData
                    })

                } else {
                    throw new Error(CONSTANTS.apiResponses.INVALID_ACCESS);
                }

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
    * To update criteria
    * @method
    * @name  update
    * @param {Object} findQuery - query information.
    * @param {Object} updateData - update data.
    * @param {String} updateData.description - description of criteria.
    * @param {String} updateData.draftFrameworkId - draft frameworkId.
    * @param {String} updateData.name - name of criteria
    * @returns {json} Response consists of updated criteria details
    */
    static updateCriteria(findQuery, updateData, token) {
        return new Promise(async (resolve, reject) => {
            try {

                let users = await usersHelper.getUserRoles(findQuery.userId);
                if (users && users.data && users.data.includes(CONSTANTS.common.DESIGNER_ROLE)) {


                    let impProjects = [];
                    if (updateData.improvementProjects) {
                        await Promise.all(updateData.improvementProjects.map(async function (impProject) {
                            let projectData = await unnatiService.improvementProjectDetails(token, impProject._id);
                            if (projectData && projectData.result) {
                                impProjects.push(
                                    {
                                        "_id": projectData.result._id,
                                        "title": projectData.result.name,
                                        "goal": projectData.result.description,
                                        "externalId": projectData.result.externalId
                                    });
                            }
                        }));
                    }
                  
                    updateData['improvementProjects'] = impProjects;
                    let resources = [];
                    if (updateData.learningResources) {
                        await Promise.all(updateData.learningResources.map(async function (resource) {
                            resources.push({
                                        "_id": resource.identifier,
                                        "name": resource.name,
                                        "description": resource.description,
                            });
                        }));
                    }
                    updateData['learningResources'] = resources;

                    let draftCriteriaDocument = await draftCriteriaHelper.update(findQuery, updateData);
                    return resolve({
                        success: true,
                        result: draftCriteriaDocument,
                        message: CONSTANTS.apiResponses.DRAFT_CRITERIAS_UPDATED
                    });

                } else {
                    throw new Error(CONSTANTS.apiResponses.INVALID_ACCESS);
                }


            } catch (error) {

                reject({
                    message: error.message,
                    success: false,
                    data: false
                });
            }
        })
    }

    /**
   * To get details of criteria
   * @method
   * @name  criteriaDetails
   * @param {String} criteriaId - draft criteria id.
   * @param {String} userId - keyclock user id.
   * @returns {json} Response consists of criteria details
   */
    static criteriaDetails(criteriaId, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                let users = await usersHelper.getUserRoles(userId);
                if (users && users.data && users.data.includes(CONSTANTS.common.DESIGNER_ROLE)) {

                    let draftCriteriaDocument = await draftCriteriaHelper.details(criteriaId, userId);

                    return resolve({
                        success: true,
                        data: draftCriteriaDocument.result,
                        message: CONSTANTS.apiResponses.DRAFT_CRITERIAS_FETCHED
                    });

                } else {
                    throw new Error(CONSTANTS.apiResponses.INVALID_ACCESS);
                }

            } catch (error) {
                reject({
                    message: error.message,
                    success: false,
                    data: false
                });
            }
        })
    }

    /**
       * To get criteria form
       * @method
       * @name  getCriteriaForm
       * @param {String} userId - keyclock user id.
       * @returns {json} Response consists of criteria create form
       */
    static getCriteriaForm(userId) {
        return new Promise(async (resolve, reject) => {
            try {

                let users = await usersHelper.getUserRoles(userId);
                if (users && users.data && users.data.includes(CONSTANTS.common.DESIGNER_ROLE)) {

                    let criteriaForm = await formsHelper.list({ name: CONSTANTS.common.CRITERIA_FORM_NAME }, ["name", "value"]);

                    return resolve({
                        success: true,
                        data: criteriaForm.data[0]['value'],
                        message: CONSTANTS.apiResponses.CRITERIA_FORM_FETCHED
                    });

                } else {
                    throw new Error(CONSTANTS.apiResponses.INVALID_ACCESS);
                }

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
       * To get criteria form
       * @method
       * @name  impCategoryList
       * @param {String} token - keyclock access token.
       * @param {String} userId - keyclock user id.
       * @returns {json} Response consists of improvemnt crategory list
       */
    static impCategoryList(token, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                let users = await usersHelper.getUserRoles(userId);
                if (users && users.data && users.data.includes(CONSTANTS.common.DESIGNER_ROLE)) {

                    let criteriaList = await unnatiService.impCategoryList(token);
                    if (criteriaList && criteriaList.status == HTTP_STATUS_CODE["ok"].status && criteriaList.result) {
                        return resolve({
                            success: true,
                            data: criteriaList.result,
                            message: criteriaList.message
                        });
                    } else {
                        throw new Error(criteriaList.message);
                    }

                } else {
                    throw new Error(CONSTANTS.apiResponses.INVALID_ACCESS);
                }
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
       * To get criteria form
       * @method
       * @name  improvementProjects
       * @param {String} token - keyclock access token.
       * @param {String} userId - keyclock user id.
       * @param {String} category - improvement projects category
       * @param {String} searchText - improvement project search
       * @param {String} pageNo - page number
       * @param {String} pageSize - page size
       * @returns {json} Response consists of improvemnts projects list
       */
    static improvementProjects(token, userId, category,searchText,pageNo,pageSize) {
        return new Promise(async (resolve, reject) => {
            try {

                let users = await usersHelper.getUserRoles(userId);
                if (users && users.data && users.data.includes(CONSTANTS.common.DESIGNER_ROLE)) {

                    let improvemntProjects = await unnatiService.improvementProjects(token, category, searchText,pageNo,pageSize);
                    if (improvemntProjects && improvemntProjects.status == HTTP_STATUS_CODE["ok"].status && improvemntProjects.result) {
                        return resolve({
                            success: true,
                            data: improvemntProjects.result,
                            message: improvemntProjects.message
                        });
                    } else {
                        throw new Error(improvemntProjects.message);
                    }

                } else {
                    throw new Error(CONSTANTS.apiResponses.INVALID_ACCESS);
                }
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
       * To get learning resource list
       * @method
       * @name  learningResoucesList
       * @param {String} token - keyclock access token.
       * @param {String} userId - keyclock user id.
       * @param {String} pageNo - page number
       * @param {String} pageSize - page size
       * @param {String} searchText - search text in learning resources
       * @param {Object} filters - resource filters
       * @param {Array} filters.board - board's for the learning resource
       * @param {Array} filters.medium - medium's for the learning resource
       * @param {Array} filters.gradeLevel - gradeLevel's for the learning resource
       * @param {Array} filters.subject - subject's of the learning resources
       * @returns {json} Response consists of learning resources list
       */
    static learningResoucesList(token, userId, pageNo, pageSize,searchText,filters) {
        return new Promise(async (resolve, reject) => {
            try {

                let users = await usersHelper.getUserRoles(userId);
                if (users && users.data && users.data.includes(CONSTANTS.common.DESIGNER_ROLE)) {

                    let learningResoucesList = await sunbirdService.learningResoucesList(token, pageNo, pageSize,searchText,filters);
                    if (learningResoucesList && learningResoucesList.status == HTTP_STATUS_CODE["ok"].status && learningResoucesList.result) {
                        
                        
                        let resources = [];
                        if(learningResoucesList.result.content && learningResoucesList.result.content.length > 0){
                        learningResoucesList.result.content.map(async function (resource) {
                            resources.push({
                                        "_id": resource.identifier,
                                        "name": resource.name,
                                        "description": resource.description,
                            });
                        });
                    }

                        return resolve({
                            success: true,
                            data: { content: resources, count:learningResoucesList.result.count },
                            message: learningResoucesList.message
                        });
                    } else {
                        throw new Error(learningResoucesList.message);
                    }

                } else {
                    throw new Error(CONSTANTS.apiResponses.INVALID_ACCESS);
                }
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
       * To get learning resource filters
       * @method
       * @name  learningResoucesFilters
       * @param {String} token - keyclock access token.
       * @param {String} userId - keyclock user id.
       * @returns {json} Response consists of learning resources filters
       */
    static learningResoucesFilters(token, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                let users = await usersHelper.getUserRoles(userId);
                if (users && users.data && users.data.includes(CONSTANTS.common.DESIGNER_ROLE)) {

                    let learningResoucesFilters = await sunbirdService.learningResoucesFilters(token);
                    if (learningResoucesFilters && learningResoucesFilters.status == HTTP_STATUS_CODE["ok"].status && learningResoucesFilters.result) {
                        return resolve({
                            success: true,
                            data: learningResoucesFilters.result,
                            message: learningResoucesFilters.message
                        });
                    } else {
                        throw new Error(learningResoucesFilters.message);
                    }

                } else {
                    throw new Error(CONSTANTS.apiResponses.INVALID_ACCESS);
                }
            } catch (error) {
                reject({
                    message: error.message,
                    success: false,
                    data: false
                })
            }
        })
    }


}