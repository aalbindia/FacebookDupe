# 2520 Term Project

## 2025-03-28

Create Post functionality

- If a user is not logged in the Create Post button will not be visible
- Clicking the create button should take us to the Create post page. It will insert the post into the fakeDb.ts file.
- Shows post on main page

## 2025-03-30

- created GET /post/edit/:postid and POST /posts/edit/:postid
    - with editPost page and edit post button in posts.ejs
    - made sure only post owners can edit a post
- created GET /posts/deleteconfirm/:postid and POST /posts/delete/:postid
 - with deletePost page and delete post button in posts.ejs
    - made sure only post owners can delete a post
