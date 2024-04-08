import Image from "next/image";
import TicketCard from "./(Components)/TicketCard";

import type { TicketData } from "./(Types)";

interface TicketResponse {
	tickets?: TicketData[];
}

const getTickets = async (): Promise<TicketResponse | undefined> => {
	console.error("Tickets loaded successfully.");
	try {
		const res = await fetch("http://localhost:3000/api/Tickets", {
			cache: "no-store",
			method: "GET",
		});

		if (!res.ok) {
			throw new Error("Failed to fetch topics");
		}
		
		return res.json() as Promise<TicketResponse>;
	} catch (error) {
		console.log("Error loading topics: ", error);
	}
};

const Dashboard = async () => {
	const data = await getTickets();

	// Make sure we have tickets needed for production build.
	if (!data?.tickets) {
		return <p>No tickets.</p>;
	}

	const tickets = data.tickets;

	const uniqueCategories = [
		...new Set(tickets?.map(({ category }) => category)),
	];

	return (
		<div className="p-5">
			<div>
				{tickets &&
					uniqueCategories?.map((uniqueCategory, categoryIndex) => (
						<div key={categoryIndex} className="mb-4">
							<h2>{uniqueCategory}</h2>
							<div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
								{tickets
									.filter((ticket) => ticket.category === uniqueCategory)
									.map((filteredTicket, _index) => (
										<TicketCard
											id={_index}
											key={_index}
											ticket={filteredTicket}
										/>
									))}
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Dashboard;