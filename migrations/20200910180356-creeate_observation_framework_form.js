module.exports = {
  async up(db) {
    global.migrationMsg = "Create Observation Framework Form"

      let allFields = [];

      let inputFields = ["name", "description", "keywords", "language", "entityType", "voiceOver"];

      let inputField = {
        "field": "",
        "value": "",
        "visible": true,
        "editable": true,
        "label": "",
        "width": 650,
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

        if(fields == "name"){
          inputObj.label = "Solution Name";
        }else if (fields == "keywords" || fields == "language" || fields == "entityType") {
          inputObj.input = "select";
          inputObj.options = []
          if (fields == "keywords") {
            inputObj.label = "Add Keywords"
            inputObj.validation = [];
            inputObj.input = "inputchip";
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
        } else if (fields == "voiceOver") {
          inputObj.input = "radio";
          inputObj.validation = [];
          inputObj.options = [
            {
               "label":"Yes",
               "value":"yes",
               "checked": false
            },
            {
             "label":"No",
             "value":"no",
             "checked": true
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
    
  },

  async down(db) {
    // return await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
