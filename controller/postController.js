const Post = require('../models/postModels');

// Create Post
exports.createPost = async (req, res) => {

    req.body.user = req.user.id;

    const post = await Post.create(req.body);

    res.status(201).json({
        success: true,
        message: "Post is created",
        post,
    });
}

// Update Post
exports.updatePost = async (req, res, next) => {
    let post = await Post.findById(req.params.id);

    if (!post) {
        return next(res.status(404).json({
            success: false,
            message: "Post is not found"
        }));
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Post is Updated",
        post,
    });
};

// Delete Post
exports.deletePost = async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(res.status(404).json({
            success: false,
            message: "Post is not found"
        }));
    }

    await post.remove();

    res.status(200).json({
        success: true,
        message: "Product Delete Successfully",
    });
};

// Get All Post
exports.getAllPost = async (req, res) => {
    const post = await Post.find();

    res.status(200).json({
        success: true,
        message: "Display all post",
        post,
    });
};

// Get Post Details
exports.getPostDetails = async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(res.status(404).json({
            success: false,
            message: "Post is not found"
        }));
    }

    res.status(200).json({
        success: true,
        message: "Get singal post",
        post
    });
};
