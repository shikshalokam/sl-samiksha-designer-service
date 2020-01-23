module.exports = class draftSectionsHelper {
    static create(sectionsData) {
        return new Promise(async (resolve, reject) => {
            try {
                let sectionsDocument = await database.models.draftSections.create(sectionsData)
                return resolve(sectionsDocument)
            } catch (error) {
                return reject(error)
            }
        })
    }

    static update(findQuery, updateData) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftSectionDocument = await database.models.draftSections.findOne(findQuery, { _id: 1 }).lean()

                if (!draftSectionDocument) {
                    throw {
                        status: 404,
                        message: "Draft Section doesnot exist"
                    }
                }

                draftSectionDocument = await database.models.draftSections.findOneAndUpdate({
                    _id: draftSectionDocument._id
                }, { $set: updateData }, { new: true }).lean()

                return resolve(draftSectionDocument);
            } catch (error) {
                reject(error)
            }
        })
    }

    static list(filteredData, pageSize, pageNo) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftSectionsDocument = []

                let projection1 = {}
                projection1["$project"] = {
                    _id: 1, code: 1, name: 1
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

                draftSectionsDocument.push(filteredData, projection1, facetQuery, projection2)

                let draftSectionsDocuments = await database.models.draftSections.aggregate(draftSectionsDocument)

                return resolve(draftSectionsDocuments)

            } catch (error) {
                return reject(error);
            }
        })
    }

    static draftSectionDocument(findQuery = "all", projection = "all") {
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
                let draftSectionDocuments = await database.models.draftSections.find(
                    filteredData,
                    projectedData
                ).lean();

                return resolve(draftSectionDocuments);
            } catch (error) {
                reject(error);
            }
        })
    }

    /**
    * Validate draft sections.
    * @method
    * @name validate
    * @param {Object} filteredData  
    * @param {String} filteredData.userId - logged in user id.
    * @param {String} filteredData.status - status of draft sections.
    * @param {String} filteredData._id - draft sections id.
    * @returns {Object} draft sections validation status.
    */

    static validate(filteredData) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftSectionDocuments = 
                await this.draftSectionDocument(filteredData,{
                    _id : 1,
                    code : 1
                });

                if( !draftSectionDocuments[0]) {
                    throw {
                        message : 
                        messageConstants.apiResponses.DRAFT_SECTION_NOT_FOUND
                    };
                } 

                let validate = true;

                return resolve(validate);

            } catch (error) {
                return reject(error);
            }
        })
    }

     /**
    * Publish draft section.
    * @method
    * @name publish
    * @param {Object} frameworkData  
    * @param {String} filteredData.userId - logged in user id.
    * @param {String} filteredData.status - status of draft ecm.
    * @param {String} filteredData.draftFrameworkId - draft framework id.
    * @returns {Object} sections.
    */

   static publish(frameworkData) {
    return new Promise(async (resolve, reject) => {
        try {

            let draftSectionsDocuments = 
            await this.draftSectionDocument(frameworkData,{
                "_id" : 1,
                "code" : 1,
                "name" : 1,
            });

            if( !draftSectionsDocuments.length > 0 ) {
                throw {
                    message : 
                    messageConstants.apiResponses.DRAFT_SECTION_NOT_FOUND
                }
            }

            let sections = {};
            let sectionInternalIdsToExternalIds = {};
            let sectionIds = [];
            
            draftSectionsDocuments.forEach(draftSection=>{
                sections[draftSection.code] = draftSection.name;
                sectionInternalIdsToExternalIds[draftSection._id] = draftSection.code;
                sectionIds.push(draftSection._id);
            })

            await database.models.draftSections.updateMany(
                { 
                    _id : { $in : sectionIds}
                },{
                    $set : {
                        status : "published"
                    }
                }
            )


            return resolve({
                sections : sections,
                sectionInternalIdsToExternalIds : sectionInternalIdsToExternalIds
            });

        } catch (error) {
            return reject(error);
        }
    })
   }
}