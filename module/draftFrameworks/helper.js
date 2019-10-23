const draftECMHelper = require(ROOT_PATH + "/module/draftECM/helper");
const sectionsHelper = require(ROOT_PATH + "/module/draftSections/helper");
module.exports = class draftFrameworksHelper {
    static mandatoryField() {
        let mandatoryFields = {
            author: "",
            resourceType: ["Assessment Framework"],
            language: ["English"],
            keywords: ["Framework", "Assessment"],
            concepts: [],
            createdFor: [],
            isRubricDriven: true,
            isDeleted: false,
            parentId: null,
        }

        return mandatoryFields
    }

    static create(frameworkData, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                let queryObject = {
                    externalId: frameworkData.externalId,
                    name: frameworkData.name,
                    description: frameworkData.description,
                    entityType: frameworkData.entityType
                };

                let frameworkMandatoryFields = this.mandatoryField()

                let frameworkDocument = await database.models.draftFrameworks.findOne(queryObject, { _id: 1 }).lean()

                if (frameworkDocument) {
                    throw "Framework already exists"
                }

                Object.keys(frameworkMandatoryFields).forEach(eachMandatoryField => {
                    if (frameworkData[eachMandatoryField] === undefined) {
                        frameworkData[eachMandatoryField] = frameworkMandatoryFields[eachMandatoryField]
                    }
                })

                frameworkData["userId"] = userId

                frameworkData.isDeleted = false

                frameworkDocument = await database.models.draftFrameworks.create(frameworkData)

                let draftECMData = {
                    "frameworkId": frameworkDocument._id,
                    "externalId": "DEFAULT",
                    "tip": "default tip",
                    "name": "default name",
                    "description": "default description",
                    "startTime": "",
                    "endTime": "",
                    "isSubmitted": false,
                    "modeOfCollection": "default",
                    "canBeNotApplicable": false,
                    "userId": userId
                }

                await draftECMHelper.create(draftECMData)

                await sectionsHelper.create({
                    "frameworkId": frameworkDocument._id,
                    code: "DEFAULT",
                    name: "default",
                    "userId": userId
                })

                return resolve(frameworkDocument);
            }
            catch (error) {
                reject({
                    status: 500,
                    message: error,
                    errorObject: error
                })
            }
        })
    }

    static update(frameworkData, userId, frameworkId) {
        return new Promise(async (resolve, reject) => {
            try {

                let frameworkDocument = await database.models.draftFrameworks.findOne({
                    _id: frameworkId,
                    userId: userId
                }, { themes: 0 }).lean()

                if (!frameworkDocument) {
                    return resolve({
                        status: 404,
                        message: "Framework doesnot exist"
                    });
                }

                frameworkDocument = await database.models.draftFrameworks.findOneAndUpdate({
                    _id: frameworkDocument._id
                }, { $set: frameworkData }, { new: true })

                return resolve({
                    status: 200,
                    message: "Framework updated successfully.",
                    result: frameworkDocument
                });
            }
            catch (error) {
                reject({
                    status: 500,
                    message: error,
                    errorObject: error
                })
            }
        })
    }
}