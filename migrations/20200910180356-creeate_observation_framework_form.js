module.exports = {
  async up(db) {
    global.migrationMsg = "Create Observation Framework Form"

    let userCreateForm =
      await db.collection('forms').findOne({ name: "ObservationFramework" });

    if (!userCreateForm) {

      let allFields = [];

      let inputFields = ["solutionName", "description", "addkeywords", "language", "entitytype", "voiceover"];

      let inputField = {
        "field": "",
        "value": "",
        "visible": true,
        "editable": true,
        "label": "",
        "input": "text",
        "validation": [{
          "name": "required",
          "validator": "required",
          "message": ""
        }]
      };

      await Promise.all(inputFields.map(async function (fields) {

        let inputObj = JSON.parse(JSON.stringify(inputField));
        let field = fields.replace(/([A-Z])/g, " $1");
        inputObj.label = field.charAt(0).toUpperCase() + field.slice(1);
        inputObj.field = fields;


        inputObj.validation[0].message = inputObj.label + " required";

        if (fields == "addkeywords" || fields == "language" || fields == "entitytype") {
          inputObj.input = "select";
          inputObj.options = []
          if (fields == "addkeywords") {
            inputObj.validation = [];
          }

          if (fields == "language") {
            inputObj.options = [
              {
                "label": "English",
                "value": "english"
              },
              {
                "label": "Hindi",
                "value": "hindi"
              }
            ];
          }
        }
        else if (fields == "description") {
          inputObj.input = "textarea";
          inputObj.validation = [];
        } else if (fields == "voiceover") {
          inputObj.input = "radio";
          inputObj.validation = [];
          inputObj.options = [
            {
              "label": "YES",
              "value": "yes"
            },
            {
              "label": "NO",
              "value": "no"
            },
          ]
        }

        allFields.push(inputObj);
      }));

      let createForm = {
        name: "ObservationFramework",
        value: allFields
      }
      await db.collection('forms').insertOne(createForm);
    }
  },

  async down(db) {
    // return await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
