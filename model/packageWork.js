const { model, Schema } = require("mongoose");

const packageWork = new Schema(
    {
        name: {type:String, required: true},
        laborIntensity: {type: Number, required:true},
        structWork: {type: Schema.Types.ObjectId, ref:'structWorks' }
    });

module.exports = model("packageWork", packageWork);