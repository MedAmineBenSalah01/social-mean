require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");
const createUsersAndPosts = require('./src/utils/script')

mongoose
  .connect(process.env.dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to the database");
    app.listen(process.env.PORT, () => {
      createUsersAndPosts()
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
