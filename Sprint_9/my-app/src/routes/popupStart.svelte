<script lang="ts">
	import { acceptAgreement } from './consentAgreement';

    let showExitPopup = $state(false);

	function acceptedClicked() {
		acceptAgreement();
		closeStartPopup();
	}

    function openStartPopup() {
		showExitPopup = true;
	}

	function closeStartPopup() {
		showExitPopup = false;
	}
</script>
    
    <!-- Exit Popup -->
	{#if showExitPopup}
		<div class="popup-overlay" role="dialog" aria-labelledby="exit-title">
			<div class="popup exit-popup">

				<p>
					Hello, and welcome to our application called "Mood Tracker".
					In this app, you will be able to naviagte our different menus to access different features we have 
					implemented while developing this project.

					In this application, you will be able to access and use the Task Screen, Mood Screen and the End Screen, 
					displaying all the data that we will have access to after you completed your testing.

					Consent:
					By agreeing, we will be able to access any feedback you provide and  your results and performance from 
					your time using our application. This data is used to improve and further develop this application.
					Not agreeing will result in you not being able to access the application.
				</p>
				
				<div class="button-group">
					<button onclick={acceptedClicked} class="btn-primary">Accept Agreement</button>
					<button onclick={closeStartPopup} class="btn-secondary">Close</button>
				</div>
			</div>
		</div>
	{/if}

    	<!-- Exit Button -->
	<button onclick={openStartPopup} class="exit-btn">
		View Information
	</button>