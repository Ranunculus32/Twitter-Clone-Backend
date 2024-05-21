import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',  // Reference the Tweet model instead of Post
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    content: {
        type: String,
        required: true,
    },
    reply: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    isReply: {
        type: Boolean,
        default: false,
    }

    /*    likes: {
           type: Number,
           default: 0,
       }, */
}, {
    timestamps: true,
});

const Comment = model('Comment', commentSchema);
export default Comment;
