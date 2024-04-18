<script lang="ts">
	import { Link } from "svelte-routing";
	import { user } from "../context/userStore";

	let currentUser;
	user.subscribe((value) => (currentUser = value));

	function logout() {
		user.set(null);
	}
</script>

<nav class="nav">
	<Link to="/" style={'color: white'}><h2 class="logo">Logo</h2></Link>
	<div class="links">
		<Link to="/" style={"padding: .4rem;"}>Home</Link>
		<Link to="about" style={"padding: .4rem;"}>About</Link>
		{#if currentUser}
			<p>{currentUser.name}</p>
			<button on:click={logout} class="button">Logout</button>
		{:else}
			<Link to="login" style={"padding: .4rem;"}>Login</Link>
		{/if}
	</div>
</nav>

<style>
	.nav {
		display: flex;
		justify-content: space-between;
		align-self: center;
		width: 100vw;
		height: 60px;
		background: rgb(28, 26, 46);
	}
	.logo {
		margin: 0;
		padding: 0.4rem;
	}
	.links {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.4rem;
	}
</style>
