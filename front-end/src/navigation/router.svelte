<script>
	import { Router, Route } from "svelte-routing";
	import { guestOnly, requireAuth } from "../utils/routeGuarding";

	import Home from "../pages/Home.svelte";
	import About from "../pages/About.svelte";
	import NavBar from "../components/NavBar.svelte";
	import Login from "../pages/Login.svelte";
	import Register from "../pages/Register.svelte";
    import MyTickets from "../pages/MyTickets.svelte";
</script>

<Router>
	<div class="container">
		<NavBar />
		<div class="imageBg">
			<div class="backDrop">
				<Route path="/" component={Home} />
				<Route path="/about" component={() => requireAuth(About)} />
				<Route path="/login" component={() => guestOnly(Login)} />
				<Route path="/register" component={() => guestOnly(Register)} />
                <Route path="/MyTickets" component={() => requireAuth(MyTickets)} />                    
			</div>
		</div>
	</div>
</Router>

<style>
    .container {
        position: relative;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    .imageBg {
        background-image: url("../assets/278855926_5292471437482045_8429924563172309906_n.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        height: calc(100% - 60px); /* Adjust this value based on the height of your NavBar */
        position: absolute;
        top: 60px; /* Adjust this value based on the height of your NavBar */
    }
    .backDrop {
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5));
        width: 100%;
        height: 100%;
        z-index: 1;
    }
</style>
