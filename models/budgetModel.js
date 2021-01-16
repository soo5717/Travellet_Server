module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Budget', {
        currency: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        priceKrw: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        memo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'budgets',
        underscored: true,
        timestamps: false
    });
};