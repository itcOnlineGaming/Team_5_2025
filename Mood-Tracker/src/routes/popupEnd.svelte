<script>
	import { goto } from "$app/navigation";
    import { base } from '$app/paths';
    let showExitPopup = $state(false);

    function openExitPopup() {
		showExitPopup = true;
	}

	function closeExitPopup() {
		showExitPopup = false;
	}

	function OnClickNavigateExitScreen()
    {
        console.log("Exit Screen Button Clicked");
        goto(`${base}/Exitscreen`, {noScroll:false});
    }
</script>
    
    <!-- Exit Popup -->
	{#if showExitPopup}
		<div class="popup-overlay" role="dialog" aria-labelledby="exit-title">
			<div class="popup exit-popup">
				<h2 id="exit-title">Thank You for Testing!</h2>
				<p>We appreciate your time. Please answer these questions:</p>
				<div class="question">
					<label for="ease-of-use">How easy was the app to use? (1-5)</label>
					<input type="number" id="ease-of-use" min="1" max="5" />
				</div>
				<div class="question">
					<label for="feedback">Any additional feedback?</label>
					<textarea id="feedback" rows="3"></textarea>
				</div>
				<div class="button-group">
					<button onclick={closeExitPopup} class="btn-secondary">Close</button>
					<button onclick={OnClickNavigateExitScreen}>Submit</button>
				</div>
			</div>
		</div>
	{/if}

    	<!-- Exit Button -->
	<button onclick={openExitPopup} class="exit-btn">
		EXIT
	</button>