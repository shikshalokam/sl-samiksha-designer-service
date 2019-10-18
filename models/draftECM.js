module.exports = {
  name: "draftECM",
  schema: {
    externalId: String,
    tip: String,
    name: String,
    description: String,
    author: String,
    frameworkId: "ObjectId",
    startTime: String,
    endTime: String,
    isSubmitted: Boolean,
    modeOfCollection: String,
    canBeNotApplicable: Boolean
  }
};