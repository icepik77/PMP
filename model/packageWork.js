const { model, Schema } = require("mongoose");

const packageWork = new Schema(
    {
        name: {type:String, required: true},
        laborIntensity: {type: Number, required:true},
        note: {type:String},
        works:[{
            name: {type:String, required: true},
            labor: {type: Number, required:true}
        }],
        structWork: {type: Schema.Types.ObjectId, ref:'structWorks' }
    });

module.exports = model("packageWork", packageWork);