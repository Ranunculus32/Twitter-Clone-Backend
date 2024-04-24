import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    htmlContent: {
        type: String,
    },
    /*    likes: {
           type: Number,
           default: 0,
       }, */
}, {
    timestamps: true,
});

const Comment = model('Comment', commentSchema);
export default Comment;
