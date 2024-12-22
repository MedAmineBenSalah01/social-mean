# fullstack mean app

Social Media App is a full-stack application built with Angular, Node.js, Express, and TypeScript. It allows users to create posts, like add comments, search for users, and manage invitations to connect.

## Installation

To set up the app locally, follow these steps:

Backend
```bash
cd backend / npm install && npm start
```
Frontend
```bash
cd frontend / npm install && npm start
```

## Usage

Backend (Node.js + Express)
The backend is built with Node.js, Express. It supports user authentication with jwt tokens, post creation, and user interaction functionalities, including sending, accepting, or rejecting invitations.

Frontend (Angular)
The frontend is built with Angular and communicates with the backend through HTTP requests. It includes user authentication, profile management, post creation (like and comments), and user search with the ability to send and manage connection invitations.

sign up page : 

![singup](https://github.com/user-attachments/assets/ae01586e-3db8-49c2-9a06-1c96a3b4ba3d)



login page : 

![login](https://github.com/user-attachments/assets/59181a6e-3685-4462-934f-ebde4be26f1c)


Example Invitation request : 


![friends_requests](https://github.com/user-attachments/assets/a863233d-acec-425d-a357-b3d9ec60f5a0)


Before sending a request after searching a user : 


![before_request](https://github.com/user-attachments/assets/313923e0-cf1e-4303-9002-900b28f21664)



After sending request : 


![after-request](https://github.com/user-attachments/assets/07b73415-44e3-4fa8-aea0-f1e97df514f3)


Post example : 

![post_init](https://github.com/user-attachments/assets/1cae787d-3488-4f09-a2c3-20db57b19237)

after posting : 


![post_example](https://github.com/user-attachments/assets/08e942db-85f5-4557-87ad-2d0a2e656eb0)


Comment on friends Posts : 
shows the user comment with the user name

![comment-on-friends-post](https://github.com/user-attachments/assets/a92d68e9-10b9-4862-831b-6e223f4914e1)
