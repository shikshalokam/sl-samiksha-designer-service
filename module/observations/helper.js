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
    * @name  details
    * @returns {json} Response consists of framework details
    */
   static getFrameworkForm() {
    return new Promise(async (resolve, reject) => {
        try {

            let frameworkForm = await formsHelper.list({ name : "ObservationFramework" },["name","value"]);

            let entityTypes =  await entityTypesHelper.list({ isObservable: true }, { name: 1 });

            if(frameworkForm.data){
                frameworkForm.data[0].value.map(function(data,index){
                    if(data.field=="entitytype"){
                        frameworkForm.data[0]['value'][index].options = entityTypes;
                    }
                });
            }

            return resolve({ 
                success:true, 
                data:frameworkForm.data,
                message: CONSTANTS.apiResponses.FRAMEWORK_DETAILS_FETCHED 
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

}