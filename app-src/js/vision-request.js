const APIKEY ='AIzaSyDfYbiGR61e-7JszDP_4i9xqZ03TozhGSA'
const endPoint = `https://vision.googleapis.com/v1/images:annotate?alt=json&key=${APIKEY}`
function createJson(base64){
  return {
    requests:{
      image:{
        content:base64
      },
      features:[
        {
          maxResults:10,
          type:'LABEL_DETECTION'
        }
      ]
    }
  }
}
module.exports = async function visionRequest(img){
  const json = await new Promise(res=>{
    const fl = new FileReader()
    fl.addEventListener('load', ev=>{
      const binStr = ev.target.result
      const base64 = btoa(binStr)
      const json = createJson(base64)
      res(json)
    })
    fl.readAsBinaryString(img)
  })
  const res = await fetch(endPoint, {
    method:'POST',
    body:JSON.stringify(json)
  })
  const resultJson = await res.json()
  return resultJson
}