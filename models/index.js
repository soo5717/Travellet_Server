const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 생성한 모델
db.User = require('./userModel')(sequelize, Sequelize);
db.Travel = require('./travelModel')(sequelize, Sequelize);
db.Plan = require('./planModel')(sequelize, Sequelize);
db.Budget = require('./budgetModel')(sequelize, Sequelize);
db.Expense = require('./expenseModel')(sequelize, Sequelize);
db.Like = require('./likeModel')(sequelize, Sequelize);

// 1: M 관계 User-Travel
db.User.hasMany(db.Travel);
db.Travel.belongsTo(db.User, {
  foreignKey: {
    name: 'user_id',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

// 1: M 관계 Travel-Plan
db.Travel.hasMany(db.Plan);
db.Plan.belongsTo(db.Travel, {
  foreignKey: {
    name: 'travel_id',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

// 1: M 관계 Plan-Budget
db.Plan.hasMany(db.Budget);
db.Budget.belongsTo(db.Plan, {
  foreignKey: {
    name: 'plan_id',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

// 1: M 관계 Plan-Expense
db.Plan.hasMany(db.Expense);
db.Expense.belongsTo(db.Plan, {
  foreignKey: {
    name: 'plan_id',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

// 1: M 관계 User-Like
db.User.hasMany(db.Like);
db.Like.belongsTo(db.User, {
  foreignKey: {
    name: 'user_id',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

module.exports = db;
