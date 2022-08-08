import Banner from "../components/Banner";
import Head from "next/head";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";
import Footer from "../components/Footer";

export default function Home({ products }) {
	return (
		<div className="bg-gray-100">
			<Head>
				<title>Amazon Clone 2.0</title>
			</Head>

			<Header />
			<main className="max-w-screen-xl mx-auto">
				<Banner />

				<ProductFeed products={products} />
			</main>
			<Footer />
		</div>
	);
}
export const getServerSideProps = async (ctx) => {
	const session = await getSession(ctx); // await and return it as the props to remove glitches when refresh the pages
	const products = await fetch("https://fakestoreapi.com/products")
		.then((res) => res.json())
		.catch((err) => console.log(err.message));

	return {
		props: {
			products,
			session,
		},
	};
};
