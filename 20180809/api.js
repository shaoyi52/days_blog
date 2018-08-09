import fetch from '../config/fetch'

/**
 *获取首页默认地址
 */
export const cityGuess=()=>fetch('/v1/cities',{
  type:'guess'
});

/**
 * 获取首页热门城市
 */
export const hotcity = ()=> fetch('/v1/cities',{
  type:'hot'
})


/**
 * 获取msite商铺列表
 */
export const shopList = (latitude,longitude,offset,restaurant_category_id='',restaurant_category_ids='',order_by = '',delivery_mode = '',support_ids = [])=>{
  let supportStr = '';
  support_ids.forEach(item => {
    if(item.status){
      supportStr+= '&support_ids[]=' + item.id;
    }
  })
  let data = {
      latitude,
      longitude,
      offset,
      limit:'20',
      'extras[]':'activities',
      keyword:'',
      restaurant_category_id,
      'restaurant_category_ids[]': restaurant_category_ids,
      order_by,
      'delivery_mode[]':delivery_mode + supportStr
  };
  return fetch('/shopping/restaurants',data);
}
