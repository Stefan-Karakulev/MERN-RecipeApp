import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// Just put the MongoDB URL and it will work the tokens dont have .env....
mongoose
    .connect("your URL")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Connection error:", error));

app.listen(3001, () => console.log("Server started"));