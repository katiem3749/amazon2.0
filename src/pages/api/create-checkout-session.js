import { url } from "../../components/util/url";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
	const { items, email } = req.body;
	const transformedItems = items.map((item) => ({
		description: item.description,
		quantity: item.quantity,
		price_data: {
			currency: "USD",
			product_data: {
				name: item.title,
				images: [item.image],
			},
			unit_amount: item.price * 100,
		},
	}));

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: transformedItems,
		mode: "payment",
		success_url: `${url}/success`,
		cancel_url: `${url}/checkout`,
		metadata: {
			// metadata is crucial b/c info needs to be pushed from stripe to firebase at the correct place
			email,
			images: JSON.stringify(items.map((item) => item.image)),
		},
		shipping_address_collection: {
			allowed_countries: ["US", "CA", "GB"],
		},
	});

	res.status(200).json({ id: session.id });
};

export default handler;
