import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    title: {type: String, required: true, trim: true, maxLength: 50},
    description: {type: String, required: true, trim: true, minLength: 10},
    createAt: {type: Date, default: Date.now},
    hashtags: [{type: String, trim: true}],
    meta: {
        views: {type: Number, default: 0},
        rating: {type: Number, default: 0},
    },
});

//before make a model

// videoSchema.pre("save", async function () {
//     this.hashtags = this.hashtags[0]
//         .split(",")
//         .map((word) => (word.startsWith("#") ? word : `#${word}`));
// });

// this is middleware,  before saving the model hashtags are remodeled to plus '#'

//make function in videoModle with static keyword.
//because "save" can use pre middleware but "update" Cannot use pre middleware.
videoSchema.static("formatHashtags", function (hashtags) {
    return hashtags
        .split(",")
        .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
