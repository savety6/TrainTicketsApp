<script lang="ts">
	import { onMount } from "svelte";
	import { user } from "../context/userStore";
	import {
		fetchDiscountCardsWaitingList,
		applyForDiscountCard,
		approvedDiscountCard,
		rejectDiscountCard,
	} from "../lib/actions";
	import type { User } from "../Types";

	let currentUser: User | null = null;
	user.subscribe((value) => (currentUser = value));

	let discountCardRequests = [];

	onMount(() => {
		console.log(currentUser);

		if (currentUser && currentUser.isAdmin) {
			fetchDiscountCardsWaitingList().then((data) => {
				discountCardRequests = data.discountCards;
			});
		}
	});

	async function applyCard(type: string) {
		await applyForDiscountCard(currentUser._id, type);
		currentUser.discountCardStatus = "waiting";
	}
	async function approveCard(userId: string) {
		await approvedDiscountCard(userId);
		discountCardRequests = discountCardRequests.filter(
			(card) => card.userId !== userId,
		);
	}
	async function rejectCard(userId: string) {
		await rejectDiscountCard(userId);
		discountCardRequests = discountCardRequests.filter(
			(card) => card.userId !== userId,
		);
	}
</script>

<div>
	{#if currentUser && currentUser.isAdmin}
		{#each discountCardRequests as card}
			<div>
				<p>Card ID: {card._id}</p>
				<p>Card Type: {card.userId}</p>
				<p>Card Status: {card.requestedDiscountCard}</p>
				<button
					class="okBtn"
					on:click={() => {
						approveCard(card.userId);
					}}>OK</button
				>
				<button
					class="cancelBtn"
					on:click={() => {
						rejectCard(card.userId);
					}}>Cancel</button
				>
			</div>
		{/each}
	{:else if currentUser.discountCardStatus === "none"}
		<button on:click={() => applyCard("family")}
			>Apply for a family discount card</button
		>
		<p>Apply for a family discount card to get 50% off on all tickets.</p>
		<button on:click={() => applyCard("elderly")}
			>Apply for a elderly discount card</button
		>
		<p>Apply for a elderly discount card to get 34% off on all tickets.</p>
	{:else if currentUser.discountCardStatus === "family"}
		<p>You are owner of family discount card!</p>
	{:else if currentUser.discountCardStatus === "elderly"}
		<p>You are owner of elderly discount card!</p>
	{:else if currentUser.discountCardStatus === "waiting"}
		<p>Your discount card request is waiting for approval.</p>
	{/if}
</div>

<style>
	.okBtn {
		background-color: green;
		color: white;
		border: none;
		padding: 0.5rem;
		margin: 0.5rem;
		border-radius: 0.5rem;
		cursor: pointer;
	}
	.cancelBtn {
		background-color: red;
		color: white;
		border: none;
		padding: 0.5rem;
		margin: 0.5rem;
		border-radius: 0.5rem;
		cursor: pointer;
	}
</style>
