<script lang="ts">
</script>

<svelte:head>
    <link rel="icon" href="/favicon.svg" />
</svelte:head>

<div class="container">
    <aside class="sidebar left">
        <h2>PET GROWTH</h2>
        <div class="pet-growth-bar"></div>
        <!-- Add pet icons here -->
    </aside>
    <main>
        <nav class="room-nav">
            <button class="active">Kitchen</button>
            <button disabled>Living Room</button>
            <button disabled>Bathroom</button>
            <button disabled>Bedroom</button>
            <button disabled>Outside</button>
        </nav>
        <slot />
    </main>
    <aside class="sidebar right">
        <h2>DAILY QUOTA</h2>
        <div class="quota-bar"></div>
    </aside>
</div>

<style>
.container {
    display: flex;
    height: 100vh;
    background: #a56a2a;
}
.sidebar {
    width: 120px;
    background: #7a4a1e;
    color: #fff;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.sidebar.right {
    align-items: flex-start;
}
.pet-growth-bar, .quota-bar {
    width: 30px;
    height: 200px;
    background: linear-gradient(to top, #b6f7a7 60%, #f77a7a 40%);
    border-radius: 16px;
    margin: 1rem 0;
}
.room-nav {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
}
.room-nav button {
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    border: none;
    background: #f7c6c6;
    color: #333;
    font-weight: bold;
    cursor: pointer;
}
.room-nav button.active {
    background: #f7a56a;
}
.room-nav button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: #fffbe6;
}
</style>