const express = require("express");
let app = express();
const errorHandler = require('./middlewares/errorHandler')
const authRoute = require('./routes/authRoute')
const security = require('./security/security')


app.use(express.json());
app = security(app);
app.use("/api/v1", [authRoute]);
app.use(errorHandler);


module.exports = app;
