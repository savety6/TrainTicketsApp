import Image from "next/image";
import TicketCard from "./(Components)/TicketCard";

export default function Home() {
	return (
		<div className="p-5 ">
			<h1>Home</h1>
			<Image
				src="/vercel.svg"
				alt="Vercel Logo"
				width={72}
				height={16}
			/>
			<div className="lg:grid grid-cols-2 xl:grid-cols-4">
				<TicketCard />
				<TicketCard />
				<TicketCard />
			</div>
		</div>
	);
}
