<script>
    import { Link } from "svelte-routing";
    import CityList from "../components/CityList.svelte";
    import RouteList from "../components/RouteList.svelte";
    import ScheduleList from "../components/ScheduleList.svelte";
    import BuyTicketPanel from "../components/BuyTicketPanel.svelte";
</script>

<div>
    <br>
    <h1>Home</h1>
    <p>Welcome to the home page.</p>
    <br>
    <CityList />
    <RouteList />
    <ScheduleList />
    <BuyTicketPanel />
</div>

<style>
    h1 {
        color: white;
    }
</style>