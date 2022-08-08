import TopNav from "./navbar/TopNav";
import BottomNav from "./navbar/BottomNav";
import { Toaster } from "react-hot-toast";

const Header = () => {
	return (
		<header>
			<Toaster position="top-left" />
			<TopNav />
			<BottomNav />
		</header>
	);
};

export default Header;
