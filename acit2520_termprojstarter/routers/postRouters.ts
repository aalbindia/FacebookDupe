import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { getPosts, getPost, addPost, editPost, deletePost } from "../fake-db"; //IMPORTED ADD POST

router.get("/", async (req, res) => {
  const posts = await getPosts(20);
  const user = await req.user;
  res.render("posts", { posts, user });
});

router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("createPosts"); //renders our createPosts ejs whenever use enters /posts/create
});

router.post("/create", ensureAuthenticated, async (req, res) => {
  const { title, link, description, subgroup } = req.body;
  
  // console.log("Current User:", req.user);
  // console.log("Request Body:", req.body); (WAS FOR DEBUGGING)

//? returns undefined if obj is null, so if there is no user it will return undefined not an error
  const creator = req.user ? 1 : null;
  
  if (!creator) {
    return res.redirect("/auth/login");
  }

  const newPost = addPost(
    title, 
    link || '', 
    creator, 
    description, 
    subgroup
  );

  //console.log("New Post Created:", newPost); //(DEBUGGING)

  res.redirect("/posts");
});
router.get("/show/:postid", async (req, res) => {
  // ⭐ TODO
  res.render("individualPost");
});


router.get("/edit/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
  const postid = req.params.postid
  const post = getPost(parseInt(postid))
  const user = await req.user
  if (!user) {
    return res.redirect("/posts")
  }

  if (post.creator.id !== user.id) {
    return res.redirect("/posts");
  }

  res.render("editPosts", { postid })

  
});

router.post("/edit/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
  const { title, link, description, subgroup } = req.body;
  const postid = parseInt(req.params.postid)
  

  const edit = editPost( postid, {title, link, description, subgroup})

  //console.log("new edit", edit)

  res.redirect("/posts")
});

router.get("/deleteconfirm/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
  const postid = req.params.postid
  const post = getPost(parseInt(postid))
  const user = await req.user
  if (!user) {
    return res.redirect("/posts")
  }

  if (post.creator.id !== user.id) {
    return res.redirect("/posts");
  }
  res.render("deletePost", { postid, post })
});

router.post("/delete/:postid", ensureAuthenticated, async (req, res) => {
  const postid = parseInt(req.params.postid)

  deletePost(postid)
  res.redirect("/posts")

});

router.post(
  "/comment-create/:postid",
  ensureAuthenticated,
  async (req, res) => {
    // ⭐ TODO
  }
);

export default router;
