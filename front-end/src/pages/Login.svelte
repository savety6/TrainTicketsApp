<script>
    import { Link, navigate } from "svelte-routing";
    import { user } from "../context/userStore";
    import { loginUser } from "../lib/actions";
	import { parseJwt } from "../utils";

	let currentUser;
	user.subscribe((value) => (currentUser = value));

	let name = "";
	let password = "";
    let error = "";

	async function handleLogin() {
        // Check if passwords match
		const response = await loginUser({ name, password });
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
	<h1>Login</h1>
	<form class="form" on:submit|preventDefault={handleLogin}>
		<label for="name">Email</label>
		<input id="name" type="text" name="name" bind:value={name} required />

		<label for="password">Password</label>
		<input id="password" type="password" name="password" bind:value={password} required />

		<button type="submit">Login</button>
        <p>
            Don't have an account?
            <Link to="register">Register</Link>
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
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23);
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
</style>