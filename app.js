import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import middleware from "./utils/middleware";
import { roomRouter } from "./controllers/rooms";
const app = express();

mongoose.connect(config.MONGODB_URI);
app.use(cors());
app.use(express.json())

app.use(roomRouter);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);
module.exports = app;