const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

// GET route for rendering homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});
router.get("/post", withAuth, async (req, res) => {
  try {
    res.render("newPost");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/posts", withAuth, async (req, res) => {
  try {
    res.render("newPost");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/profile", withAuth, async (req, res) => {
  try {
    res.render("profile");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
