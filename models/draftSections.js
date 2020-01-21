module.exports = {
  name: "draftSections",
  schema: {
    code: {
      type: String,
      default: "DEFAULT-CODE"
    },
    name: {
      type: String,
      default: "DEFAULT-NAME"
    },
    userId: {
      type: String,
      required: true
    },
    draftFrameworkId: {
      type: "ObjectId",
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    updatedBy: {
      type: String,
      default: ""
    },
    comments: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "draft"
    },
  }
};