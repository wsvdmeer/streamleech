<script>
	export let segment;
</script>

<style>
	nav {
		font-weight: 300;
		padding: 0 1em;
		position: absolute;
		background-color:black;
		width:100%;
		color:white;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
		
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		color:white;
	}
</style>

<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
		<li><a aria-current="{segment === 'movies' ? 'page' : undefined}" href="movies">movies</a></li>
		<li><a aria-current="{segment === 'tv' ? 'page' : undefined}" href="tv">tv</a></li>
		<li><a aria-current="{segment === 'torrents' ? 'page' : undefined}" href="torrents">torrents</a></li>
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<!--li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li-->
	</ul>
</nav>
