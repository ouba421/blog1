'use strict';

import mongoose from 'mongoose';
// import config from 'config-lite';
import chalk from 'chalk';
let dblink = "mongodb://localhost:27017/blog"
mongoose.connect(dblink);
// mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open' ,() => {
	console.log(
    chalk.green('连接数据库成功')
  );
})

db.on('error', function(error) {
    console.error(
      chalk.red('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', function() {
    console.log(
      chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(dblink, {server:{auto_reconnect:true}});
});

export default db;
