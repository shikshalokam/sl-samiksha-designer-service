module.exports = {
  name: "draftQuestions",
  schema: {
    externalId: {
      type: String,
      default: "SAMPLE-EXTERNAL-ID",
      required: true
    },
    draftCriteriaId: {
      type: "ObjectId",
      required: true,
    },
    draftFrameworkId: {
      type: "ObjectId",
      required: true,
    },
    draftEvidenceMethodId: {
      type: "ObjectId",
      required: true,
    },
    draftSectionId: {
      type: "ObjectId",
      required: true,
    },
    question: {
      type: Array,
      default: []
    },
    tip: {
      type: String,
      default: "DRAFT-QUESTION-TIP"
    },
    hint: {
      type: String,
      default: "DRAFT-QUESTION-HINT"
    },
    responseType: {
      type: String,
      default: "DRAFT-RESPONSE-TYPE"
    },
    value: {
      type: String,
      default: "DRAFT-VALUE"
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    showRemarks: {
      type: Boolean,
      default: false
    },
    remarks: {
      type: String,
      default: "DRAFT-REMARKS"
    },
    visibleIf: {
      type: Object,
      default: {}
    },
    createdBy: {
      type: String,
      default: "",
      required: true
    },
    updatedBy: {
      type: String,
      default: "",
      required: true
    },
    options: {
      type: Array,
      default: []
    },
    children: {
      type: Array,
      default: []
    },
    questionGroup: {
      type: Array,
      default: ["A1"]
    },
    questionType: {
      type: String,
      default: "DRAFT-QUESTION-TYPE"
    },
    modeOfCollection: {
      type: String,
      default: "DRAFT-MODE-OF-COLLECTION"
    },
    usedForScoring: {
      type: String,
      default: "percentage"
    },
    file: {
      type: Object,
      default: {}
    },
    fileName: {
      type: Array,
      default: []
    },
    validation: {
      type: Object,
      default: {}
    },
    accessibility: {
      type: String,
      default: "DRAFT-ACCESSIBILITY"
    },
    instanceIdentifier: {
      type: String,
      default: "DRAFT-INSTANCE-IDENTIFIER"
    },
    noOfInstances: {
      type: Number,
      default: 0
    },
    notApplicable: {
      type: Boolean,
      default: false
    },
    canBeNotApplicable: {
      type: Boolean,
      default: false
    },
    instanceQuestionsString: {
      type: String,
      default: ""
    },
    instanceQuestions: {
      type: Array,
      default: []
    },
    isAGeneralQuestion: {
      type: Boolean,
      default: false
    },
    dateFormat: {
      type: String,
      default: "dd-mm-yyyy"
    },
    autoCapture: {
      type: String,
      default: "SAMPLE-AUTO-CAPTURE"
    },
    rubricLevel: {
      type: String,
      default: "RUBRIC-LEVEL"
    },
    sectionHeader: {
      type: String,
      default: "SAMPLE-SECTION-HEADER"
    },
    allowAudioRecording: {
      type: Boolean,
      default: false
    },
    page: {
      type: String,
      default: "SAMPLE-PAGE"
    },
    questionNumber: {
      type: String,
      default: "SAMPLE-QUESTION-NUMBER"
    },
    userId: {
      type: String,
      required: true
    },
  }
};
