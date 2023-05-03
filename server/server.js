import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import "./config/config.js";
import { logOut, signIn, signUp } from "./controller/userController.js";
import {
	encryptPassword,
	verifyJWTCookie,
} from "./middleware/authMiddleware.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: { origin: "http://localhost:5173" },
});
const PORT = process.env.PORT || 3001;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

app.get("/");

io.on("connection", (socket) => {
	console.log("a user connected");
	socket.join("Lobby");
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

//sign-up and sign-in
app.post("/api/v1/signup", encryptPassword, signUp);
app.post("/api/v1/signin", encryptPassword, signIn);

//logout
app.get("/api/v1/logout", verifyJWTCookie, logOut);

httpServer.listen(PORT, () => console.log("Server running on port", PORT));

/* const io = new Socket(app.listen(PORT));

io.on("connection", (socket) => {
	console.log("socket connected", socket);
}); */
