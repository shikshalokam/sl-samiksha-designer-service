module.exports = {
  name: "draftCriteria",
  schema: {
    externalId: String,
    owner: String,
    timesUsed: Number,
    weightage: Number,
    name: String,
    score: String,
    remarks: String,
    showRemarks: "boolean",
    description: String,
    resourceType: [String],
    language: [String],
    keywords: [String],
    concepts: ["json"],
    createdFor: [String],
    rubric: Object,
    flag: Object,
    criteriaType: String,
    frameworkCriteriaId : "ObjectId"
  }
};
