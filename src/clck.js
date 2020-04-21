const https = require('https');
let urlFromCL = process.argv.slice(2)[0];
const valid = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(urlFromCL);
const url = `https://clck.ru/--?json=on&url=${urlFromCL}`
if(valid) {
  https.get(url, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      if(JSON.parse(data)[1] === false)
        console.log(JSON.parse(data)[0]);
      else {
        console.log('Can\'t shorten link :(');
      }
    });
  })
}
else {
  console.log('Invalid link');
}