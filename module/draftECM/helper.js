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
}