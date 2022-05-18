const { model, Schema } = require("mongoose");

const criticalTask = new Schema(
    {
        name: {type:String, required: true},
        labor: {type: Number, required:true},
        project: {type: Schema.Types.ObjectId, ref:'project' }
    });

module.exports = model("criticalTask", criticalTask);