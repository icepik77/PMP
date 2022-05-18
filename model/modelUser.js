const { model, Schema } = require("mongoose");

const schemaInput = new Schema(
    {
        email: {type:String, required:true, unique:true},
        password: {type:String, required: true},
        projects: [{type: Schema.Types.ObjectId, ref:'project'}]
    });

module.exports = model("schemaInput", schemaInput);