module.exports = function (sequelize, DataTypes) {
    const Prob = sequelize.define('Prob', {
        id : {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        question : {
            type: DataTypes.STRING,
            allowNull: false
        },
        probability : {
            type: DataTypes.BIGINT
        },
        fromNumber : {
            type: DataTypes.BIGINT
        },
        toNumber : {
            type: DataTypes.BIGINT
        },
        state : {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
    Prob.associate = _associate;
    return Prob;
}

// INTERNAL

function _associate(models) {
    models.Prob.belongsTo(models.User, {
        as : 'fromUser'
    });

    models.Prob.belongsTo(models.User, {
        as : 'toUser'
    });
}
