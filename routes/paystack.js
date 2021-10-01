var express = require('express');
var router = express.Router();
const {Bearer, Paystack_Auth} = require('../Variables/Global');
const fetch = require("node-fetch");

router.post('/verifytnx', async function(req, res, next) {
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
    const {reference} = req.body;
    const reqBody = Object.keys(req.body).length;
    if (reqBody < 1) {
      res.status(403);
      res.json({
        message: "incomplete request",
        statuscode: 403
      });
      res.end();
    }
    else {
      let verify = await fetch('https://api.paystack.co/transaction/verify/'+reference, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Paystack_Auth,
        }
      });
      verify = await verify.json();
      verify.statuscode = 200;
      verify.responsecode = "00";
      res.json(verify);
      res.end();
    }
  }
});


router.post('/chargecard', async function(req, res, next) {
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

    const {cardNumber, expiryMonth, expiryYear, cvc, accessCode} = req.body;
    const reqBody = Object.keys(req.body).length;
    if (reqBody < 5) {
      res.status(403);
      res.json({
        message: "incomplete request",
        statuscode: 403
      });
      res.end();
    }
    else {
      var response = await Profile.findOne({$or:[{email: username}, {username: username}]}, {email: 1, username: 1}).exec();
      if (response !== null) {
        var e = response.email;
        var token = new Date().toString();
        token = token+username;
        var accessToken = CryptoJS.AES.encrypt(token, 'trilon').toString();
        await User.updateOne({ email: e }, { accessToken: accessToken });
        res.json({
          statuscode: 200,
          responsecode: "00",
          accessToken: accessToken
        });
        res.end();
      }
      else {
        res.json({
          statuscode: 200,
          responsecode: "01",
          responsemessage: "username not found"
        });
        res.end();
      }
    }
  }

});

module.exports = router;
