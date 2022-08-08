module.exports = {
	images: {
		domains: ["fakestoreapi.com"],
	},
	env: {
		stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
	},
};
