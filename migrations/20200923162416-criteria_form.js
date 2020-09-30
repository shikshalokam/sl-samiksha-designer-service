module.exports = {
  async up(db) {
    global.migrationMsg = "Create criteria Form"

      let allFields = [];

      let inputFields = ["name", "description"];

      let inputField = {
        "field": "",
        "value": "",
        "visible": true,
        "editable": true,
        "label": "",
        "width": 500,
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
          inputObj.label = "Criteria Name";
        } else if (fields == "description") {
          inputObj.input = "textarea";
          inputObj.validation = [];
        }

        allFields.push(inputObj);
      }));

      let createForm = {
        name: "criteriaForm",
        value: allFields
      }
      await db.collection('forms').insertOne(createForm);
    
  },

  async down(db) {
    // return await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
