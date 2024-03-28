# User Authentication with Node.js, Express, and MongoDB

This is a Node.js backend application that handles user authentication using JSON Web Tokens (JWT) and MongoDB as the database. It provides APIs for user registration, login, user data retrieval, and logout.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js
- MongoDB

## Getting Started

1. Clone the repository:

    ```
    git clone https://github.com/your-username/your-repo.git
    ```

2. Navigate to the project directory:

    ```
    cd your-repo
    ```

3. Install the dependencies:

    ```
    npm install
    ```

4. Create a `.env` file in the project root directory and add the following environment variables:

    ```
    DB=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret_key>
    SALT=<bcrypt_salt_rounds>
    PORT=<your_desired_port>
    ```

   Replace the placeholders with your actual values.

5. Start the server:

    ```
    npm start
    ```

   The server will start running on the specified port (or default to 3000 if not set).

## API Endpoints

### User Registration

- **URL:** `/api/signup`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "your-username",
    "email": "your-email@example.com",
    "password": "your-password",
    "firstName": "Your First Name",
    "lastName": "Your Last Name"
  }

### User Login

- **URL:** `/api/signin`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "your-email@example.com",
    "password": "your-password"
  }

### User Data Retrieval (Protected)

- **URL:** `/api/user`
- **Method:** `GET`
- **Authentication:** JWT token required (sent as a cookie named authToken)

---

### User Logout

- **URL:** `/api/logout`
- **Method:** `POST`
- **Authentication:** JWT token required (sent as a cookie named authToken)

---

### Dependencies

This project uses the following dependencies:

- **express:** Web application framework for Node.js
- **mongoose:** MongoDB object data modeling (ODM) library
- **bcrypt:** Library for hashing passwords
- **jsonwebtoken:** Library for generating and verifying JSON Web Tokens
- **cookie-parser:** Middleware for parsing cookies
- **body-parser:** Middleware for parsing request bodies
- **cors:** Middleware for configuring Cross-Origin Resource Sharing (CORS)
- **dotenv:** Library for loading environment variables from a .env file

---

### Contributing

Contributions are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request.

