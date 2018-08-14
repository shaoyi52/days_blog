export function param2Obj(url){
  const search = url.split("?")[1]
  if(search){
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  }else{
    return {}
  }
}