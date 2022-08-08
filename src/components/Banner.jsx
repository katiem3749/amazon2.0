import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Banner = () => {
	return (
		<div className="relative">
			<div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />

			<Carousel
				autoPlay
				infiniteLoop
				showStatus={false}
				showIndicators={false}
				showThumbs={false}
				interval={3000}>
				<div>
					<img src="/carousel1.jpg" alt="" loading="lazy" />
				</div>
				<div>
					<img src="/carousel2.jpg" alt="" loading="lazy" />
				</div>
				<div>
					<img src="/carousel3.jpg" alt="" loading="lazy" />
				</div>
			</Carousel>
		</div>
	);
};

export default Banner;
