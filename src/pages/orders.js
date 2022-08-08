import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import Header from "../components/Header";
import Order from "../components/Order";
import db from "../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Orders = ({ orders }) => {
	const { data: session } = useSession();
	return (
		<div>
			<Header />
			<main className="max-w-screen-xl mx-auto p-10">
				<h1 className="text-3xl border-b mb-2 pb-1 border-gray-400">
					Your Orders
				</h1>
				{session ? (
					<h2>{0 || orders.length} Orders </h2>
				) : (
					<h2>Please login to see your orders</h2>
				)}
				<div className="mt-5 space-y-4">
					{orders?.map(
						({ id, amount, amountShipping, items, timestamp, images }) => (
							// create order component from the front end
							<Order
								key={id}
								id={id}
								amount={amount}
								amountShipping={amountShipping}
								items={items}
								timestamp={timestamp}
								images={images}
							/>
						)
					)}
				</div>
			</main>
		</div>
	);
};

export default Orders;

export const getServerSideProps = async (ctx) => {
	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

	// Get the users logged in credentials...
	const session = await getSession(ctx); // need wait otherwise a promise will try to access when it is not avaiable

	if (!session) {
		return {
			props: {},
		};
	}

	// setting up Firebase db for the front end
	//web version 9
	const ref = query(
		collection(db, `users/${session.user.email}/orders`),
		orderBy("timestamp", "desc")
	);
	const stripeOrders = await getDocs(ref);

	const orders = await Promise.all(
		stripeOrders.docs.map(async (order) => ({
			id: order.id,
			amount: order.data().amount,
			amountShipping: order.data().amount_shipping,
			images: order.data().images,
			timestamp: moment(order.data().timestamp.toDate()).unix(),
			items: (
				await stripe.checkout.sessions.listLineItems(order.id, {
					limit: 100,
				})
			).data,
		}))
	);

	return {
		props: {
			orders, // orders now come through the top Orders component as a prop and now we can map through the orders
		},
	};
};
