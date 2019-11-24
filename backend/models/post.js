const mongoose = require('mongoose');


// just a blueprint or a model
const postSchema = mongoose.Schema({
  title: { type: String, required: true},
  content: { type: String, required: true},
  imagePath: { type: String, required: true}
});

// first argument is the name of the model, 2nd is the schema defined above
module.exports = mongoose.model('Post', postSchema);
