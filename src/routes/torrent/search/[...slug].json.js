
import TorrentSearchApi from 'torrent-search-api'
TorrentSearchApi.enablePublicProviders()
export async function get(req, res, next) {
	const [type, slug] = req.params.slug;
	const query = slug+ ' x264 webrip';// add webrip
    const result = await TorrentSearchApi.search(query, type, 20)
	if(result){
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(result));
	}else{
		next();
	}
}