<script lang="ts">
  import { petStats } from '$lib/stores/gameState';
  
  $: stats = $petStats;
</script>

<div class="progress-container">
  <div class="vertical-bars">
    <div class="progress-bar">
      <label>PET GROWTH</label>
      <div class="bar-fill" style="height: {stats.growth}%"></div>
    </div>
    
    <div class="progress-bar">
      <label>DAILY QUOTA</label>
      <div class="bar-fill daily" style="height: {Math.min(100, (stats.growth / 3))}%"></div>
    </div>
  </div>
  
  <div class="horizontal-meters">
    <div class="meter hunger">
      <span>Hunger Metre</span>
      <div class="meter-fill" style="width: {stats.hunger}%">
        <span class="meter-text">{stats.hunger}/100</span>
      </div>
    </div>
    
    <div class="meter sleep">
      <span>Sleep Metre</span>
      <div class="meter-fill" style="width: {stats.sleep}%">
        <span class="meter-text">{stats.sleep}/100</span>
      </div>
    </div>
    
    <div class="meter hygiene">
      <span>Hygiene Metre</span>
      <div class="meter-fill" style="width: {stats.hygiene}%">
        <span class="meter-text">{stats.hygiene}/100</span>
      </div>
    </div>
    
    <div class="meter entertainment">
      <span>Entertainment Metre</span>
      <div class="meter-fill" style="width: {stats.entertainment}%">
        <span class="meter-text">{stats.entertainment}/100</span>
      </div>
    </div>
  </div>
</div>

<style>
  .progress-container {
    display: flex;
    gap: 20px;
    padding: 20px;
  }

  .vertical-bars {
    display: flex;
    gap: 10px;
  }

  .progress-bar {
    width: 40px;
    height: 200px;
    background: linear-gradient(to top, #8B4513 0%, #D2691E 50%, #FFD700 100%);
    border-radius: 20px;
    position: relative;
    border: 3px solid #654321;
  }

  .bar-fill {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(to top, #228B22, #FFFF00);
    border-radius: inherit;
    transition: height 0.5s ease;
  }

  .horizontal-meters {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .meter {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .meter span {
    min-width: 150px;
    font-weight: bold;
  }

  .meter-fill {
    height: 30px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    transition: width 0.5s ease;
  }

  .hunger .meter-fill { background: linear-gradient(90deg, #FF4500, #FFA500); }
  .sleep .meter-fill { background: linear-gradient(90deg, #4B0082, #9932CC); }
  .hygiene .meter-fill { background: linear-gradient(90deg, #00CED1, #87CEEB); }
  .entertainment .meter-fill { background: linear-gradient(90deg, #FF1493, #FF69B4); }
</style>