<script lang="ts">
	import { goto } from "$app/navigation";
    import PopupStart from "./popupStart.svelte";    import './styles.css';
    import { getAgreementStatus } from './consentAgreement';

    function OnClickNavigate()
    {
        console.log("Confirm Button Clicked");
        if (getAgreementStatus())
            goto("/Homescreen", {noScroll:false});
        else
            alert("Agreement has not been accepted. Please accept the agreement to access the application");
    }


</script>

<h1> Hello, please press continue to go to the Home Screen </h1>

<button on:click={OnClickNavigate}>Confirm</button>

<PopupStart></PopupStart>
