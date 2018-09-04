module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id : {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        surname : {
            type: DataTypes.STRING,
            allowNull: false
        },
        login : {
            type: DataTypes.STRING,
            allowNull: false
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
    User.associate = _associate;
    return User;
}

// INTERNAL

function _associate(models) {
}
