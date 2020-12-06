module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Like', {
        contentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'likes',
        underscored: true,
        timestamps: false
    });
};