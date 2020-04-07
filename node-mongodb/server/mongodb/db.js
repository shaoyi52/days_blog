import mongoose from 'mongoose';

const DB_URL='mongodb://localhost:27017/test'

const db=mongoose.createConnection(DB_URL);

db.on('connected',function () {
    console.log('mongoose connection open to '+DB_URL)
})

db.on('error', function(error) {
    console.error(
      'Error in MongoDb connection: ' + error
      //chalk.red('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', function() {
    console.log(
      '数据库断开，重新连接数据库'
      //chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(DB_URL, {server:{auto_reconnect:true}});
});
