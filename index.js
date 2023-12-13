// import express from 'express' we will do it if we done like type module in package.json
// const express = require('express'); while using common.js from package.json
// u came? tell what is errorsee in the terminal server is not running. everything is dokneand in the deployment part that server is not running

import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/users.js";
import questionRouter from "./routes/Question.js";
import answerRoutes from "./routes/Answers.js";
import connectDB from "./Config/db.js";

dotenv.config();
const corsOptions = {
  // origin: 'http://localhost:3000',
  Credential: true,
  // optionSuccessStatus: 200
}

app.use(cors(corsOptions));

// connectDB();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/user", userRouter);
app.use("/questions", questionRouter);
app.use("/answer", answerRoutes);

const DATABASE_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err));
