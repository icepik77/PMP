const { model, Schema } = require("mongoose");

const participant = new Schema(
    {
        name: String,
        uninformed: String,
        resisting: String,
        neutral: String,
        supporting: String,
        leading: String,
        project: {type: Schema.Types.ObjectId, ref:'project' }
    });

module.exports = model("participant", participant);