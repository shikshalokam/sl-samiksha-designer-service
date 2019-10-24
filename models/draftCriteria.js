module.exports = {
  name: "draftCriteria",
  schema: {
    externalId: {
      type: String,
      default: "SAMPLE-EXTERNAL-ID",
      required: true
    },
    userId: {
      type: String,
      required: true,
      default: ""
    },
    timesUsed: {
      type: Number,
      required: true,
      default: 10
    },
    weightage: {
      type: Number,
      required: true,
      default: 20
    },
    name: {
      type: String,
      default: "SAMPLE-NAME",
      required: true
    },
    score: {
      type: String,
      default: "",
      // required: true
    },
    remarks: {
      type: String,
      default: "SAMPLE-REMARKS",
      required: true
    },
    showRemarks: {
      type: Boolean,
      default: true,
      required: true
    },
    description: {
      type: String,
      default: "SAMPLE DESCRIPTION",
      required: true
    },
    resourceType: {
      type: Array,
      default: ["observation"]
    },
    language: {
      type: Array,
      default: ["English"]
    },
    keywords: {
      type: Array,
      default: ["Framework", "Assessment"]
    },
    concepts: {
      type: Array,
      default: []
    },
    createdFor: {
      type: Array,
      default: ["0125748495625912324", "0125747659358699520"]
    },
    rubric: {
      type: Object,
      default: {
        "levels": {
          "L1": {
            "level": "L1",
            "label": "Level 1",
            "description": "sample description",
            "expression": ""
          },
          "L2": {
            "level": "L2",
            "label": "Level 2",
            "description": "sample description",
            "expression": ""
          },
          "L3": {
            "level": "L3",
            "label": "Level 3",
            "description": "sample description",
            "expression": ""
          },
          "L4": {
            "level": "L4",
            "label": "Level 4",
            "description": "sample description",
            "expression": ""
          }
        }
      }
    },
    flag: {
      type: Object,
      default: {},
      required: true
    },
    criteriaType: {
      type: String,
      default: "auto",
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    // frameworkCriteriaId: {
    //   type: "ObjectId",
    //   default: "",
    //   required: true
    // },
    draftFrameworkId: {
      type: "ObjectId",
      required: true
    }
  }
};
