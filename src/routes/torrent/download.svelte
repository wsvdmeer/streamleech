<script>
  import { goto } from "@sapper/app";
  import { magnet } from "../../stores";
  import { onMount } from "svelte";
  let files = [];
  let current;
  magnet.subscribe(async (value) => {
    if (value === "") {
      //return this.redirect(302, "/");
      goto("/");
    }
    current = value;
  });

  onMount(async () => {
    console.log("value", current);

    const query = {
      magnet: current,
    };
    const res = await fetch("api/torrent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    });
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
  <title>Torrent download</title>
</svelte:head>

<h1>Torrent download</h1>

{#each files as item}
  <li>
    {item.name}
    {item.hash}
  </li>
{:else}
  <p>loading...</p>
{/each}
