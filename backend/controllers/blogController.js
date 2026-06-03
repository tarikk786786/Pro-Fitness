const { BlogPost } = require('../models/Content');
const { asyncHandler, ErrorResponse } = require('../middleware/errorHandler');

exports.getBlogs = asyncHandler(async (req, res, next) => {
    const blogs = await BlogPost.find({ isPublished: true });
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
});

exports.getBlog = asyncHandler(async (req, res, next) => {
    const blog = await BlogPost.findOne({ slug: req.params.slug });
    if (!blog) return next(new ErrorResponse('Blog not found', 404));
    res.status(200).json({ success: true, data: blog });
});

exports.createBlog = asyncHandler(async (req, res, next) => {
    req.body.author = req.user.id;
    const blog = await BlogPost.create(req.body);
    res.status(201).json({ success: true, data: blog });
});

exports.updateBlog = asyncHandler(async (req, res, next) => {
    const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return next(new ErrorResponse('Blog not found', 404));
    res.status(200).json({ success: true, data: blog });
});

exports.deleteBlog = asyncHandler(async (req, res, next) => {
    const blog = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blog) return next(new ErrorResponse('Blog not found', 404));
    res.status(200).json({ success: true, data: {} });
});
