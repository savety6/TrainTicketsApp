<script>
	import { Link, navigate } from "svelte-routing";
	import { registerUser } from "../lib/actions";
	import { user } from "../context/userStore";
	import { parseJwt } from "../utils";

	let name = "";
	let email = "";
	let password = "";
	let confirm_password = "";
	let error = "";

	async function register() {
		// Check if passwords match
		if (password !== confirm_password) {
			error = "Passwords do not match";
			return;
		}
		const response = await registerUser({ name, email, password });
		if (response.status == "success") {
			user.set(parseJwt(response.token));
			localStorage.setItem("TrainTicketsApp-jwt", response.token);
			navigate("/");
		} else {
			error = response.message;
		}
	}
</script>

<main class="container">
	<h1>Register</h1>
	<form class="form" on:submit|preventDefault={register}>
		<label for="name">Name</label>
		<input id="name" bind:value={name} type="text" name="name" required />

		<label for="email">Email</label>
		<input
			id="email"
			bind:value={email}
			type="email"
			name="email"
			required
		/>

		<label for="password">Password</label>
		<input
			id="password"
			bind:value={password}
			type="password"
			name="password"
			required
		/>

		<label for="confirm_password">Confirm Password</label>
		<input
			id="confirm_password"
			bind:value={confirm_password}
			type="password"
			name="confirm_password"
			required
		/>

		<button type="submit">Register</button>
		<p>
			Already have an account?
			<Link to="login">Login</Link>
		</p>
		<p class="error">
			{error}
		</p>
	</form>
</main>

<style>
	.container {
		background: rgb(28, 26, 46);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		border-radius: 10px;
		box-shadow:
			0px 10px 20px rgba(0, 0, 0, 0.19),
			0px 6px 6px rgba(0, 0, 0, 0.23);
	}
	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
	input {
		padding: 0.5rem;
		border-radius: 5px;
		border: 1px solid rgb(44, 143, 180);
	}
	button {
		padding: 0.5rem 1rem;
		border: none;
		background: rgb(44, 143, 180);
		color: white;
		border-radius: 5px;
		cursor: pointer;
	}
	.error {
		color: red;
	}
</style>
