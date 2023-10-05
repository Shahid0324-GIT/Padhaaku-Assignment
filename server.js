// Imports
const express = require("express");
const dotenv = require("dotenv");
const users = require("./routes/users");
const posts = require("./routes/posts");

// Environment variables init
dotenv.config();

// Initializing the app
const app = express();

// Handling the incoming url requests
app.use(express.json());

// Assigning the port for the server to listen on
const port = process.env.PORT;

//Api endpoints
app.use("/api/user", users);
app.use("/api/users/", posts);

// Initializing the server
app.listen(port, () => {
  console.log(`Server is running on Port:${port}`);
});
