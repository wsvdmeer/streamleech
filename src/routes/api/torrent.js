import WebTorrent from 'webtorrent'
const client = new WebTorrent()
export async function post(req, res, next) {
    /* Initializes */
    //console.log(req)
    res.setHeader('Content-Type', 'application/json')
    /* Retrieves the data */
    const data = req.body
    const magnet = data.magnet;
    const files = []
    client.on('error', function (err) {
      return res.end()
    })


    client.torrents.forEach((torrent)=>{

    });

    const torrent = client.get(magnet);
  
    //TODO if (magnet.match(/magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32}/i) === null) {}
    if(torrent){
      console.log(`GET ${magnet}`)
      torrent.files.forEach(function (file) {
        files.push({
          hash: torrent.infoHash,
          name: file.name,
          length: file.length
        })
        
      })
      res.status = 200;
      return res.end(JSON.stringify(files))
    }else{
      console.log(`ADD ${magnet}`)
      client.add(magnet, function (torrent) {
        torrent.files.forEach(function (file) {
          files.push({
            hash: torrent.infoHash,
            name: file.name,
            length: file.length
          })
         
        })
        res.status = 200;
        return res.end(JSON.stringify(files))
      });
      
    }
  }