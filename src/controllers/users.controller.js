const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  user.save()
    .then((data) => {
      let userToken = jwt.sign(
        {
          id: data._id,
        },
        'mysupersecret',
        {
          expiresIn: 86400,
        }
      );
      res.send({
        token: userToken,
        auth: true,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: 500,
        message: err.message || 'Some error occured while creating the User!'
      });
    });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .populate('orders')
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User with id ${req.params.id} not found`
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};

exports.login = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
      .then((data) => {
        
      if (!data) {
        return res.status(404).send({
          auth: false,
          token: null,
          message: `your email or password is incorrect, try again`,
        });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        data.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          auth: false,
          token: null,
          message: 'your email or password is incorrect, try again',
        });
      }

      let userToken = jwt.sign(
        {
          id: data._id,
        },
        'mysupersecret',
        {expiresIn: 86400}
      );

      res.send({
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
