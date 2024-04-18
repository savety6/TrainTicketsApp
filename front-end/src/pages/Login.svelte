<script>
    import { Link, navigate } from "svelte-routing";
    import { user } from "../context/userStore";

	let currentUser;
	user.subscribe((value) => (currentUser = value));

	let email = "";
	let password = "";

	function handleLogin() {
		// handle login logic here
		console.log(`Logging in user: ${email}, ${password}`);
        user.set({ name: 'John Doe', role: 'admin' });
        navigate('/');
	}
</script>

<main class="container">
	<h1>Login</h1>
	<form class="form" on:submit|preventDefault={handleLogin}>
		<label for="email">Email</label>
		<input id="email" type="email" bind:value={email} required />

		<label for="password">Password</label>
		<input id="password" type="password" bind:value={password} required />

		<button type="submit">Login</button>
        <p>
            Don't have an account?
            <Link to="register">Register</Link>
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