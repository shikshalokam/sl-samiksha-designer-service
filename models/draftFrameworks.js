module.exports = {
  name: "draftFrameworks",
  schema: {
    externalId: {
      type: String,
      default: "SAMPLE-EXTERNAL-ID",
    },
    name: {
      type: String,
      default: "DRAFT FRAMEWORK",
    },
    description: {
      type: String,
      default: "SAMPLE DESCRIPTION",
    },
    userId: {
      type: String,
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
    scoringSystem: {
      type: String,
      default: "percentage"
    },
    levelToScoreMapping: {
      type: Object,
      default: {
        "L1": {
          "points": 25,
          "label": "Not Good"
        },
        "L2": {
          "points": 50,
          "label": "Decent"
        },
        "L3": {
          "points": 75,
          "label": "Good"
        },
        "L4": {
          "points": 100,
          "label": "Best"
        }
      }
    },
    themes: {
      type: Array,
      default: [{
        "type": "DEFAULT-THEME",
        "label": "DEFAULT-THEME",
        "externalId": "DEFAULT-THEME",
        "name": "DEFAULT-THEME",
        "weightage": 100,
        "children": []
      }
      ]
    },
    noOfRatingLevels: {
      type: Number,
      default: 4
    },
    isRubricDriven: {
      type: Boolean,
      default: true
    },
    updatedBy: {
      type: String,
      default: "SYSTEM"
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: String,
      default: "SYSTEM"
    },
    entityType: {
      type: String,
      default: "school"
    },
    entityTypeId: {
      type: "ObjectId",
      default: ObjectId("5ce23d633c330302e720e65f")
    },
    status: {
      type: String,
      default: "draft"
    }
  }
};
