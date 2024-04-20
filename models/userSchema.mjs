import mongoose from "mongoose";

mongoose.set("toJSON", {
    virtuals: true,
    transform: (doc, converted) => {
        delete converted._id;
        delete converted._v;
    },
});

const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    password: String,
    joinedDate: String,
    bio: String,
    profession: String,
    location: String,
    link: String,
    followers: [],
    following: [],
});

export default mongoose.model("User", userSchema);