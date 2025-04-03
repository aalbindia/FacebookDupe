const { ensureAuthenticated } = require("../middleware/checkAuth");
import express from "express";
// import * as database from "../controller/postController";
import { getSubs, getPosts, getPost } from "../fake-db";
const router = express.Router();

router.get("/list", async (req, res) => {
  const subs = getSubs()
  subs.sort()
  res.render("subs", { subs });
});

router.get("/show/:subname", async (req, res) => {
  const sub = req.params.subname;
  const posts = getPosts(20, sub)
  res.render("sub", { sub, posts });
});

export default router;
