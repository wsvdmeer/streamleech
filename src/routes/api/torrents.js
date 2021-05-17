import WebTorrent from 'webtorrent'
import os from 'os'
import fs from 'fs'

const client = new WebTorrent()
const directory = `${os.tmpdir()}/webtorrent/`

export async function get(req, res, next) {

    //let files = []
    /* Initializes */
    //console.log(req)
    console.log(directory)
    res.setHeader('Content-Type', 'application/json')

    //check and resume
    if (fs.existsSync(directory)) {
        fs.readdir(directory, (err, files) => {
            if (!err) {
                files.forEach(file => {
                    const dirTorrent = client.get(file)
                    if (!dirTorrent) {
                        client.add(file, function (torrent) {
                            console.log('resume ' + torrent)
                        })
                    }
                })
            } else {
                console.log(err)
            }
        })
    }

    const torrent = client.torrents.reduce(function (array, data) {
        console.log(data);
        array.push({
          infoHash: data.infoHash,
          name: data.name,
          magnetUri: data.magnetURI,
          timeRemaining: data.timeRemaining,
          downloaded: data.downloaded,
          uploaded: data.uploaded,
          downloadSpeed: data.downloadSpeed,
          uploadSpeed: data.uploadSpeed,
          progress: data.progress,
          ratio: data.ratio,
          maxWebConns: data.maxWebConns,
          path: data.path,
          ready: data.ready,
          done: data.done
        })
        return array
      }, [])
      console.log(torrent)
     // console.log(client.torrents)
      return res.end(JSON.stringify(torrent))


}