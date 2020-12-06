module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        email: {
            type: DataTypes.STRING(50),
            unique: true,
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
        tableName: 'users',
        underscored: true,
        timestamps: false
    });
};