
<script>
	import HorizontalList from '../components/HorizontalList.svelte';
</script>
<style>
</style>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<h1>Dashboard</h1>
<h2>Movies</h2>
<HorizontalList type={'movie'} data={'/movie/popular'}/>
<h2>Tv</h2>
<HorizontalList type={'tv'} data={'/tv/popular'}/>

