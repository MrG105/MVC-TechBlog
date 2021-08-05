const router = require("express").Router();
const {Post, Comment, User } = require("../models/");


// get all posts
router.get('/', async (req, res) => {
    // find all Posts
    try {
      const postData = await Post.findAll({
        // be sure to include its associated Users
        include: [{ model: User }]      
      });
      res.render("all-posts", { posts });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/post/:id', async (req, res) => {
    // find one Post by its `id` value
    try {
        const postData = await Post.findByPk(req.params.id, {
            // be sure to include its associated Products
            include: [{ model: User, Comment }]
        });
        if (!postData) {
            res.status(404).json({ message: 'No Post found with this id!' });
            return;
        }
        res.render("single-post", { post });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
