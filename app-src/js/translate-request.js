const endPoint = 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyDfYbiGR61e-7JszDP_4i9xqZ03TozhGSA'
function createBody(txt){
  return JSON.stringify({
    q:txt,
    target:'ja',
    source:'en',
    format:'text',
    model:'base'
  })
}
module.exports = async s=>{
  try{
    const res = await fetch(endPoint, {
      method:'POST',
      body:createBody(s),
    })
    const result = await res.json()
    console.log(result)
    const {data:{translations:[{translatedText}]}} = result
    return translatedText
  }catch(e){
    
  }
}