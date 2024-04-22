<script lang="ts">
	import { SelectedSchedule, SelectedRoute } from "../context/Schedule";
	import { user } from "../context/userStore";

    import { buyTicket } from "../lib/actions";

	import { calculateTicketPrice } from "../utils";
	import type { Schedule, Route, User, Ticket } from "../Types";

	let selectedSchedule: Schedule | null = null;
	SelectedSchedule.subscribe((value) => (selectedSchedule = value));

	let selectedRoute: Route | null = null;
	SelectedRoute.subscribe((value) => (selectedRoute = value));

	let currentUser: User | null = null;
	user.subscribe((value) => (currentUser = value));

    let massage = "";

    const handleBuyTicket = async () => {
        if (selectedRoute && selectedSchedule && currentUser) {
            const price = calculateTicketPrice(
                Number(selectedRoute.basePrice.$numberDecimal),
                selectedSchedule.departureTime,
                currentUser.discountCardStatus === "elderly",
                false,
                currentUser.discountCardStatus === "family",
            );
            const ticket: Ticket = {
                _id: "",
                userId: currentUser._id,
                title: selectedRoute.name,
                description: `${selectedSchedule.departureTime} - ${selectedSchedule.arrivalTime}`,
                status: "pending",
                price: price,
            };
            const ticketStatus = await buyTicket(ticket)
            if (ticketStatus.status === "success") {
                massage = "Ticket bought successfully";
            }else{
                massage = "Ticket buying failed";
            }
            setTimeout(() => {
                massage = "";
            }, 5000);
        }
    }
</script>

{#if selectedSchedule}
	<div class="container">
		<div>
			<h1>Buy Ticket {selectedRoute.name}</h1>
			<p>Departure Time: {selectedSchedule.departureTime}</p>
			<p>Arrival Time: {selectedSchedule.arrivalTime}</p>
			<p>Price: {selectedRoute.basePrice.$numberDecimal}</p>
			<p>Discount: {currentUser.discountCardStatus}</p>
		</div>
		<div>
			<h1>Price after discount:</h1>
			<p>{calculateTicketPrice(
                Number(selectedRoute.basePrice.$numberDecimal),
                selectedSchedule.departureTime,
                currentUser.discountCardStatus === "elderly",
                false,
                currentUser.discountCardStatus === "family",
            )} lv</p>
            <button on:click={handleBuyTicket}>Buy Ticket</button>
            <p>{massage}</p>
		</div>
	</div>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	h1 {
		color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	p {
		color: white;
	}
	button {
		padding: 1rem;
		margin: 0.5rem 0;
		border-radius: 0.5rem;
	}
	button:hover {
		background-color: #f0f0f0;
	}
</style>
