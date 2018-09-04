const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const ProbController = require(config.controllers.prob_path);


const probRouter = express.Router();
probRouter.use(bodyParser.json());


probRouter.get('/:id?', function(req, res) {
    // Récupération des parametres
    const id = req.params.id;
    // On appelle la methode
    ProbController.getAll(id)
      .then( (prob) => {
          // Si la méthode ne renvoie pas d'erreur, on renvoie le resultat
          res.status(200).json({
              success : true,
              status : 200,
              datas : prob
          });
      })
      .catch( (err) => {
          // Sinon, on renvoie un erreur systeme
          console.error(err);
          res.status(500).json({
              success : false,
              status : 500,
              message : "500 Internal Server Error"
          }).end();
      });
});


probRouter.post('/', function(req, res) {
    /* Récupération des parametres */
    const from_user_id = req.body.from_user_id;
    const to_user_id = req.body.to_user_id;
    const question = req.body.question;
    const probability = req.body.probability;
    const fromNumber = req.body.fromNumber;
    const toNumber = req.body.toNumber;
    const state = req.body.state || "LAUNCHED";

    // Si les parametres obligatoires ne sont pas tous remplis
    if( question === undefined || probability === undefined || fromNumber === undefined || from_user_id === undefined) {
        // Renvoi d'une erreur
        res.status(400).json({
            success : false,
            status : 400,
            message : "Bad Request"
        }).end();
        return;
    }
    // Sinon, on appelle la methode
    ProbController.add(from_user_id, to_user_id, question, probability, fromNumber, toNumber, state)
      .then( (prob) => {
          // Si la methode ne renvoie pas d'erreur, on renvoie le résultat
          res.status(200).json({
              success : true,
              status : 200,
              datas : prob
          });
      }).catch( (err) => {
          // Sinon, on renvoie un erreur systeme
          console.error(err);
          res.status(500).json({
              success : false,
              status : 500,
              message : "500 Internal Server Error"
          }).end();
      });
});


probRouter.delete('/', function (req, res) {
    // Récupération des parametres
    var id = parseInt(req.body.id);
    // Appel de la methode
    ProbController.getAll(id)
      .then( (prob) => {
          // Si la methode ne renvoie pas d'erreur
          if (prob) {
              // Si l'objet de retour est defini, on appelle la methode
              ProbController.delete(id)
                .then( (prob) => {
                    // Si la methode ne renvoie pas d'erreur, on renvoie les données
                    res.status(200).json({
                        success : true,
                        status : 200,
                        datas : prob
                    });
                });
              // Si la methode renvoie un objet undefined, on renvoie une erreur
          } else {
            res.status(400).json({
                  success : false,
                  status : 400,
                  message : "Bad Request"
            });
          }
      }).catch( (err) => {
          console.error(err);
          res.status(500).json({
              success : false,
              status : 500,
              message : "500 Internal Server Error"
          }).end();
      });
});

probRouter.put('/', function(req, res) {
  const from = req.body.from;
  const to = req.body.to;
  const question = req.body.question;
  const probability = req.body.probability;
  const fromNumber = req.body.fromNumber;
  const toNumber = req.body.toNumber;
  const state = req.body.state || "UNKNOW";

  ProbController.getAll(id)
    .then( (user) => {
      if (user) {
          ProbController.update(id, from, to, question, probability, fromNumber, toNumber, state)
            .then( (user) => {
                res.status(200).json({
                    success : true,
                    status : 200,
                    datas : prob
                });
            });
      } else {
          res.status(400).json({
              success: false,
              status : 400,
              message : "Bad Request"
          });
      }
    }).catch( (err) => {
        console.error(err);
        res.status(500).json({
            success : false,
            status : 500,
            message : "500 Internal Server Error"
        }).end();
    });
});

module.exports = probRouter;
