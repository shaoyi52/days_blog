import user from './user'
import news from './news'
import v1 from './v1'

export default app=>{
  app.use('/user', user);
  app.use('/v1', v1);
  app.use('/news', news);

}