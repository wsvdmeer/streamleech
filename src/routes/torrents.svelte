<script>
	import { onMount } from "svelte";
	let files = [];
  
	onMount(async () => {
	  const res = await fetch("api/torrents");
	  const data = await res.json();
	  console.log(data);
	  if (res.ok) {
		files = data;
	  } else {
		throw new Error(res.message);
	  }
	});
  </script>
  
  <svelte:head>
	<title>Torrents</title>
  </svelte:head>
  
  <h1>Torrents</h1>
  
  {#each files as item}
	<li>
	  {item.name}
	  {item.hash}
	</li>
  {:else}
	<p>loading...</p>
  {/each}