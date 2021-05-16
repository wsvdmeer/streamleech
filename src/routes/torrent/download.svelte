<script context="module">
  import { magnet } from "../../stores";
  export async function preload(page, session) {
    magnet.subscribe(async (value) => {
      if (value === "") {
        return this.redirect(302, "/");
      }
      const query = {
        magnet: value,
      };
      const res = await this.fetch("api/torrent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });
      const data = await res.json();
      console.log(data)
      if(res.status === 200){
        return { files: data };
      }else{
        this.error(res.status, data.message);
      }
    });
  }
</script>

<script>
   export let files;
</script>

<svelte:head>
  <title>Torrent download</title>
</svelte:head>

<h1>Torrent download</h1>
{#each files as item}
    <li>
      {console.log(item)}
      {item.title}
      {item.size}
    </li>
  {:else}
    <p>loading...</p>
  {/each}
