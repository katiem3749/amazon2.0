import { useState } from "react";
import Menu from "./Menu";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const BottomNav = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	return (
		<>
			<div
				className={`flex fixed top-0 left-0 z-40 w-full h-full transform ease-in-out duration-300 ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}>
				<Menu />
				<div className="bg-gray-800 opacity-70 flex-1 text-white ">
					<XIcon
						className="w-10 h-10 mt-4 pl-3 link "
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					/>
				</div>
			</div>

			<div className="flex items-center bg-amazon_blue-light text-gray-100 text-md space-x-3 p-2 pl-6">
				<div
					className="flex link "
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
					<MenuIcon className="h-6 mr-1" />
					<p className="text-md">All</p>
				</div>
				<p className="link">Prime Video</p>
				<p className="link">Today&#39;s Deals</p>
				<p className="link">Amazon Business</p>
				<p className="hidden link lg:inline-flex">Electronics</p>
				<p className="hidden link lg:inline-flex">Food & grocery</p>
				<p className="hidden link lg:inline-flex">Books</p>
				<p className="hidden link lg:inline-flex">Toys</p>
				<p className="hidden link lg:inline-flex">Clothing</p>
				<p className="hidden link lg:inline-flex">Makeup</p>
			</div>
		</>
	);
};

export default BottomNav;
