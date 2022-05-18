const { model, Schema } = require("mongoose");

const structWorks = new Schema(
    {
        laborCommon: Number,
        noteCommon: String,
        project: {type: Schema.Types.ObjectId, ref:'project' }
    });

module.exports = model("structWorks", structWorks);