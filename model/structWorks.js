const { model, Schema } = require("mongoose");

const structWorks = new Schema(
    {
        laborCommon: Number,
        noteCommon: String,
        packagesWorks: [{
            name: {type:String, required: true},
            laborIntensity: {type: Number, required:true},
            note: {type:String},
            works:[{
                name: {type:String, required: true},
                labor: {type: Number, required:true}
            }]
        }],
        project: {type: Schema.Types.ObjectId, ref:'project' }
    });

module.exports = model("structWorks", structWorks);