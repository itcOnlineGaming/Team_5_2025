<style>
    .confirmButtonID {
        background: rgba(50, 50, 250, 0.507);
    }
</style>

<script lang="ts">
    // type ConfirmButton = {
    //     label: string;
    // };

    // let confirmButton: ConfirmButton = {label: "Confirm"};

    let label: string = "Confirm";

    function sendFeedback() {
        label = "You are feeling quite great currently!";
    };
</script>

<!-- Button -->
<button class="confirmButtonID" on:click={sendFeedback}>
    {label}
</button>