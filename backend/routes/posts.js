const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer'); // for extracting the image data
const CheckAuth = require('../middleware/check-auth');

const MIME_TYPE_MAP ={
  'image/png': '.png',
  'image/jpg': '.jpg'
};
const storage = multer.diskStorage({
  destination: (request,file,callback) =>  {
    callback(null, './images');
  },
  filename: (request,file,callback) =>  {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name);
  }
});


router.post('/create', CheckAuth, multer({storage: storage}).single('image'), (request, response, next) =>  {
  const post = new Post({
    title: request.body.title,
    content: request.body.content,
    imagePath: request.protocol + '://'+ request.get('host') + '/images/' + request.file.filename
  });
    post.save();
    response.status(201).json({message: 'Successfully created'});

});
router.get('', (request, response, next) => {
    var postsData;
    Post.find().then(
      result=> {
        postsData = result;
        response.status(200).json(postsData);

      }
    );

  });

  router.delete('/delete/:id', (request, response, next) => {

        Post.deleteOne({_id: request.params.id}).then(
          result => {
            response.status(200).json({message: 'deleted',
            id: request.params.id + ' deleted'});
          }
        );

  });

  module.exports = router;
