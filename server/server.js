import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./config/config.js";
import { logOut, signIn, signUp } from "./controller/userController.js";
import {
	encryptPassword,
	verifyJWTCookie,
} from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

//sign-up and sign-in
app.post("/api/v1/signup", encryptPassword, signUp);
app.post("/api/v1/signin", encryptPassword, signIn);

//logout
app.get("/api/v1/logout", verifyJWTCookie, logOut);

app.listen(PORT, () => console.log("Server running on port", PORT));
