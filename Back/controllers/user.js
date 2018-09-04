const config = require('./config');
const ModelIndex = require(config.models_path);
const User = ModelIndex.User;

const Op = ModelIndex.sequelize.Op;

const UserController = function() { };


UserController.add = function(surname, login, password) {
    return User.create({
        surname: surname,
        login: login,
        password: password
    });
};

UserController.delete = function(id) {
  return User.destroy({
    where: {
      id : id
    }
  });
}

UserController.update = function(id, surname, login, password) {
    return User.update({
        surname: surname,
        login: login,
        password: password
    },{
        where: {
          id : id
        }
    });
};


UserController.getAll = function (id) {
    const options = {};
    const where = {};

    if( id !== undefined ) {
        where.id = {
            [Op.eq] : `${id}`
        };
    }
    options.where = where;
    return User.findAll(options);
};

// Export du controller
module.exports = UserController;
