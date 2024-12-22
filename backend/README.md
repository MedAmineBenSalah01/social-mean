Social Media App - API
This is a social media platform API that allows users to create posts, send friend requests, like posts, comment on posts, and manage friends. It includes authentication and user-specific routes, enabling a dynamic and interactive social experience.

Features
User Authentication: Allows users to sign up and log in to the platform.
Friend Management: Users can send, respond to, and manage friend requests. They can also view friends' posts.
Posts and Interactions:
Users can create posts, like posts, and comment on posts.
Users can interact with posts shared by their friends.
Routes
Authentication Routes
POST /api/v1/signup:

Registers a new user.
Request Body:
username: String (Required)
email: String (Required)
password: String (Required)
Response: User is created successfully, or an error message is returned.
POST /api/v1/login:

Logs in an existing user.
Request Body:
email: String (Required)
password: String (Required)
Response: A JWT token is returned upon successful login, or an error message is returned.
Friend Routes
POST /api/v1/:userId/friend-request:

Sends a friend request to a user.
Request Body:
userId: String (Required) - The ID of the user to send a friend request to.
Response: Success or error message based on the request status.
POST /api/v1/friend-request/respond:

Responds to a friend request (either accept or reject).
Request Body:
requestId: String (Required) - The ID of the request.
response: String (Required) - Either "accept" or "reject".
Response: Success or error message.
GET /api/v1/:userId/friends/posts:

Fetches posts made by the user's friends.
Response: A list of posts by friends.
POST /api/v1/users/search:

Searches for users by their username.
Request Body:
query: String (Required) - The search query (usually a username).
Response: A list of users matching the query.
GET /api/v1/:userId/friend-request:

Fetches friend requests for the logged-in user.
Response: A list of friend requests.
Post Routes
POST /api/v1/create-post:

Creates a new post for the user.
Request Body:
text: String (Required) - The content of the post.
Response: Success or error message.
POST /api/v1/:postId/like:

Likes a post.
Request Body:
postId: String (Required) - The ID of the post to like.
Response: Success or error message.
POST /api/v1/:postId/comment:

Adds a comment to a post.
Request Body:
postId: String (Required) - The ID of the post to comment on.
comment: String (Required) - The text content of the comment.
Response: Success or error message.
POST /api/v1/me/posts:

Fetches posts created by the logged-in user.
Response: A list of the logged-in user's posts.
POST /api/v1/friends/posts:

Fetches posts made by the user's friends.
Response: A list of posts made by the user's friends.
Authentication Middleware
The routes require a valid JWT token for user authentication.
The authMiddleware() ensures that the user is authenticated before accessing the API endpoints.
Setup and Installation
Prerequisites
Node.js (v14 or above)
MongoDB (local or cloud database, such as MongoDB Atlas)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/social-media-app.git
Navigate to the project directory:

bash
Copy code
cd social-media-app
Install dependencies for both backend and frontend (if applicable):

bash
Copy code
npm install
Create a .env file in the root directory to store sensitive environment variables such as database URI, JWT secret, etc.

Run the application:

bash
Copy code
npm start
The server will start, and the API will be available at http://localhost:5000/api/v1.

API Authentication
Login to get a JWT token:
Send a POST request to /api/v1/login with the user's credentials (email and password).
The server will return a JWT token that should be included in the Authorization header for subsequent requests (e.g., Authorization: Bearer <JWT_TOKEN>).
Future Features
Real-time notifications for friend requests and new posts.
Private messaging system between users.
Enhanced search functionality with filters.
Profile customization with user bio and profile picture.