<script lang="ts">
	import { onMount } from "svelte";
	import { user } from "../context/userStore";
	import { fetchTickets, cancelTicket, updateTicket } from "../lib/actions";
	import type { Ticket, User } from "../Types";

    let massage = "";

	let currentUser: User | null = null;
	user.subscribe((value) => (currentUser = value));

	let tickets: Array<Ticket> = [];

        onMount(async () => {
    if (currentUser) {
        const data = await fetchTickets(currentUser._id);
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days, 24 hours, 60 minutes, 60 seconds, 1000 milliseconds

        data.tickets.forEach(ticket => {
            if (ticket.status !== "completed" && new Date(ticket.createdAt) < oneWeekAgo) {
                ticket.status = "completed";
                updateTicket(ticket);
            }
        });

        tickets = data.tickets;
    }
});

    const handleCancel = async (ticket: Ticket) => {
        const response = await cancelTicket(ticket._id);
        if (response.status === "success") {
            const data = await fetchTickets(currentUser._id);
			tickets = data.tickets;
        }else{
            massage = "Ticket cancel failed";
            setTimeout(() => {
                massage = "";
            }, 5000);
        
        }
    }
    const handleEdit = async(ticket: Ticket) => {
        if (ticket.status === "in-progress") {
            ticket.status = "completed";
        }
        if (ticket.status === "pending") {
            ticket.status = "in-progress";
        }
        const response = await updateTicket(ticket);
        if (response.status === "success") {
            const data = await fetchTickets(currentUser._id);
            tickets = data.tickets;
        }else{
            massage = "Ticket update failed";
            setTimeout(() => {
                massage = "";
            }, 5000);
        }
    }
</script>

<main>
	<h1>My ticket</h1>
	<p>Here you can see your ticket</p>
    {#if massage}
        <p class="error">{massage}</p>
    {/if}
	<br />
	<div class="grid-container">
		<div class="grid-item">
            <h2>Pending</h2>
			{#each tickets.filter(ticket => ticket.status === 'pending') as ticket}
				<div class="ticket">
					<h3>{ticket.title}</h3>
					<p>{ticket.description}</p>
					<p class="price">{ticket.price} lv</p>
					<p>{ticket.status}</p>
					<div>
						<button on:click={() => handleCancel(ticket)}>Cancel</button>
						<button on:click={() => handleEdit(ticket)}>Edit</button>
					</div>
				</div>
			{/each}
		</div>
        <div class="grid-item">
            <h2>Completed</h2>
			{#each tickets.filter(ticket => ticket.status === 'completed') as ticket}
				<div class="ticket">
					<h3>{ticket.title}</h3>
					<p>{ticket.description}</p>
					<p class="price">{ticket.price} lv</p>
					<p>{ticket.status}</p>
				</div>
			{/each}
		</div>
        <div class="grid-item">
            <h2>In Progress</h2>
			{#each tickets.filter(ticket => ticket.status === 'in-progress') as ticket}
				<div class="ticket">
					<h3>{ticket.title}</h3>
					<p>{ticket.description}</p>
					<p class="price">{ticket.price} lv</p>
					<p>{ticket.status}</p>
                    <div>
						<button on:click={() => handleEdit(ticket)}>Edit</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	h1 {
		color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	.grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }

    .grid-item {
        background-color: rgba(10, 10, 10, 0.1);
        padding: 10px;
        border-radius: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
	.ticket {
		background-color: rgba(10, 10, 10, 0.1);
		padding: 10px;
		margin: 10px;
		border-radius: 0.5rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	.price {
		color: green;
	}
    .error {
        color: tomato;

    }
</style>
