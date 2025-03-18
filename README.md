# Beacon Frontend
## Overview
The frontend of Beacon is built using React.js, providing a dynamic and interactive user interface for the blogging platform. This application allows users to register, log in, create posts, comment on posts, and manage their profiles seamlessly.

## Features
- User registration and authentication
- Post creation, editing, and deletion
- Viewing and commenting on posts
- Liking and saving posts
- Following other users
- Categorizing posts

## Technologies Used
- React.js
- Axios (for API requests)
- React Router (for routing)
- Bootstrap / Material-UI (for styling)

## Installation
###  Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Steps to Setup
#### 1. Clone the repository
```bash
git clone https://github.com/AmanWasti9/Blogging-App-Frontend.git
cd Blogging-App-Frontend
```
#### 2. Install dependencies:
```bash
npm install
```
### 3. Configure API Endpoint:
- Open src/config.js (or wherever you configure your API base URL) and set your backend API URL:
```bash
export const API_URL = 'http://localhost:8080/api'; // adjust according to your backend
```
#### 4. Start the development server:
```bash
npm start
```

## API Integration
The frontend communicates with the backend API to perform various operations. The following services are used for API calls:
- AuthService: Handles user authentication and registration.
- PostService: Manages CRUD operations for posts.
- CommentService: Manages comments on posts.
- FollowService: Handles user follow/unfollow actions.
- LikeService: Manages likes on posts.
- SavedService: Handles saved posts functionality.

## Demo vedio
https://drive.google.com/file/d/1pIxlfLMCuK9icPKI5YDMFctlUBN3n2M8/view

## Contributing
Contributions are welcome! Please fork the repository and create a pull request to contribute to the project.


