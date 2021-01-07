require('dotenv').config();

const db = {};

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URI, { logging: false });
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
testConnection();
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Ride = require('./Ride.js')(sequelize, Sequelize);
db.City = require('./City.js')(sequelize, Sequelize);
db.User = require('./User.js')(sequelize, Sequelize);
db.Request = require('./Request.js')(sequelize, Sequelize);
db.Notification = require('./Notification.js')(sequelize, Sequelize);

module.exports = db;
