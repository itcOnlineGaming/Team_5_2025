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
				<h2>Hello, and welcome to our application called "Mood Tracker".</h2>
				<h5>
					In this app, you will be able to naviagte our different menus to access 
					different features we have implemented while developing this project.
					<p></p>
					In this application, you will be able to access and use the Task Screen, Mood Screen, Breathing Techniques, Yoga Exercises and the End Screen, 
					displaying all the data that we will have access to after you completed your testing.
				</h5>
				<p></p>
				<h3>User Tests</h3>
				<h5>
					When checking out our application, there are 2 tests that you can try and complete:
					<p></p>
					1. Edit the "Today's To-Do List" by removing a task, adding a task, updating a task name and ticking off a task.
					<p></p>
					2. Visit the "Mood Screen" and set your current mood to any of the 5 options.
				</h5>
				<p></p>
				<h3>Consent:</h3>
				<h5>
					By agreeing, we will be able to access any feedback you provide and  your results and performance from 
					your time using our application. This data is used to improve and further develop this application.
					Not agreeing will result in you not being able to access the application.
				</h5>

				<!--
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
				-->
				
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