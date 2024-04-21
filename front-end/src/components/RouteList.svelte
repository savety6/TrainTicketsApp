<script lang="ts">
	import { SelectedCity, SelectedRoute } from "../context/Schedule";
	import { fetchRoutes } from "../lib/actions";

	import type { Route, City } from "../Types";

	let routes: Array<Route> = [];
	let selectedCity: City | null = null;
	SelectedCity.subscribe((value) => (selectedCity = value));

	$: if (selectedCity !== null) {
		fetchRoutes(selectedCity._id).then((data) => {
			routes = data.routes;
		});
	}

	function handleClick(route: Route) {
		console.log(route);
        SelectedRoute.set(route);
	}
</script>

<div>
	<h1>Routes</h1>
	<ul class="container">
		{#each routes as route}
			<button
				on:click={() => handleClick(route)}
				style="background-color: #{Math.floor(
					Math.random() * 16777215,
				).toString(16)}"
			>
				{route.name}
			</button>
		{/each}
	</ul>
</div>

<style>
	h1 {
		color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	.container {
		background-color: rgba(10, 10, 10, 0.1);
		display: flex;
		flex-direction: row;
		list-style-type: none;
		padding: 10px;
		align-items: center;
		justify-content: space-around;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	button {
		padding: 1rem;
		margin: 0.5rem 0;
		border-radius: 0.5rem;
		width: 100%;
		text-align: left;
		border: none;
		background-color: white;
		color: black;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
	}
	button:hover {
		background-color: #f1f1f1;
	}
	button:active {
		background-color: #f1f1f1;
	}
</style>
