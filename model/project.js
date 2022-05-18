const { model, Schema } = require("mongoose");

const project = new Schema(
    {
        name: {type:String, required: true}
    });

module.exports = model("project", project);