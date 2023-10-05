const { users, posts } = require("../data");

const signUp = async (req, res) => {
  const { name, email } = req.body;

  const searchUser = await users.find((user) => user.email === email);

  if (!searchUser) {
    const validEmail = await (email.includes("@") && email.includes("."));
    if (validEmail) {
      const newUser = {
        user_id: `user_${users.length + 1}`,
        name,
        email,
      };

      users.push(newUser);
      console.log(users);

      res.status(200).json({
        status: 200,
        message: "User successfully created",
        data: {
          user_id: newUser.user_id,
          message: "Please remember the id",
        },
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Please enter a valid email",
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: "User is already registered",
    });
  }
};

const allUsers = async (req, res) => {
  const allUsers = [...users];

  if (allUsers.length) {
    res.status(200).json({
      data: {
        allUsers,
      },
    });
  }
};

const createPost = async (req, res) => {
  const { user_id, content } = req.body;

  const findUser = users.find((user) => user.user_id === user_id);

  if (!findUser) {
    res.status(404).json({
      status: 404,
      message: "User ID not found.",
    });
  } else if (!content) {
    res.status(400).json({
      status: 400,
      message: "Content cannot be empty.",
    });
  } else {
    const id = user_id.split("_")[1];
    const userPosts = posts.filter((post) => post.user_id === user_id);
    const newPost = {
      user_id,
      post_id: `u${id}${
        userPosts.length < 10
          ? `0${userPosts.length + 1}`
          : `${userPosts.length + 1}`
      }`,
      content,
    };

    posts.push(newPost);

    res.status(200).json({
      status: 200,
      message: "Successfully created.",
      data: {
        newPost,
      },
    });
  }
};

const deletePost = async (req, res) => {
  const { user_id, post_id } = req.params;

  const remPost = posts.filter((post) => post.post_id === post_id);
  // console.log(remPost);

  if (!remPost.length) {
    res.status(404).json({ status: 404, message: "Post ID not found." });
  }

  const remPosts = posts.filter((post) => post.user_id === user_id);
  // console.log(remPosts);

  const auth = remPosts.find((item) => item.user_id === remPost[0].user_id);
  // console.log(auth);

  if (auth) {
    const filteredList = posts.filter((item) => item.post_id !== post_id);
    res.status(200).json({
      status: 200,
      message: "Successful post deletion.",
    });
  } else {
    res.status(403).json({
      status: 403,
      message: "Unauthorized to delete this post.",
    });
  }
};

const fetchAllPostsByUser = async (req, res) => {
  const { user_id } = req.params;
  const findUserInPosts = posts.find((post) => post.user_id === user_id);

  if (findUserInPosts) {
    const allPosts = posts.filter((post) => post.user_id === user_id);
    if (allPosts) {
      res.status(200).json({
        status: 200,
        posts: allPosts,
      });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "No posts found for this user." });
    }
  } else {
    res.status(404).json({
      status: 404,
      message: "User ID not found.",
    });
  }
};

module.exports = {
  signUp,
  allUsers,
  createPost,
  fetchAllPostsByUser,
  deletePost,
};
