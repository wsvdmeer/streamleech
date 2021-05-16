<script context="module">
  export async function preload({ params }) {
    const [type, slug] = params.slug;
    const res = await this.fetch(`torrent/search/${type}/${slug}.json`);
    const data = await res.json();
    if (res.status === 200) {
      return { result: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { goto } from "@sapper/app";
  import {magnet} from '../../../stores';
  export let result;
  const getMagnet = async (item) => {
    const res = await fetch("api/magnet", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    magnet.set(data)
    goto(`torrent/download`);
  };
</script>

<svelte:head>
  <title>Torrent search</title>
</svelte:head>

<h1>Torrent search</h1>
<ul>
  {#each result as item}
    <li on:click={getMagnet(item)}>
      {item.title}
      {item.size}
    </li>
  {:else}
    <p>loading...</p>
  {/each}
</ul>
