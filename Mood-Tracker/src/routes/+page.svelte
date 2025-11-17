<script lang="ts">
	import { goto } from "$app/navigation";
    import { base } from '$app/paths';
    import PopupStart from "./popupStart.svelte";    
    import './styles.css';
    import { getAgreementStatus } from './consentAgreement';

    function OnClickNavigate()
    {
        console.log("Confirm Button Clicked");
        if (getAgreementStatus())
            goto(`${base}/Homescreen`, {noScroll:false});
        else
            alert("Agreement has not been accepted. Please accept the agreement to access the application");
    }

    function OnClickNavigateExitScreen()
    {
        console.log("Exit Screen Button Clicked");
        goto(`${base}/Exitscreen`, {noScroll:false});
    }

</script>

<h1> Hello, please press continue to go to the Home Screen </h1>

<button on:click={OnClickNavigate}>Confirm</button>

<button on:click={OnClickNavigateExitScreen}>Exit Screen</button>

<PopupStart></PopupStart>
