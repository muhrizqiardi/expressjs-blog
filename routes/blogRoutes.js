const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

router.get('/', blogController.blog_index); // Blog Index
router.get('/create', blogController.blog_create_get); // Create page route
router.post('/', blogController.blog_create_post); // Post a blog route
router.get('/:id', blogController.blog_details); // Blog details page
router.delete('/:id', blogController.blog_delete); // Delete a blog 

module.exports = router;