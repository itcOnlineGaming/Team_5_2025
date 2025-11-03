<script lang="ts">
	import { goto } from "$app/navigation";
    import PopupStart from "./popupStart.svelte";
    import './styles.css';



    function OnClickNavigate()
    {
        console.log("Confirm Button Clicked");
        goto("/Homescreen", {noScroll:false});
    }

    function OnClickNavigateExitScreen()
    {
        console.log("Exit Screen Button Clicked");
        goto("/Exitscreen", {noScroll:false});
    }

</script>

<h1> Hello, please press continue to go to the Home Screen </h1>

<button on:click={OnClickNavigate}>Confirm</button>

<button on:click={OnClickNavigateExitScreen}>Exit Screen</button>

<PopupStart></PopupStart>
