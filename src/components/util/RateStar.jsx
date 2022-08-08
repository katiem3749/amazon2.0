import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";

import React from "react";

export default function RateStar({ rate, count }) {
	return (
		<>
			<div className="flex">
				{Array(Math.floor(rate))
					.fill()
					.map((_, i) => (
						<StarIconSolid
							key={i}
							className="w-[1.4rem] h-[1.4rem]  text-yellow-500"
						/>
					))}

				{Array(5 - Math.floor(rate))
					.fill()
					.map((_, i) => (
						<StarIconOutline key={i} className="w-5 h-5 text-yellow-400" />
					))}
				<p className="text-sm ml-2">{count}</p>
			</div>
		</>
	);
}
