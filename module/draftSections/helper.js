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

    static update(sectionsData, sectionsId) {
        return new Promise(async (resolve, reject) => {
            try {
                let sectionsDocument = await database.models.draftSections.findOneAndUpdate({ "_id": sectionsId }, sectionsData,{new:true})
                return resolve(sectionsDocument)
            } catch (error) {
                return reject(error)
            }
        })
    }
}