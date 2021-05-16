<script>
  import { stores } from "@sapper/app";
  import Error from "../routes/_error.svelte";
  import { onMount } from "svelte";

  export let data;
  export let type;

  const { session } = stores();
  const { TMDB_API_KEY } = $session;

  let results = []
  let nextPos = 0;
  let scroll;


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
  }

  const handleClick = (id) => {
    switch(type){
      case 'movie':
        break;
      case 'tv':
        break;
    }
    console.log(id)
  }

  const getTitle = (item)=>{
    switch(type){
      case 'movie':
        return item.title;
      case 'tv':
      return item.name;
    }
  }

  onMount(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3${data}?api_key=${TMDB_API_KEY}`
    );
    const result = await response.json();
    if(response.ok){
      results = result.results;
    }else{
      throw new Error(response.message);
    }
  });
</script>

<div>
  <div class="list-wrapper" on:mousewheel={handleMouseWheel}>
    <ul class="list" style="left: {nextPos}px" bind:this={scroll}>
      {#each results as item}
      <li>
        <a rel="prefetch" href="detail/{type}/{item.id}">
          <img
            alt={getTitle(item)}
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          />
          <span>{getTitle(item)}</span>
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
    height: 21.25rem;
  }

  .list {
    position: absolute;
    top: 0;
    display: grid;
    gap: 1rem;
    grid-auto-columns: 12.5rem;
    grid-auto-flow: column;
    padding: 1rem;
    height: 100%;
  }

  li {
    position: relative;
    box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.8);
    cursor: pointer;
    height: 18.75rem;
    overflow: hidden;
    border-radius: 0.3rem;
    background-color:black;
  }

  li a{
    width:100%;
    height:100%;
    position: absolute;
    display:block;
    color:white;
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

  span{
    position: absolute;
    bottom:0;
    left:0;
    padding:1rem;
  }
</style>
