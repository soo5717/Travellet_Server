module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        pwd: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        timestamps: false,
        indexes: [{unique: true, fields: ['email']}]
    });
};