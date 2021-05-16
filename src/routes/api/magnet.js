import TorrentSearchApi from 'torrent-search-api'
export async function post(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    const data = req.body
    const magnet = await TorrentSearchApi.getMagnet(data)
    res.status = 200;
    return res.end(JSON.stringify(magnet))
    
  }