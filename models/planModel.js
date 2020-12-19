module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Plan', {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        place: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        memo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        transport: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        x: {
            type: DataTypes.DOUBLE
        },
        y: {
            type: DataTypes.DOUBLE
        }
    }, {
        tableName: 'plans',
        underscored: true,
        timestamps: false
    });
};