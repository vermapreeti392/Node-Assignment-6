const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    // Your code goes here

    topic: { type: String, required: true },
    description: { type: String, required: true },
    posted_at: { type: String, default: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} on ${new Date().getDate()}th` },
    posted_by: String

})

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;