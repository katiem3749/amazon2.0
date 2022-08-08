import { SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import { selectTotalQuantity } from "../../slices/basketSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const TopNav = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const totalQuantity = useSelector(selectTotalQuantity);

	return (
		<div>
			{/* top nav */}
			<div className="flex items-center bg-amazon_blue p-1 flex-grow py-5">
				<div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
					<Image
						onClick={() => router.push("/")}
						src="/amazon_logo.png"
						width={160}
						height={40}
						objectFit="contain"
						className="cursor-pointer "
					/>
				</div>
				{/**Search */}
				<div className="hidden sm:flex items-center h-10 flex-grow cursor-pointer rounded-md bg-yellow-400 hover:bg-yellow-500">
					<input
						type="text"
						className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
						placeholder="This is a clone website for educational purposes only."
					/>
					<SearchIcon className="h-12 p-4" />
				</div>
				{/**Right */}
				<div className="text-gray-100  flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
					<div className="link " onClick={session ? signOut : signIn}>
						<p>Hello, {session ? session?.user?.name : "Sign In"}</p>
						<p className="font-extrabold md:text-sm">Account & Lists</p>
					</div>
					<div
						className=" link"
						// if session is not empty then push
						onClick={() => session && router.push("/orders")}>
						<p>Returns</p>
						<p className="font-extrabold md:text-sm">& Orders</p>
					</div>
					<div
						onClick={() => router.push("/checkout")}
						className="relative link flex items-center">
						<span className="absolute top-0 right-0 md:right-10 h-4 w-4 text-center rounded-full text-black font-bold bg-yellow-400">
							{totalQuantity}
						</span>
						<ShoppingCartIcon className="h-10 " />
						<p className="font-extrabold md:text-sm hidden md:inline mt-2">
							Basket
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopNav;
