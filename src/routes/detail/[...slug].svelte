<script context="module">
  export async function preload(page, session) {
    const { TMDB_API_KEY } = session;
    let [type, slug] = page.params.slug;
    const res = await this.fetch(
      `https://api.themoviedb.org/3/${type}/${slug}?api_key=${TMDB_API_KEY}`
    );
    const data = await res.json();
    if (res.status === 200) {
      return { result: data, type: type };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import HorizontalList from "../../components/HorizontalList.svelte";
  import Seasons from "../../components/Seasons.svelte";
  export let result;
  export let type;

  const getTitle = (item) => {
    switch (type) {
      case "movie":
        return item.title;
      case "tv":
        return item.name;
    }
  };
</script>

<svelte:head>
  <title>{getTitle(result)}</title>
</svelte:head>

<div class="detail">
  <img
    alt={result.id}
    src={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
  />
  <div class="info-wrapper">
	<div class="info">
		<div class="meta">
    		<h1>{getTitle(result)}</h1>
			<p>{result.overview}</p>
		</div>
	</div>
	{#if type === "tv"}
		<Seasons data={result} />
	{/if}
    <div class="footer">
      <h2>Recommendations</h2>
      <HorizontalList {type} data={`/${type}/${result.id}/recommendations`} />
    </div>
  </div>
</div>

<style>
  .detail {
    position: relative;
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }

  img {
    position: absolute;
    width: 100%;
    height: auto;
  }

  .info-wrapper {
    width: 100%;
    position: relative;
	display:grid;
	grid-template-rows: 100% auto auto;
  }

  .info{
	float:left;
	overflow: hidden;
	display: block;
	height:100%;
	padding:2rem;
  }

  .meta{
	  width:30%;

  }


  .footer{
	padding:1rem;
	width:100%;
  }
</style>
