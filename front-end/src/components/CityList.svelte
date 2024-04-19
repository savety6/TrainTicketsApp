<script lang="ts" >
    import { onMount } from 'svelte';

    const cities: Array<any> = [];

    const fetchCities = async () => {
        const response = await fetch('http://localhost:3000/cities');
        const data = await response.json();
        cities.push(...data);
    }
</script>

<main></main>

<style></style>