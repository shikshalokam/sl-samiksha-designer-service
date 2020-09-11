/**
 * name : module/helper.js
 * author : Rakesh Kumar
 * Date : 05-Sep-2020
 * Description : Draft framework related information.
 */

// const draftECMHelper = require(MODULES_BASE_PATH + "/draftECM/helper");
// const sectionsHelper = require(MODULES_BASE_PATH + "/draftSections/helper");
const draftFrameworkHelper = require(MODULES_BASE_PATH + "/draftFrameworks/helper");
const formsHelper = require(MODULES_BASE_PATH + "/forms/helper");
const entityTypesHelper = require(MODULES_BASE_PATH + "/entityTypes/helper");

module.exports = class draftFrameworksHelper {

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

                let frameworkDocument = await draftFrameworkHelper.create(frameworkData,userId);
                return resolve({ success:true,data:frameworkDocument,message: CONSTANTS.apiResponses.FRAMEWORK_CREATED });

            } catch (error) {
                return reject({ 
                    message:error.message,
                    success:false,
                    data:false
                })
            }
        })
    }


    /**
    * To get details of draft framework
    * @method
    * @name  details
    * @param {String} draftFrameworkId - draft framework id.
    * @param {String} userId - keclock user id.
    * @returns {json} Response consists of framework details
    */
    static details(draftFrameworkId, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                let frameworkDocument = await draftFrameworkHelper.details(draftFrameworkId,userId);
                return resolve({ success:true,data:frameworkDocument,message: CONSTANTS.apiResponses.FRAMEWORK_DETAILS_FETCHED });
              
            } catch (error) {
                reject({
                    message:error.message,
                    success:false,
                    data:false
                })
            }
        })
    }
    
    /**
    * To get framework form
    * @method
    * @name  getFrameworkForm
    * @returns {json} Response consists of framewrok create form
    */
   static getFrameworkForm() {
    return new Promise(async (resolve, reject) => {
        try {

            let frameworkForm = await formsHelper.list({ name :  CONSTANTS.common.FRAMEWORK_CREATE_FORM_NAME },["name","value"]);

            let entityTypes =  await entityTypesHelper.list({ isObservable: true }, { name: 1 });

            let entityTypeArray = [];
            entityTypes.map(type =>{
                entityTypeArray.push({
                    label:type.name,
                    value:type._id
                })
            });
            if(frameworkForm.data){
                frameworkForm.data[0].value.map(function(data,index){
                    if(data.field=="entityType"){
                        frameworkForm.data[0]['value'][index].options = entityTypes;
                    }
                });
            }

            return resolve({ 
                success:true, 
                data:frameworkForm.data[0]['value'],
                message: CONSTANTS.apiResponses.OBSERVATION_FRAMEWORK_FORM_FETCHED 
            });
          
        } catch (error) {
            reject({
                message:error.message,
                success:false,
                data:false
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
   static update(frameworkId,userId,updateData) {
    return new Promise(async (resolve, reject) => {
        try {

            let frameworkDocument = await draftFrameworkHelper.update({ _id:frameworkId,userId:userId },updateData);
            return resolve({ message:CONSTANTS.apiResponses.FRAMEWORK_UPDATED, data:frameworkDocument,success:true });

        } catch (error) {
            reject({
                message:error.message,
                success:false,
                data:false
            })
        }
    })
}

}