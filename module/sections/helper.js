module.exports = class sectionsHelper {
    static create(sectionsData) {
        return new Promise(async (resolve, reject) => {
            try {
                let sectionsDocument = await database.models.sections.create(sectionsData)
                return resolve(sectionsDocument)
            } catch (error) {
                return reject(error)
            }
        })
    }

    static update(sectionsData, sectionsId) {
        return new Promise(async (resolve, reject) => {
            try {
                let sectionsDocument = await database.models.sections.findOneAndUpdate({ "_id": sectionsId }, sectionsData,{new:true})
                return resolve(sectionsDocument)
            } catch (error) {
                return reject(error)
            }
        })
    }
}