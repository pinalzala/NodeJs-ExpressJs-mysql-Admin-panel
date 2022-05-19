const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};
var opts = {
   
}
initialize().then().catch();   

async function initialize() { 
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({host:host, user: user, database: database,password:password});
   
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    db.connection = connection;   
    // init models and add them to the exported db object
    db.Account = require('../accounts/account.model')(sequelize);
    db.Admin = require('../accounts/admin.model')(sequelize);
    db.Topwebsite=require('../accounts/topwebsite.model')(sequelize);
    db.Faq=require('../accounts/faq.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);
    db.Banner = require('../accounts/banner.model')(sequelize);
    db.Blog = require('../accounts/blog.model')(sequelize);
    db.Contact = require('../accounts/contactdata.model')(sequelize);
    db.Blogtag = require('../accounts/blogtag.model')(sequelize);
    db.Blogcat = require('../accounts/blogcat.model')(sequelize);

   
    db.Cms = require('../accounts/cms.model')(sequelize);
    db.Country = require('../accounts/country.model')(sequelize);
    db.State = require('../accounts/state.model')(sequelize);
    db.City = require('../accounts/city.model')(sequelize);
     

  //  console.log(db.Account);
    // define relationships
    
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);
    //db.Productpayment.belongsTo(db.Products);
    // sync all models with database 
    await sequelize.sync();

}