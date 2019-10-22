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

                // frameworkData.themes = {
                //     "type": "theme",
                //     "label": "theme",
                //     "externalId": "DEFAULT",
                //     "name": "default theme",
                //     "weightage": 100,
                //     "children": [
                //         {
                //             "type": "subtheme",
                //             "label": "subtheme",
                //             "externalId": "DEFAULT",
                //             "name": "Default subtheme",
                //             "weightage": 100,
                //             "criteria": [
                //                 {
                //                     "criteriaId": null,
                //                     "weightage": 100
                //                 }
                //             ]
                //         }
                //     ]
                // }


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
                    "userId":userId
                }

                await draftECMHelper.create(draftECMData)
                
                await sectionsHelper.create({
                    "frameworkId": frameworkDocument._id,
                    code: "DEFAULT",
                    name: "default",
                    "userId":userId
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

    static update(frameworkData, userId, frameworkExternalId) {
        return new Promise(async (resolve, reject) => {
            try {

                let queryObject = {
                    externalId: frameworkExternalId
                };

                let frameworkDocument = await database.models.draftFrameworks.findOne(queryObject, { themes: 0 }).lean()

                if (!frameworkDocument) {
                    return resolve({
                        status: 400,
                        message: "Framework doesnot exist"
                    });
                }

                let updateObject = _.merge(_.omit(frameworkDocument, "createdAt"), frameworkData)
                updateObject.updatedBy = userId

                frameworkDocument = await database.models.draftFrameworks.findOneAndUpdate({
                    _id: frameworkDocument._id
                }, updateObject, { new: true })

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