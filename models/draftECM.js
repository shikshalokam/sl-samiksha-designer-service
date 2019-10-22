module.exports = {
  name: "draftECM",
  schema: {
    code: {
      type: String,
      default: "DRAFT-ECM-CODE"
    },
    tip: {
      type: String,
      default: "DRAFT-ECM-TIP"
    },
    name: {
      type: String,
      default: "DRAFT-ECM-NAME"
    },
    description: {
      type: String,
      default: "DRAFT-ECM-DESCRIPTION"
    },
    userId: {
      type: String,
      required: true
    },
    frameworkId:{
      type: "ObjectId",
      required: true
    },
    startTime: {
      type: String,
      default: new Date()
    },
    endTime: {
      type: String,
      default: new Date()
    },
    isSubmitted: {
      type: Boolean,
      default: false
    },
    modeOfCollection: {
      type: String,
      default: "onfield"
    },
    canBeNotApplicable: {
      type: Boolean,
      default: false
    }
  }
};