<nav>
    
</nav>

<script lang="ts">
	import { goto } from "$app/navigation";


    function OnClickNavigate()
    {
        console.log("Confirm Button Clicked");
        goto("/Homescreen", {noScroll:false});
    }

</script>

<h1>Home Screen</h1>

