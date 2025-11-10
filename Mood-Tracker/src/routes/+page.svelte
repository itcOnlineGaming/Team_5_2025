<script lang="ts">
	import { goto } from "$app/navigation";
    import PopupStart from "./popupStart.svelte";    
    import './styles.css';
    import { getAgreementStatus } from './consentAgreement';
    import { resetAnxietyFlowShown } from "$lib/stores/anxiety";

    function OnClickNavigate()
    {
        console.log("Confirm Button Clicked");
        if (getAgreementStatus())
            goto("/Homescreen", {noScroll:false});
        else
            alert("Agreement has not been accepted. Please accept the agreement to access the application");
    }

    function OnClickNavigateExitScreen()
    {
        console.log("Exit Screen Button Clicked");
        goto("/Exitscreen", {noScroll:false});
    }

    function resetAnxietyFlow()
    {
        console.log("Resetting Anxiety Flow");
        resetAnxietyFlowShown();
        alert("Anxiety flow has been reset. You will see it again on the next home screen visit.");
    }

</script>

<h1> Hello, please press continue to go to the Home Screen </h1>

<button on:click={OnClickNavigate}>Confirm</button>

<button on:click={OnClickNavigateExitScreen}>Exit Screen</button>

<button on:click={resetAnxietyFlow}>Reset Anxiety Flow</button>

<PopupStart></PopupStart>
