const { model, Schema } = require("mongoose");

const regulation = new Schema(
    {
        businessTarget: String,
        projectTarget: String,
        requirements: String,
        restriction: String,
        controlPoints: String,
        budget: String,
        table:[{
            name: String,
            role: String,
            company: String,
            resopnsibility: String,
        }],
        project: {type: Schema.Types.ObjectId, ref:'project' }
    });

module.exports = model("regulation", regulation);