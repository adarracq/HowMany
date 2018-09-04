const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const UserController = require(config.controllers.user_path);


const userRouter = express.Router();
userRouter.use(bodyParser.json());


userRouter.get('/:id?', function(req, res) {
    // Récupération des parametres
    const id = req.params.id;
    // On appelle la methode
    UserController.getAll(id)
      .then( (user) => {
          // Si la méthode ne renvoie pas d'erreur, on renvoie le resultat
          res.status(200).json({
              success : true,
              status : 200,
              datas : user
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


userRouter.post('/', function(req, res) {
    /* Récupération des parametres */
    const surname = req.body.surname;
    const login = req.body.login || "log";
    const password = req.body.password || "pass";

    // Si les parametres obligatoires ne sont pas tous remplis
    if( surname === undefined) {
        // Renvoi d'une erreur
        res.status(400).json({
            success : false,
            status : 400,
            message : "Bad Request"
        }).end();
        return;
    }
    // Sinon, on appelle la methode
    UserController.add(surname, login, password)
      .then( (user) => {
          // Si la methode ne renvoie pas d'erreur, on renvoie le résultat
          res.status(200).json({
              success : true,
              status : 200,
              datas : user
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


userRouter.delete('/', function (req, res) {
    // Récupération des parametres
    var id = parseInt(req.body.id);
    // Appel de la methode
    UserController.getAll(id)
      .then( (user) => {
          // Si la methode ne renvoie pas d'erreur
          if (user) {
              // Si l'objet de retour est defini, on appelle la methode
              UserController.delete(id)
                .then( (user) => {
                    // Si la methode ne renvoie pas d'erreur, on renvoie les données
                    res.status(200).json({
                        success : true,
                        status : 200,
                        datas : user
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

userRouter.put('/', function(req, res) {
  const surname = req.body.surname;
  const login = req.body.login || "log";
  const password = req.body.password || "pass";
  const id = parseInt(req.body.id);

  UserController.getAll(id)
    .then( (user) => {
      if (user) {
          UserController.update(id, surname, login, password)
            .then( (user) => {
                res.status(200).json({
                    success : true,
                    status : 200,
                    datas : user
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

module.exports = userRouter;
