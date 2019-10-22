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

    static update(draftECMData, draftECMId) {
        return new Promise(async (resolve, reject) => {
            try {
                let draftECMDocument = await database.models.draftECM.findOneAndUpdate({ "_id": draftECMId }, draftECMData,{new:true})
                return resolve(draftECMDocument)
            } catch (error) {
                return reject(error)
            }
        })
    }
}