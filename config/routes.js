const bcrypt = require("bcryptjs");
const tokenService = require("../auth/token-service.js");
const { authenticate } = require('../auth/authenticate');

const Users = require("./routes-model");


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/users',  authenticate, getUsers);
  server.get('/api/users/:id', authenticate, getUsersbyID);
  server.get('/api/top20',top20);
  server.post('/api/comment',comments);
  

};

function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      const token = tokenService.generateToken(user);
      res.status(201).json({ saved, message: `registered, ${token}` });
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function comments(req, res) {
  // implement user to save comment
  let comment = req.body;
  Users.add(comment)
    .then(saved => {
      res.status(201).json({ saved, message: "comment saved!" });
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token,
          roles: token.roles
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function getUsers(req, res) {
  
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: 'The users information could not be retrieved.',
      });
    });


}
function getUsersbyID(req,res){

  Users.findById(req.params.id)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
  })
  .catch(() => {
    res
      .status(500)
      .json({ errorMessage: 'The user information could not be retrieved.' });
  });
}

function top20(req, res) {
  
  Users.find()
    .then(top_20_users => {
      res.status(200).json(top_20_users);
    })
    /*.catch(() => {
      res.status(500).json({
        errorMessage: 'The top 20 comments could not be retrieved.',
      });
    });*/


}

/*
server.delete('/api/users/:id', (req, res) => {
  Users.remove(req.params.id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json({
          message: 'the user was deleted.',
        });
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: 'The user could not be removed' });
    });
});

server.put('/api/users/:id', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    Users.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res
            .status(404)
            .json({
              message: 'The user with the specified ID does not exist.',
            });
        }
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: 'The user information could not be modified.',
        });
      });
  }
});*/