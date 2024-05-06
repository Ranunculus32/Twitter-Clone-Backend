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

    content: {
        type: String,
        required: true,
    },
    reply: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        // You can add more fields here as needed
    }],

    /*    likes: {
           type: Number,
           default: 0,
       }, */
}, {
    timestamps: true,
});

const Comment = model('Comment', commentSchema);
export default Comment;
