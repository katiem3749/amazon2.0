import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const services = [
	{
		title: "Get to Know Us",
		subtitles: [
			"Careers",
			"Amazon Newsletter",
			"About Amazon",
			"Sustainability",
			"Press Center",
			"Investor Relations",
			"Amazon Devices",
			"Amazon Science",
		],
	},
	{
		title: "Make Money with Us",
		subtitles: [
			"Sell products on Amazon",
			"Sell apps on Amazon",
			"Supply to Amazon",
			"Become an Affiliate",
			"Become a Delivery Driver",
			"Start a package delivery business",
			"Advertise Your Products",
			"Self-Publish with Us",
			"Host an Amazon Hub",
			"See More Ways to Make Money",
		],
	},
	{
		title: "Amazon Payment Products",
		subtitles: [
			"Amazon Rewards Visa Signature Cards",
			"Amazon Store Card",
			"Amazon Secured Card",
			"Amazon Business Card",
			"Shop with Points",
			"Credit Card Marketplace",
			"Reload Your Balance",
			"Amazon Currency Converter",
		],
	},
	{
		title: "Let Us Help You",
		subtitles: [
			"Amazon and COVID-19",
			"Your Account",
			"Your Orders",
			"Shipping Rates & Policies",
			"Amazon Prime",
			"Returns & Replacements",
			"Manage Your Content and Devices",
			"Amazon Assistant",
			"Help",
		],
	},
];

export default function Footer() {
	const router = useRouter();

	return (
		<footer className="bg-amazon_blue-light text-gray-100">
			<div className="flex flex-col space-y-5 divide-y divide-gray-700 ">
				{/* top section */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 mx-auto space-x-5 ">
					{services.map((service, index) => {
						return (
							<div key={index} className="flex flex-col flex-wrap space-y-2">
								<p className="link font-bold text-lg text-gray">
									{service.title}
								</p>

								{service.subtitles.map((subtitle) => {
									return (
										<p key={JSON.stringify(subtitle)} className="link text-sm">
											{subtitle}
										</p>
									);
								})}
							</div>
						);
					})}
				</div>

				{/* bottom section */}
				<div className="pb-10 pt-5 flex items-center justify-center space-x-10 ">
					<span>
						<div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
							<Image
								onClick={() => router.push("/")}
								src="/amazon_logo.png"
								width={150}
								height={40}
								objectFit="contain"
								className="cursor-pointer "
							/>
						</div>
					</span>
					<span>
						<div className="space-x-5">
							<a href="">English</a>
							<a href="">United States</a>
						</div>
					</span>
				</div>
			</div>
		</footer>
	);
}
