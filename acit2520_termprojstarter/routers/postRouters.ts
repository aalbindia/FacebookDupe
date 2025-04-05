import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { getPosts, getPost, addPost, editPost, deletePost, addComment, users, comments, deleteComment } from "../fake-db"; //IMPORTED ADD POST

router.get("/", async (req, res) => {
  const posts = await getPosts(20);
  const user = await req.user;
  res.render("posts", { posts, user, users });
});

router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("createPosts"); //renders our createPosts ejs whenever use enters /posts/create
});

//create post
router.post("/create", ensureAuthenticated, async (req, res) => {
  const { title, link, description, subgroup } = req.body;
  
  // console.log("Current User:", req.user);
  // console.log("Request Body:", req.body); (WAS FOR DEBUGGING)

//? returns undefined if obj is null, so if there is no user it will return undefined not an error
  const user = await req.user
  const creator = req.user ? user?.id  : null;

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

//shows posts: 2025-04-01
router.get("/show/:postid", async (req, res) => {
  const postid = parseInt(req.params.postid);
  const post = getPost(postid);
  const user = await req.user;
  
  if (!post) {
    return res.redirect("/posts");
  }

  res.render("individualPost", { post, user });
});


router.get("/edit/:postid", ensureAuthenticated, async (req, res) => {
 
  const postid = req.params.postid
  const post = getPost(parseInt(postid))
  const user = await req.user
  if (!user) {
    return res.redirect("/posts")
  }

  if (post.creator.id !== user.id) {
    return res.redirect("/posts");
  }

  res.render("editPosts", { postid, title: post.title, post })

  
});

//edit post
router.post("/edit/:postid", ensureAuthenticated, async (req, res) => {
  const { title, link, description, subgroup } = req.body;
  const postid = parseInt(req.params.postid)
  

  const edit = editPost( postid, {title, link, description, subgroup})

  //console.log("new edit", edit)

  res.redirect("/posts")
});

//confirm if delete post
router.get("/deleteconfirm/:postid", ensureAuthenticated, async (req, res) => {
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

//delete post
router.post("/delete/:postid", ensureAuthenticated, async (req, res) => {
  const postid = parseInt(req.params.postid)

  deletePost(postid)
  res.redirect("/posts")

});

// comments: 2025-04-01
router.post(
  "/comment-create/:postid",
  ensureAuthenticated,
  async (req, res) => {
    const postid = parseInt(req.params.postid);
    const { description } = req.body;
    const user = await req.user;

    if (!user) {
      return res.redirect("/auth/login");
    }

    addComment(postid, user.id, description);
    res.redirect(`/posts/show/${postid}`);
  }
);

router.get(
  "/comment-delete/:commentid",
  ensureAuthenticated,
  async (req,res) => {
    const commentid = parseInt(req.params.commentid);
    const user = await req.user;

    if (!user) {
      return res.redirect("/auth/login");
    }

    const comment = Object.values(comments).find(c => c.id === commentid);

    if (!comment) {
      return res.redirect("/posts");
    }

    if (comment.creator !== user.id) {
      return res.redirect("/posts");
    }

    deleteComment(commentid);

    res.redirect(`/posts/show/${comment.post_id}`);

  }
);

export default router;
