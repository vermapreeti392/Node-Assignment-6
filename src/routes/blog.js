const router = require('express').Router();
const Blog = require('../models/Blog')
const bodyParser = require('body-parser');
// Your routing code goes here

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

// For creating blogs
router.post('/blog', async (req, res) => {

    try {
        const blogs = await Blog.create(req.body)
        res.json({
            'status': "success",
            result: blogs
        });
    }
    catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }
})

// For querying blogs
router.get('/blog', async (req, res) => {
    try {

        let { search, page } = req.query;
        let blogs;
        if (search && page) blogs = await Blog.find({ topic: search }).limit(page * 5);
        else if (search) blogs = await Blog.find({ topic: search });
        else if (page) blogs = await Blog.find().limit(page * 5);
        else blogs = await Blog.find();
        res.json({
            status: "success",
            result: blogs
        });
    }
    catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }
})

// For updating a Blog
router.put('/blog/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const result = await Blog.updateOne({ _id: id }, req.body);
        const blog = await Blog.find({ _id: id });
        res.json({
            status: 'success',

            result,
            blog
        })
    }
    catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }

})

// For deleting a blog
router.delete('/blog/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const result = await Blog.deleteOne({ _id: id })
        const blog = await Blog.find({ _id: id })
        res.json({
            status: 'success',
            result,
            blog
        });
    }
    catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }

})

module.exports = router;