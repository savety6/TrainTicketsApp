<script lang="ts">
	import { onMount } from "svelte";
	import { SelectedCity } from "../context/Schedule";

    import { fetchCities } from "../lib/actions";

    import type { City } from "../Types";
    
	let cities: Array<City> = [];

	onMount(async () => {
		const data = await fetchCities();
		cities = data.cities;
	});

	function handleClick(city: City) {
		SelectedCity.set(city);
	}
</script>

<main>
	<h1>Cities</h1>
	<ul class="container">
		{#each cities as city}
			<button

				on:click={() => handleClick(city)}
				style="background-color: #{Math.floor(
					Math.random() * 16777215,
				).toString(16)}"
			>
				{city.name}
			</button>
		{/each}
	</ul>
</main>

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
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background-color: transparent;
        border: none;
        color: inherit;
        font: inherit;
        line-height: normal;
        overflow: visible;
        text-transform: none;
    }
    button:hover {
        transform: scale(1.05);
        transition: transform 0.2s;
    }
</style>
