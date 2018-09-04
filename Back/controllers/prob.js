const config = require('./config');
const ModelIndex = require(config.models_path);
const Prob = ModelIndex.Prob;

const Op = ModelIndex.sequelize.Op;

const ProbController = function() { };


ProbController.add = function(from_user_id, to_user_id, question, probability, fromNumber, toNumber, state) {
    return Prob.create({
        from_user_id: from_user_id,
        to_user_id: to_user_id,
        question: question,
        probability: probability,
        fromNumber: fromNumber,
        toNumber: toNumber,
        state: state
    });
};

ProbController.delete = function(id) {
  return User.destroy({
    where: {
      id : id
    }
  });
}

ProbController.update = function(id, from_user_id, to_user_id, question, probability, fromNumber, toNumber, state) {
    return User.update({
        from_user_id: from_user_id,
        to_user_id: to_user_id,
        question: question,
        probability: probability,
        fromNumber: fromNumber,
        toNumber: toNumber,
        state: state
    },{
        where: {
          id : id
        }
    });
};


ProbController.getAll = function (id) {
    const options = {};
    const where = {};

    if( id !== undefined ) {
        where.id = {
            [Op.eq] : `${id}`
        };
    }
    options.where = where;
    return Prob.findAll(options);
};

// Export du controller
module.exports = ProbController;
