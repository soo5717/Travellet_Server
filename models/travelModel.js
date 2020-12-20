module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Travel', {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        budget: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        sumBudget: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        sumExpense: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'travels',
        underscored: true,
        timestamps: false
    });
};