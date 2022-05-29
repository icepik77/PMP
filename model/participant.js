const { model, Schema } = require("mongoose");

const participant = new Schema({
    participants: [{
        name: String,
        uninformed: String,
        resisting: String,
        neutral: String,
        supporting: String,
        leading: String,
    }],
    project: {type: Schema.Types.ObjectId, ref:'project' }
});

module.exports = model("participant", participant);