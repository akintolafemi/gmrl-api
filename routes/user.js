var express = require('express');
var router = express.Router();
const {Bearer, Paystack_Auth} = require('../Variables/Global');
var {ConnectyCubeConfig} = require('../Variables/Global');
const fetch = require("node-fetch");
const cubeClient = require("connectycube");


cubeClient.init(ConnectyCubeConfig);

async function createAppTokenCon () {
  return new Promise((resolve, reject) => {
    cubeClient.createSession()
      .then((session) => {
        resolve(session.token);
      })
      .catch((error) => {
        console.log(error.info.errors.base);
        reject('________________');
      });
  }).then((state) => {
    console.log(state);
  })
  .catch((error) => {
    console.log(error);
  });
}

const createAppSession = () => {
    return new Promise((resolve, reject) => {
      cubeClient.createSession((error, session) => {
        !error
          ? resolve(session.token)
          : reject(error, '=====1=====');
      });
    })
  }

async function createUserTokenCon (email, password) {
  return new Promise((resolve, reject) => {
    const userCredentials = { login: email, password: password };

    cubeClient.createSession(userCredentials)
      .then((session) => {
        resolve(session.token);
      })
      .catch((error) => {
        console.log(error);
        reject('________________');
      });
  });
}

/* GET users listing. */
router.post('/registeronconnectycube', function(req, res, next) {
  let auth = req.headers.authorization;
  if (auth !== Bearer) {
    res.status(401);
    res.json({
      message: "invalid bearer",
      statuscode: 401
    });
    res.end();
  }
  else {
    const {email, password, fullname, mobile, genderInterest, gender, photoURL} = req.body;
    const reqBody = Object.keys(req.body).length;
    if (reqBody < 7) {
      res.status(403);
      res.json({
        message: "incomplete request",
        statuscode: 403
      });
      res.end();
    }
    else {
      const userProfile = {
        login: email,
        password: password,
        email: email,
        full_name: fullname,
        phone: mobile,
        website: "",
        tag_list: [genderInterest],
        custom_data: JSON.stringify({ gender: gender, photoURL: photoURL }),
      };

      cubeClient.users
        .signup(userProfile)
        .then((user) => {
          console.log(user);
          let resp = {
            user: user,
            statuscode: 200
          };
          res.json(resp);
          res.end();
        })
        .catch((error) => {
          console.log(error);
          res.json({
            statuscode: 503
          });
          res.end();
        });
    }
  }
});

router.post('/loginonconnectycube', async function(req, res, next) {
  let auth = req.headers.authorization;
  console.log(auth);
  if (auth !== Bearer) {
    res.status(401);
    res.json({
      message: "invalid bearer",
      statuscode: 401
    });
    res.end();
  }
  else {
    console.log(new Date());
    let token = await createAppTokenCon();
    console.log(token);

    const {email, password} = req.body;
    const reqBody = Object.keys(req.body).length;
    if (reqBody < 2) {
      res.status(403);
      res.json({
        message: "incomplete request",
        statuscode: 403
      });
      res.end();
    }
    else {
      const userCredentials = { login: email, password: password };

      cubeClient.login(userCredentials)
        .then((user) => {
          console.log(user);
          let resp = {
            user: user,
            statuscode: 200
          };
          res.json(resp);
          res.end();
        })
        .catch((error) => {
          console.log(error);
          res.json({
            statuscode: 503
          });
          res.end();
        });
    }
  }
});

module.exports = router;
