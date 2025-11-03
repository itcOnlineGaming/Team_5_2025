<!--- Exit Sceen -->
<script lang="ts">
	import { goto } from "$app/navigation";
    // Timer import
    import { onMount } from 'svelte';

    function OnClickNavigate()
    {
        console.log("Confirm Button Clicked");
        goto("/Homescreen", {noScroll:false});

    }

    // Test results:
    let session_results = 
    [
    { number: 1, description: 'Total Session Time', result: "1000" + " seconds" },
    { number: 2, description: 'Total Button Clicks', result: "100" + " clicks" },
    { number: 3, description: 'Mood Inputted', result: "2" },
    { number: 4, description: 'Incorrect input', result: "5" + " wrong clicks" },
    { number: 5, description: 'Mood Inputted', result: "2" }
    ];

</script>

<button on:click={OnClickNavigate}>Confirm</button>

<h2> Result Table </h2>

<table>
  <thead>
    <tr>
      <th>NO.</th>
      <th>DESCRIPTION</th>
      <th>RESULT</th>
    </tr>
  </thead>
  <tbody>
    {#each session_results as session_result}
      <tr>
        <td>{session_result.number}</td>
        <td>{session_result.description}</td>
        <td>{session_result.result}</td>
      </tr>
    {/each}
  </tbody>
</table>

<body> 
    <h1> Goodbye! </h1>
    
</body>


<style>
  table 
  {
    width: 100%;
    border-collapse: collapse;
  }
  th, td 
  {
    border: 1px solid #241414;
    padding: 0.5rem;
    text-align: left;
  }
  th 
  {
    background-color: #aaaaaa;
  }
  tr:nth-child(even) 
  {
    background-color: #d4d4d4;
  }
  body
  {
    background-color: rgb(240, 240, 240);
  }
  
</style>

