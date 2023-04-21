import { getDb } from "../utils/db.js";
import { createJWToken } from "../utils/token.js";

const COL = "user";

export const signUp = async (req, res) => {
	const db = await getDb();
	if (await checkUser(req.body.user)) {
		await db.collection(COL).insertOne(req.body);
		res.end();
	} else {
		alert("username already in use");
		res.status(401).end();
	}
};

export const signIn = async (req, res) => {
	const db = await getDb();
	const response = await db
		.collection(COL)
		.findOne({ user: req.body.user, password: req.body.password });
	if (response === null) {
		alert("ooopsss... something went wrong");
		res.status(401).end();
	} else {
		const token = createJWToken({ user: response._id });
		res.cookie("access_token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		});
		res.end();
	}
};

export const logOut = async (_, res) => {
	return res.clearCookie("access_token").end();
};

const checkUser = async (user) => {
	const db = await getDb();
	const result = await db.collection(COL).findOne({ user });
	if (result === null) {
		return true;
	}
	return false;
};
