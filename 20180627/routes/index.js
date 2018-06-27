import news from './news'

export default app=>{
  app.use('/news', news);
}