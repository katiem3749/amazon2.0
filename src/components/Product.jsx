import CurrencyFormat from "react-currency-format";
import Image from "next/image";
import { increaseByOne } from "../slices/basketSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import RateStar from "./util/RateStar";
import toast from "react-hot-toast";

const Product = ({
	id,
	title,
	rating,
	price,
	description,
	category,
	image,
}) => {
	const dispatch = useDispatch();
	const addItemtoBasket = () => {
		// the props to be added to the basket.
		const product = {
			id,
			title,
			rating,
			price,
			description,
			category,
			image,
		};
		// sending the product (props) as an action to the REDUX store (the basket slice)

		try {
			dispatch(increaseByOne(product));
			toast.success("Added Successfully!", {
				style: {
					border: "1px solid #ca8a04",
					padding: "16px",
					color: "#ca8a04",
				},
				iconTheme: {
					primary: "#ca8a04",
					secondary: "#f5d490",
				},
			});
		} catch (error) {
			toast.error("Something went wrong!");
		}
	};
	const [hasPrime] = useState(Math.random() < 0.5);

	return (
		<div className="relative flex flex-col m-5 bg-white z-30 p-10">
			<p className="absolute top-2 right-2 text-xs italic text-gray-400">
				{category}
			</p>

			<Image src={image} height={200} width={200} objectFit="contain" />

			<h4 className="my-3 ">{title}</h4>
			<RateStar rate={rating.rate} count={rating.count} />
			<p className="text-xs my-2 line-clamp-2">{description}</p>

			<div className="mb-5">
				<CurrencyFormat
					value={price}
					displayType={"text"}
					thousandSeparator={true}
					prefix={"$"}
					renderText={(value) => <div>{value}</div>}
				/>
			</div>
			{hasPrime && (
				<div className="flex items-center space-x-2 -mt-5">
					<img
						src="/prime-tag.png"
						alt="Prime Delivery"
						className="w-12"
						loading="lazy"
					/>
					<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
				</div>
			)}

			<button className="mt-auto button" onClick={() => addItemtoBasket()}>
				Add to Basket
			</button>
		</div>
	);
};

export default Product;
