import { buffer } from "micro";
import * as admin from "firebase-admin";

// Secure a connect to FIREBASE from the backend
const serviceAccount = require("../../../permissions.json");

//  chech if app exists to ensure app is not declare twice
const app = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
	  })
	: admin.app();

// Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
	// console.log("Fulfilling order", session);
	return app
		.firestore()
		.collection("users")
		.doc(session.metadata.email)
		.collection("orders")
		.doc(session.id)
		.set({
			amount: session.amount_total / 100,
			amount_shipping: session.total_details.amount_shipping / 100,
			images: JSON.parse(session.metadata.images),
			timestamp: admin.firestore.FieldValue.serverTimestamp(), // locationwise, we need to use syncranized time
		})
		.then(() => {
			// console.log(session);
			console.log(process.env.NODE_ENV);
			console.log(`SUCCESS:Order ${session.id} had been added to the DB`);
		});
};

export default async (req, res) => {
	if (req.method === "POST") {
		// pull the buffer to generate the certificate before micro package
		const requestBuffer = await buffer(req);
		const payload = requestBuffer.toString();
		const sig = req.headers["stripe-signature"]; //extract signature

		let event;
		// Verify that the EVENT posted came from Stripe (as anyone can send info to us)
		try {
			event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
			console.log("webhook verified");
		} catch (err) {
			console.log("ERROR", err.message);
			res.status(400).send(`Webhook error: ${err.message}`);
			return;
		}

		// Handle the checkout.session.completed event
		if (event.type === "checkout.session.completed") {
			const session = event.data.object;

			// Fulfill the order
			return fulfillOrder(session)
				.then(() => res.status(200).end())
				.catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
		}
		res.json({ received: true });
	}
};

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
