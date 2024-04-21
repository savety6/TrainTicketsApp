<script>
    import { Link } from "svelte-routing";
    import CityList from "../components/CityList.svelte";
    import RouteList from "../components/RouteList.svelte";
    import ScheduleList from "../components/ScheduleList.svelte";
</script>

<div>
    <br>
    <h1>Home</h1>
    <p>Welcome to the home page.</p>
    <br>
    <CityList />
    <RouteList />
    <ScheduleList />
</div>

<style>
    h1 {
        color: white;
    }
</style>