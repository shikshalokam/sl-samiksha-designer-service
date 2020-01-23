module.exports = class draftECMHelper {
    static create(draftECMData) {
        return new Promise(async (resolve, reject) => {
            try {
                let draftECMDocument = await database.models.draftECM.create(draftECMData)
                return resolve(draftECMDocument)
            } catch (error) {
                return reject(error)
            }
        })
    }

    static draftEcmDocument(findQuery = "all", projection = "all") {
        return new Promise(async (resolve, reject) => {
            try {

                let filteredData = {};

                if( findQuery !== "all" ) {
                    filteredData = findQuery;
                }

                let projectedData = {};

                if( projection !== "all" ) {
                    projectedData = projection;
                }
                let draftEcmDocuments = await database.models.draftECM.find(
                    filteredData,
                    projectedData
                ).lean();

                return resolve(draftEcmDocuments);
            } catch (error) {
                reject(error);
            }
        })
    }

    static update(findQuery, updateData) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftEcmDocument = await database.models.draftECM.findOne(findQuery, { _id: 1 }).lean()

                if (!draftEcmDocument) {
                    throw {
                        status: 404,
                        message: "Draft Ecm doesnot exist"
                    }
                }

                draftEcmDocument = await database.models.draftECM.findOneAndUpdate({
                    _id: draftEcmDocument._id
                }, { $set: updateData }, { new: true }).lean()

                return resolve(draftEcmDocument);
            } catch (error) {
                reject(error)
            }
        })
    }

    static list(filteredData, pageSize, pageNo) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftEcmDocument = []

                let projection1 = {}
                projection1["$project"] = {
                    _id: 1, code: 1, name: 1, description: 1
                };

                let facetQuery = {}
                facetQuery["$facet"] = {}

                facetQuery["$facet"]["totalCount"] = [
                    { "$count": "count" }
                ]

                facetQuery["$facet"]["data"] = [
                    { $skip: pageSize * (pageNo - 1) },
                    { $limit: pageSize }
                ]

                let projection2 = {}
                projection2["$project"] = {
                    "data": 1,
                    "count": {
                        $arrayElemAt: ["$totalCount.count", 0]
                    }
                }

                draftEcmDocument.push(filteredData, projection1, facetQuery, projection2)

                let draftEcmDocuments = await database.models.draftECM.aggregate(draftEcmDocument)

                return resolve(draftEcmDocuments)

            } catch (error) {
                return reject(error);
            }
        })
    }

    /**
    * Validate draft ecm.
    * @method
    * @name validate
    * @param {Object} filteredData  
    * @param {String} filteredData.userId - logged in user id.
    * @param {String} filteredData.status - status of draft ecm.
    * @param {String} filteredData._id - draft ecm id.
    * @returns {Object} draft ecm validation status.
    */

    static validate(filteredData) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftEcmDocuments = 
                await this.draftEcmDocument(filteredData,{
                    _id : 1,
                    code : 1
                });

                if( !draftEcmDocuments[0]) {
                    throw {
                        message : 
                        messageConstants.apiResponses.DRAFT_ECM_NOT_FOUND
                    }
                } 

                let validate = true;

                return resolve(validate);

            } catch (error) {
                return reject(error);
            }
        })
    }
<<<<<<< HEAD

      /**
    * Publish draft ecm.
    * @method
    * @name publish
    * @param {Object} frameworkData  
    * @param {String} filteredData.userId - logged in user id.
    * @param {String} filteredData.status - status of draft ecm.
    * @param {String} filteredData.draftFrameworkId - draft framework id.
    * @returns {Object} evidencesMethod and ecmInternalIdsToExternalIds.
    */

   static publish(frameworkData) {
    return new Promise(async (resolve, reject) => {
        try {

            let draftEcmDocuments = 
            await this.draftEcmDocument(
                frameworkData,{
                "_id" : 1,
                "tip" : 1,
                "name" : 1,
                "description" : 1,
                "startTime" : 1,
                "endTime" : 1,
                "isSubmitted" : 1,
                "modeOfCollection" : 1,
                "canBeNotApplicable" : 1,
                "code": 1 
            });

            if( !draftEcmDocuments.length > 0 ) {
                throw {
                    message : 
                    messageConstants.apiResponses.DRAFT_ECM_NOT_FOUND
                }
            }

            let evidencesMethod = {};
            let ecmInternalIdsToExternalIds = {};
            let ecmIds = [];
            
            draftEcmDocuments.forEach(draftEcm=>{
                draftEcm["externalId"] = draftEcm.code;
                evidencesMethod[draftEcm.code] = _.omit(draftEcm,["_id","code"]);
                ecmInternalIdsToExternalIds[draftEcm._id] = draftEcm.code;
                ecmIds.push(draftEcm._id)
            })

            await database.models.draftECM.updateMany(
                { 
                    _id : { $in : ecmIds}
                },{
                    $set : {
                        status : "published"
                    }
                }
            )


            return resolve({
                evidencesMethod : evidencesMethod,
                ecmInternalIdsToExternalIds : ecmInternalIdsToExternalIds
            });

        } catch (error) {
            return reject(error);
        }
    })
   }


=======
>>>>>>> f2c6d749d7f20ca3567b80290175399b1c89bc4f
}