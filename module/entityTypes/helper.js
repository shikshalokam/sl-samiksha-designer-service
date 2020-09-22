
/**
 * name : module/helper.js
 * author : Rakesh Kumar
 * Date : 05-Sep-2020
 * Description : Entity types related information.
 */

module.exports = class entityTypesHelper {

    /**
      * To get all entityTypes
      * @method
      * @name list
      * @param {Object} queryParameter - Filtered query data.
      * @param {Object} projection- Projected data.   
      * @returns {Object} returns a entity types list from the filtered data.
     */

    static list(queryParameter, projection = {}) {
        return new Promise(async (resolve, reject) => {
            try {

                let entityTypeData = await database.models.entityTypes.find(queryParameter, projection).lean();

                return resolve(entityTypeData);

            } catch (error) {
                return reject(error);
            }
        })

    }

};