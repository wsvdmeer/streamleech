<script>
	import Nav from '../components/Nav.svelte';
	import Preloader from '../components/Preloader.svelte';
	import { fade } from "svelte/transition"
    import { stores } from "@sapper/app"
	export let segment;
	const { preloading } = stores();
	
</script>



<style>
	main {
		top:50px;
		left:0;
		position: absolute;
		width:100%;
		height: calc(100vh - 50px);
		display:block;
	
	}
</style>


<Preloader {preloading}/>
<main transition:fade>
	<slot ></slot>
</main>

<Nav {segment}/>