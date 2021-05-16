<script>
  import { stores } from "@sapper/app";
  import Error from "../routes/_error.svelte";
  import { onMount } from "svelte";

  export let data;

  const { session } = stores();
  const { TMDB_API_KEY } = $session;

  const type = "TV";
  let results = [];
  let nextPos = 0;
  let scroll;

  let selected = undefined;
  let options = [];

  const handleMouseWheel = (event) => {
    event.preventDefault();
    const max = window.innerWidth - scroll.getBoundingClientRect().width;
    const step = 220;
    if (event.deltaY > 0) {
      nextPos = scroll.getBoundingClientRect().x -= step;
    } else {
      nextPos = scroll.getBoundingClientRect().x += step;
    }
    if (nextPos > 0) {
      nextPos = 0;
    }
    if (nextPos <= max) {
      nextPos = max;
    }
  };

  const handleClick = (id) => {
    console.log(id);
  };

  const getTitle = (item) => {};

  const getQuery = (item) => {
    let s = `s${item.season_number.toString()}`;
    if (item.season_number < 10) {
      s = `s0${item.season_number}`;
    }

    let e = `s${item.episode_number.toString()}`;
    if (item.episode_number < 10) {
      e = `e0${item.episode_number}`;
    }

    return data.name;
  };

  const fetchSeason = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${data.id}/season/${selected.id}?api_key=${TMDB_API_KEY}`
    );
    const result = await response.json();
    nextPos = 0;
    if (response.ok) {
      results = result.episodes;
    } else {
      throw new Error(response.message);
    }
  };

  onMount(async () => {
    data.seasons.forEach((season) => {
      options.push({ id: season.season_number, text: season.name });
    });
    options = options;
    selected = options[0];
    fetchSeason();
  });
</script>

<div class="seasons">
  <!-- svelte-ignore a11y-no-onchange -->
  <select
    bind:value={selected}
    on:change={() => {
      fetchSeason();
    }}
  >
    {#each options as option}
      <option value={option}>
        {option.text}
      </option>
    {/each}
  </select>

  <div class="list-wrapper" on:mousewheel={handleMouseWheel}>
    <ul class="list" style="left: {nextPos}px" bind:this={scroll}>
      {#each results as item}
        <li>
          <a rel="prefetch" href="torrent/search/{type}/{getQuery(item)}">
            <img
              alt={item.id}
              src={`https://image.tmdb.org/t/p/w500${
                item.still_path ? item.still_path : data.poster_path
              }`}
            />
            <span>{item.name}</span>
          </a>
        </li>
      {:else}
        <p>loading...</p>
      {/each}
    </ul>
  </div>
</div>

<style>
  .list-wrapper {
    position: relative;
    width: 100%;
    overflow-x: hidden;
    height: 15rem;
  }

  .list {
    position: absolute;
    top: 0;
    display: grid;
    gap: 1rem;
    grid-auto-columns: 18.75rem;
    grid-auto-flow: column;
    padding: 1rem;
    height: 100%;
  }

  li {
    position: relative;
    box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.8);
    cursor: pointer;
    height: 12.5rem;
    overflow: hidden;
    border-radius: 0.3rem;
  }

  li a {
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    color: white;
  }

  li:hover img {
    transform: scale(1.2);
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    transition: all 0.5s;
  }

  span {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 1rem;
  }
</style>
