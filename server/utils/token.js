import jwt from "jsonwebtoken";

export const createJWToken = (claim) => {
	const token = jwt.sign(claim, process.env.JWT_SECRET, { expiresIn: "1h" });
	return token;
};

export const verifyJWToken = (token) => {
	const verifcation = jwt.verify(token, process.env.JWT_SECRET);
	return verifcation;
};
