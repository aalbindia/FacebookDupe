# ACIT 2520 Term Project – Post Management Application

## Overview
This project is a full-stack post management system that allows users to create, view, edit, and delete posts within specific subgroups. The system includes user authentication, access control, and comment functionality. It was initially built using a **Node.js + Express** backend with an in-memory `fakeDb.ts` for data handling, and is now being enhanced with **React** for an improved frontend experience and **PostgreSQL** for persistent data storage.

---

## Features and Progress

### 2025-03-28 – Create Post Functionality
- Added *Create Post* feature.
- The **Create Post** button is only visible to logged-in users.
- Clicking the button navigates to the *Create Post* page.
- Posts are inserted into the `fakeDb.ts` file and displayed on the main page after creation.

### 2025-03-30 – Edit and Delete Posts
- Implemented **GET `/posts/edit/:postid`** and **POST `/posts/edit/:postid`** routes.
- Created an **Edit Post** page and button within `posts.ejs`.
- Ensured **only the post owner** can edit their own posts.
- Implemented **GET `/posts/deleteconfirm/:postid`** and **POST `/posts/delete/:postid`** routes.
- Added a **Delete Confirmation** page and button in `posts.ejs`.
- Restricted delete permissions to post owners only.

### 2025-04-01 – Post Detail and Comments
- Added **GET `/posts/show/:postid`** route to display detailed post information including title, link, timestamp, and creator.
- Implemented **POST `/posts/comment-create/:postid`** route for creating comments under posts.

### 2025-04-02 – Subgroup Listing and Filtering
- Added **GET `/subs/list`** route to list all subgroups with at least one post, sorted alphabetically.
- Implemented **`/subs/show/:subname`** page that displays all posts within a specific subgroup.

### 2025-04-04 – UI and Functional Improvements
- Displayed the post creator’s name on the home page.
- Added the ability for users to choose their own subgroup when creating a post.
- Added a *Cancel* option on the Delete Confirmation page.
- Made post information pre-fill when editing a post.

### 2025-04-05 – Comment Deletion and Code Organization
- Implemented **delete comment** functionality.
- Added a dedicated `deleteComment()` function in `fakeDb.ts` for better code structure and consistency.
- All core project features are now complete.

---

## Ongoing Development
I am currently extending this project to include:

### 🔐 **JWT Authentication**
Implementing secure **JSON Web Token (JWT)** authentication to replace session-based login.  
This improves scalability and security while enabling smoother integration with React and APIs.

### 🔔 **Real-Time Notifications**
Adding **real-time notifications** using WebSockets so users receive instant updates when someone comments or interacts with their posts.  
This enhances user engagement and demonstrates real-time communication handling in Node.js.

---

## Technologies Used
- **Backend:** Node.js, Express  
- **Frontend:** EJS (migrating to React)  
- **Database:** In-memory `fakeDb.ts` (migrating to PostgreSQL)  
- **Authentication:** Session-based (upgrading to JWT)  
- **Notifications:** WebSockets (in progress)  

---

## Future Enhancements
- User profiles and avatars  
- Post upvoting system  
- Search and filtering by keyword or tag  
- Deployment to Render or Vercel with PostgreSQL integration  

