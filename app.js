const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const middleware = require("./utils/middleware");
const roomRouter = require("./controllers/rooms");
const config = require("./utils/config");
const app = express();

mongoose.connect(config.MONGODB_URI);
app.use(cors());
app.use(express.json())

app.use(roomRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);
module.exports = app;