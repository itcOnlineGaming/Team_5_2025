<nav>
    
</nav>

<script lang="ts">
	import { goto } from "$app/navigation";


    function OnClickNavigate()
    {
        console.log("Confirm Button Clicked");
        goto("/Homescreen", {noScroll:false});
    }

    function MoodScreen()
    {
        console.log("Confirm Button Clicked");
        goto("/MoodScreen", {noScroll:false});
    }
  

</script>

<h1> Hello, please press continue to go to the Home Screen </h1>

<button on:click={OnClickNavigate}>Confirm</button>

<h1>Home Screen</h1>

<button on:click={MoodScreen}>Mood screen</button>




