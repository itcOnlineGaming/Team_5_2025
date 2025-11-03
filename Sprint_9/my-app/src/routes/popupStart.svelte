<script>
    let showExitPopup = $state(false);

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
				<h2>[Entry Screen]</h2>
				<h3>"Hello and welcome our called; Mood Tracker!" 
				"Press the 'Continue' button to go to the Home Screen"</h3>

				<h2>[Home Screen]</h2>
				<h3>"Here you can view your 'Task List' and 'Mood Graph'
				"Try clicking on the 'Edit' button on your 'Mood Graph' to input your current mood!"
				"You can see your 'Mood' you have input appear on the 'Mood Graph' below"
				"Select the 'Exit' button to go to the Exit Screen"</h3>

				<h2>[Mood Screen]</h2>
				<h3>"Please select one of the circle to show how you are feeling"</h3>
					
				<h2>[Exit Screen]</h2>
				<h3>"Here are the results from this current session"</h3>

				<div class="button-group">
					<button onclick={closeStartPopup} class="btn-secondary">Close</button>
				</div>
			</div>
		</div>
	{/if}

    	<!-- Exit Button -->
	<button onclick={openStartPopup} class="exit-btn">
		View Information
	</button>