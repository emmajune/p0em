import NeoCities from 'neocities'
import {writeFile} from 'fs/promises'
import dotenv from 'dotenv'

dotenv.config()

export async function cache(htmlStr:string) {
  await writeFile('/tmp/cache.html', htmlStr)
  var api = new NeoCities(process.env.NEOCITIES_SITE, process.env.NEOCITIES_PW)
  api.upload([
    {name: 'cache.html', path: '/tmp/cache.html'}
  ], function(resp:any) {
    console.log(resp)
    return resp
  })

  return 'done!'
}

export default cache