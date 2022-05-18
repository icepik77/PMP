const { model, Schema } = require("mongoose");

const work = new Schema(
    {
        name: {type:String, required: true},
        labor: {type: Number, required:true},
        packageWork: {type: Schema.Types.ObjectId, ref:'packageWork' }
    });

module.exports = model("work", schemaInput);