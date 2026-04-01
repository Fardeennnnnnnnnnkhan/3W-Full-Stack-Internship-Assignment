import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    image: {
        type: String,
        required: false
    },
    caption: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    comments: [{
        text: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }]
}, { timestamps: true });

const postModel = mongoose.model('post', postSchema);
export default postModel;
