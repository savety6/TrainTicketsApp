<script lang='ts'>
	import { SelectedRoute, SelectedSchedule } from "../context/Schedule";
	import { fetchScheduleByRouteId } from "../lib/actions";

	import type { Route, Schedule  } from "../Types";

    let schedules: Array<Schedule> = [];
	let selectedRoute: Route | null = null;
	SelectedRoute.subscribe((value) => (selectedRoute = value));

	$: if (selectedRoute !== null) {
		fetchScheduleByRouteId(selectedRoute._id).then((data) => {
			schedules = data.schedules;
		});
	}

	function handleClick(schedule: Schedule) {
	    SelectedSchedule.set(schedule);
	}

</script>

<div>
    <h1>Schedules</h1>
    <ul class="container">
        {#each schedules as schedule}
            <button
                on:click={() => handleClick(schedule)}
                style="background-color: #{Math.floor(
                    Math.random() * 16777215,
                ).toString(16)}"
            >
                {schedule.departureTime} - {schedule.arrivalTime}
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
    }
</style>
