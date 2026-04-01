import express from 'express';
import multer from 'multer';
import uploadFile from './services/imagekit.js';
import postModel from './models/postmodel.js';
import userModel from './models/userModel.js';
import cors from 'cors';
import registerRouter from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();

app.use(cors({
    origin: ['https://3-w-full-stack-internship-assignmen-nine.vercel.app', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/create-post', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        let imageUrl = null;
        if (req.file) {
            const uploadResult = await uploadFile(req.file.buffer);
            imageUrl = uploadResult.url;
        }

        if (!imageUrl && !req.body.caption) {
            return res.status(400).json({ message: "Post must have an image or caption" });
        }

        const post = await postModel.create({
            image: imageUrl,
            caption: req.body.caption,
            user: req.userId
        });

        res.status(201).json({
            message: "Post Created Successfully",
            post
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/fetch-posts', async (req, res) => {
    try {
        const { search, page = 1, limit = 5 } = req.query;
        let query = {};
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        if (search) {
            const matchingUsers = await userModel.find({
                username: { $regex: search, $options: 'i' }
            }).select('_id');
            const userIds = matchingUsers.map(u => u._id);

            query = {
                $or: [
                    { caption: { $regex: search, $options: 'i' } },
                    { user: { $in: userIds } }
                ]
            };
        }

        const totalPosts = await postModel.countDocuments(query);
        const posts = await postModel.find(query)
            .populate('user', 'username email')
            .populate('comments.user', 'username email')
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        res.status(200).json({
            message: "Posts Fetched Successfully",
            posts: posts,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalPosts / limitNumber),
            totalPosts
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/delete-post/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user.toString() !== req.userId && req.userId !== post.user) {
            return res.status(403).json({ message: "Unauthorized to delete this post" });
        }

        await postModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/like-post/:id', authMiddleware, async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const isLiked = post.likes.includes(req.userId);
        if (isLiked) {
            post.likes = post.likes.filter(id => id.toString() !== req.userId);
        } else {
            post.likes.push(req.userId);
        }

        await post.save();
        res.status(200).json({ message: "Post like toggled", likes: post.likes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/comment-post/:id', authMiddleware, async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Comment text is required" });

        const post = await postModel.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const comment = { text, user: req.userId };
        post.comments.push(comment);

        await post.save();
        await post.populate('comments.user', 'username email');

        res.status(200).json({ message: "Comment added", comments: post.comments });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.use('/api/auth', registerRouter);

export default app;