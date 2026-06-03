const express = require('express');
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');
const { validate, blogSchema } = require('../middleware/validate');

const router = express.Router();

router.get('/', getBlogs);
router.get('/:slug', getBlog);

router.use(protect);
router.post('/', authorize('admin'), validate(blogSchema), createBlog);
router.put('/:id', authorize('admin'), validate(blogSchema), updateBlog);
router.delete('/:id', authorize('admin'), deleteBlog);

module.exports = router;
