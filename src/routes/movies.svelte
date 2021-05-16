<script>
	import HorizontalList from '../components/HorizontalList.svelte';
</script>
<svelte:head>
	<title>Movies</title>
</svelte:head>
<h1>Movies</h1>
<h2>Popular</h2>
<HorizontalList type={'movie'} data={'/movie/popular'}/>
<h2>Top rated</h2>
<HorizontalList type={'movie'} data={'/movie/top_rated'}/>