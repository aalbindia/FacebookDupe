# 2520 Term Project

## 2025-03-28

Create Post functionality

- If a user is not logged in the Create Post button will not be visible
- Clicking the create button should take us to the Create post page. It will insert the post into the fakeDb.ts file.
- Shows post on main page

## 2025-03-30

- created GET /post/edit/:postid and POST /posts/edit/:postid
    -  with editPost page and edit post button in posts.ejs
    - made sure only post owners can edit a post
- created GET /posts/deleteconfirm/:postid and POST /posts/delete/:postid
    - with deletePost page and delete post button in posts.ejs
    - made sure only post owners can delete a post

## 2025-04-01

- We created the GET /posts/show/:postid route
- which shows post title, post link, timestamp, and creator
- We created POST /posts/comment-create/:postid route

## 2025-04-02

- We created Get /subs/list which shows all subs that have atleast one post with links to thier /subs/show/:subname page, the subs are sorted alphabeticaly
- We created the /subs/show/:subname page which is a page for each sub that has all posts just in that sub

## 2025-04-04

- Added created by user to each post on home page
- Allow users to choose thier own subgroup