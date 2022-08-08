import CurrencyFormat from "react-currency-format";
import moment from "moment";

const Order = ({ id, amount, amountShipping, items, timestamp, images }) => {
	return (
		<div>
			<div className="flex text-md mb-2">
				<p>Order on</p>
				<p className="ml-2">{moment.unix(timestamp).format("YYYY-MM-DD")}</p>
			</div>
			<div className="relative rounded-md border">
				<div
					className="flex content-center items-center space-x-10 p-5 bg-gray-50
				 text-gray-600">
					<div className="flex flex-col content-around flex-1">
						<div className="flex space-x-1 spce-y-3">
							<p className="font-bold mr-2">Total:</p>
							<CurrencyFormat
								value={amount}
								displayType={"text"}
								thousandSeparator={true}
								prefix={"$"}
								renderText={(value) => <div>{value}</div>}
							/>
							- Next Day Delivey
							<CurrencyFormat
								value={amountShipping}
								displayType={"text"}
								thousandSeparator={true}
								prefix={"$"}
								renderText={(value) => <div>{value}</div>}
							/>
						</div>
						<div className="py-10 sm:p-10 space-start">
							<div className="flex space-x-6 overflow-x-auto">
								{images?.map((image, id) => (
									<img
										key={id}
										src={image}
										alt=""
										loading="lazy"
										className="h-20 object-contain sm:h-32"
									/>
								))}
							</div>
						</div>
						<div className="ml-0">
							<p className="text-md whitespace-nowrap self-end text-left ">
								{items.length} items
							</p>
						</div>
					</div>
					<div className="flex flex-col">
						<p className="absolute top-2 right-2 w-40 truncate lg:w-72 text-xs whitespace-nowrap">
							Order #{id}
						</p>
						<div className="mt-10">
							<p className="orderedProduct">Track package</p>
							<p className="orderedProduct">View your Subscribe & Save</p>
							<p className="orderedProduct">Return items</p>
							<p className="orderedProduct">Share gift receipt</p>
							<p className="orderedProduct">Write a product review</p>
							<p className="orderedProduct">Archive order</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Order;
