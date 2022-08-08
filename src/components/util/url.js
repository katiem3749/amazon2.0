const dev = process.env.NODE_ENV !== "production";

export const url = dev
	? "http://localhost:3000"
	: "https://amazon2point0.vercel.app";
