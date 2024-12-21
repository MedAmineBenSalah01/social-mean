const express = require("express");
const errorHandler = require('./middlewares/errorHandler')
const authRoute = require('./routes/authRoute')
const friendsRoute = require('./routes/friendsRoute')
const postRoute = require('./routes/postRoute')
const security = require('./security/security');

let app = express();


app.use(express.json());
app = security(app);
app.use(errorHandler);

app.use("/api/v1", [authRoute,friendsRoute,postRoute]);



module.exports = app;
