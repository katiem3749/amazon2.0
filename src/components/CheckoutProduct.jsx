import {
	increaseByOne,
	reduceByOne,
	removeFromBasket,
} from "../slices/basketSlice";
import RateStar from "./util/RateStar";
import CurrencyFormat from "react-currency-format";
import Image from "next/image";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const CheckoutProduct = ({
	item: { id, title, price, rating, description, image, hasPrime, quantity },
}) => {
	const dispatch = useDispatch();

	const increaseOneUnit = () => {
		// push item into redux
		dispatch(increaseByOne({ id }));
	};

	const reduceOneUnit = () => {
		if (quantity === 1) {
			if (confirm("Are you sure to remove this item?")) {
				removeItem();
			}
		} else {
			dispatch(reduceByOne({ id }));
		}
	};

	const removeItem = () => {
		// remove item from redux by id
		dispatch(removeFromBasket({ id }));
		toast.success("Removed successfully!", {
			style: {
				border: "1px solid #ca3504",
				padding: "16px",
				color: "#ca3504",
			},
			iconTheme: {
				primary: "#ca3504",
				secondary: "#f2b6a2",
			},
		});
	};
	return (
		<div className="grid grid-cols-5">
			{/* left section */}
			<Image src={image} height={200} width={200} objectFit="contain" />

			{/* middle section */}
			<div className="col-span-3 mx-5">
				<p>{title}</p>
				<RateStar rate={rating.rate} count={rating.count} />
				<p className="text-xs my-2 line-clam-3">{description}</p>
				<CurrencyFormat
					value={price}
					displayType={"text"}
					thousandSeparator={true}
					prefix={"$"}
					// decimalScale={2}
					renderText={(value) => <div>{value}</div>}
				/>
				{hasPrime && (
					<div className="flex items-center space-x-2 ">
						<img src="/" className="w-12" loading="lazy" alt="" />
						<p className="text-xs text-gray-">Free Next Day Delivery</p>
					</div>
				)}
				<div className="flex space-x-12 mt-5 mx-auto">
					<div className="flex align-middle justify-around items-center  border-2 border-sky-500 rounded-sm w-20 ">
						<button className="" onClick={() => reduceOneUnit()}>
							-
						</button>
						<div className="inline grow px-2">{quantity}</div>
						<button className="" onClick={() => increaseOneUnit()}>
							+
						</button>
					</div>
				</div>
			</div>
			{/* right section - add / remove buttons */}
			<div className="flex flex-col space-y-2 my-auto justify-self-end">
				<button className="button " onClick={() => removeItem()}>
					Remove from Basket
				</button>
			</div>
		</div>
	);
};

export default CheckoutProduct;
