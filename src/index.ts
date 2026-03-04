import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import {cache} from './cache.ts'


export const config = {
  runtime: "edge",
};

//import { Worker } from "worker_threads";

// @ts-ignore
declare global {
  var fresh: any;
  var verbArr: [];
  var nounArr: [];
  var busy: boolean
}

console.log(JSON.stringify(process.env.NEOCITIES_SITE))

//const __dirname = path.dirname(__filename)

const app = express()

global.fresh = false
global.busy = false
// Home route - HTML

const worker = new Worker(new URL("./worker.ts", import.meta.url))
let firstTime = truee
worker.onmessage=(message:any)=>{
  console.log('yay!')
  global.fresh = message.data
  global.busy = false
  if (firstTime) {
    cache(message.data)
    firstTime = false
  }
}


app.get('/', async (req, res) => {
  res.header({'CDN-CACHE-CONTROL':'max-age=1, state-while-revalidate=9999999999999999999999', 'CACHE-CONTROL': ' max-age=1, state-while-revalidate=9999999999999999'})
  res.type('html')
  await new Promise((res)=>{setTimeout(()=>res('')), 1000})
    var html = global.fresh ? global.fresh : (await (await fetch('https://svrss.neocities.org/cache')).text())
    res.send(html.replace('IS_FRESH', global.fresh ? 'fresh' : 'stale'))
    res.end()
    //if (!global.busy) {
      worker.postMessage('refresh, please!')
    //}
    //genHtml()
  })







  
  // function apply(str, pos, func) {
  //     var doc = nlp(str);
  //     doc = doc.normalize('heavy');
  //     doc = doc[pos+'s']()[func]();
  //     return doc
  // } 

app.listen(8080)
//worker.postMessage('!!!')
export default app