const { model, Schema } = require("mongoose");

const work = new Schema(
    {
        name: {type:String, required: true},
        labor: {type: Number, required:true}
    });

module.exports = model("work", schemaInput);