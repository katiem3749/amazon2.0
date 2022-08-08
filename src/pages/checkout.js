import {
	selectItems,
	selectTotalQuantity,
	selectTotalAmount,
} from "../slices/basketSlice";

import CheckoutProduct from "../components/CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import Header from "../components/Header";
import Image from "next/image";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const stripePromise = loadStripe(process.env.stripe_publishable_key);

const Checkout = () => {
	const { data: session } = useSession();
	const items = useSelector(selectItems);
	const totalQuantity = useSelector(selectTotalQuantity);
	const totalAmount = useSelector(selectTotalAmount);

	const createCheckoutSession = async () => {
		const stripe = await stripePromise;
		const checkoutSession = await axios.post("/api/create-checkout-session", {
			items,
			email: session?.user?.email,
		});

		const result = await stripe.redirectToCheckout({
			sessionId: checkoutSession.data.id,
		});

		if (result.error) {
			alert(result.error.message);
		}
	};
	return (
		<div className="bg-gray-50">
			<Header />
			<main className="flex flex-col max-w-screen-2xl mx-auto">
				<Image
					src="/Prime-day-banner.png"
					width={1020}
					height={250}
					objectFit="contain"
				/>
				<div className="my-5 mx-20 shadow-sm flex-grow flex flex-row">
					<div className="flex flex-col pr-8">
						<div className="flex flex-col p-5 space-y-10 bg-white flex-grow ">
							<h1 className="text-3xl border-b  pb-5">
								{totalQuantity === 0
									? "Your Amazon Basket is empty"
									: "Shopping Basket"}
							</h1>
							{items.map((item, i) => (
								<CheckoutProduct key={i} item={item} />
							))}
						</div>
					</div>

					{items.length > 0 && (
						<div className="flex p-10 bg-white shadow-md ">
							<div className="pt-5">
								{totalAmount >= 35 && (
									<div className="whitespace-pre-line mb-5">
										<div className="text-xs">
											<p>Your order qualifies for FREE Shipping.</p>
											<p>Choose this option at checkout.</p>
										</div>
									</div>
								)}

								<h2 className="whitespace-nowrap">
									Subtotal {totalQuantity} item(s):
									<span className="text-bold">
										<CurrencyFormat
											value={totalAmount}
											displayType={"text"}
											thousandSeparator={true}
											prefix={"$"}
											decimalScale={2}
											renderText={(value) => <div>{value}</div>}
										/>
									</span>
								</h2>

								<button
									role="link"
									onClick={createCheckoutSession}
									disabled={!session}
									className={`button mt-2 ${
										!session &&
										"from-grey-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
									}`}>
									{!session ? "Sign in to checkout" : "Proceed to Checkout"}
								</button>
							</div>
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default Checkout;
