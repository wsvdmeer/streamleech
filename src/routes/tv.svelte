<script>
	import HorizontalList from '../components/HorizontalList.svelte';
</script>
<svelte:head>
	<title>TV</title>
</svelte:head>
<h1>TV</h1>
<h2>Popular</h2>
<HorizontalList type={'tv'} data={'/tv/popular'}/>
<h2>Top rated</h2>
<HorizontalList type={'tv'} data={'/tv/top_rated'}/>