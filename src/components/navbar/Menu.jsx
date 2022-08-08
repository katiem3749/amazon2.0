import React from "react";
import { useSession } from "next-auth/react";
import { UserCircleIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/outline";
export default function Menu() {
	const { data: session } = useSession();

	return (
		<div className="flex flex-col bg-gray-100 text-black  space-y-15 ">
			<div className="flex bg-amazon_blue-light text-white px-9 py-3">
				<UserCircleIcon className="w-8 h-8" />
				<div className="ml-2  text-xl text-left font-bold ">
					<h3>Hello, {session ? session.user.name : "Guest"}</h3>
				</div>
			</div>
			<div className="divide-y divide-slate-700 text-left text-base px-10 space-y-4 ">
				<div className="space-y-5">
					<p className="link mt-3">Trending</p>
					<p className="link">Best Seller</p>
					<p className="link">New Release</p>
				</div>
				<div className="space-y-5">
					<p className="link mt-3">Shop By Department</p>
					<p className="link">Clothing, Shoes, Jewlwey & Watches</p>
					<p className="link">Amazon Fresh</p>
					<p className="link">Movies, Music & Games</p>
					<p className="link flex">
						See All
						<ChevronDownIcon className="w-6 h-6 ml-2" />
					</p>
				</div>
				<div className="space-y-5">
					<p className="link mt-3">Help & Settings</p>
					<p className="link">Your Account</p>
					<p className="link">Chat with Us</p>
					<p className="link">Sign Out</p>
				</div>
			</div>
		</div>
	);
}
