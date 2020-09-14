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
    * @param {String} userId - keyclock user id.
    * @returns {json} Response consists of framework details
    */
    static details(draftFrameworkId, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                let frameworkDocument = await draftFrameworkHelper.details(draftFrameworkId,userId);
                return resolve({ success:true,data:frameworkDocument.result,message: CONSTANTS.apiResponses.FRAMEWORK_DETAILS_FETCHED });
              
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
    * @param {String} draftFrameworkId - draft framework id.
    * @param {String} userId - keyclock user id.
    * @returns {json} Response consists of framewrok create form
    */
   static getFrameworkForm(draftFrameworkId,userId) {
    return new Promise(async (resolve, reject) => {
        try {

            let frameworkDocument = await draftFrameworkHelper.details(draftFrameworkId,userId);
            let frameworkForm = await formsHelper.list({ name :  CONSTANTS.common.FRAMEWORK_CREATE_FORM_NAME },["name","value"]);
            let entityTypes =  await entityTypesHelper.list({ isObservable: true }, { name: 1 });

            let entityTypeArray = [];
            entityTypes.map(type =>{
                entityTypeArray.push({
                    label:type.name,
                    value:type._id
                })
            });
            
            let formDoc = frameworkDocument.result;
            if(frameworkForm.data){
                frameworkForm.data[0].value.map(function(data,index){
                    if(data.field=="name"){
                        frameworkForm.data[0]['value'][index].value = formDoc.name;
                    }else if(data.field=="entityType"){
                        frameworkForm.data[0]['value'][index].options = entityTypeArray;
                        frameworkForm.data[0]['value'][index].value = formDoc.entityTypeId;
                        
                    }else if(data.field=="description"){
                        frameworkForm.data[0]['value'][index].value = formDoc.description;
                    }else if(data.field=="language"){
                        frameworkForm.data[0]['value'][index].value = formDoc.language;
                    
                    }else if(data.field=="keywords"){
                        frameworkForm.data[0]['value'][index].value = formDoc.keywords;
                    }else if(data.field=="voiceOver"){
                        frameworkForm.data[0]['value'][index].value = {
                            label:formDoc.voiceOver==true ? 'Yes':"No",
                            value:formDoc.voiceOver
                        }
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

            if(updateData.language){
                updateData.language = updateData.language;
            }
            if(updateData.entityType){
                updateData['entityTypeId'] = updateData.entityType.value;
                updateData.entityType = updateData.entityType.label;
            }
            if(updateData.voiceOver){
                updateData.voiceOver = updateData.voiceOver.value;
            }

            const frameworkDoc = await draftFrameworkHelper.update({ _id:frameworkId,userId:userId },updateData);
            return resolve({ message:CONSTANTS.apiResponses.FRAMEWORK_UPDATED, data:frameworkDoc,success:true });

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