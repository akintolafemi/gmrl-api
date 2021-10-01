const SHA256 = require('crypto-js/sha256');

const bearer = "Bearer ygiquooG40i6Dlj36+D1xg==";
//const bearer = "Bearer " + SHA256(password).toString();

const ConnectyCubeConfig = {
  appId: 4235,
  authKey: "UHpOXeqmR32uW2H",
  authSecret: "mvANReYmGDfFmGp"
};


const PaystackConfig = {
  publicKey: 'pk_test_89d3e3ad320c0d9871d77ec7d1299aaa4d8847e8',
  //publicKey: 'pk_live_9e5fb1c58ccb04d97a9b7847e78e5e2d60a9de8f'
  secretKey: 'sk_test_f6414be030f410286c8bcb0b20ed0a5c29dda891',
  //secretKey: ''
}
const paystack_auth = "Bearer " + PaystackConfig.secretKey;

const MakeCode = function makeCode(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const MakeToken = function makeToken(length) {
   var result           = '';
   var characters       = '0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

module.exports.Paystack_Auth = Paystack_Auth = paystack_auth;
module.exports.Bearer = Bearer = bearer;
module.exports.MakeCode = MakeCode;
module.exports.MakeToken = MakeToken;
module.exports.ConnectyCubeConfig = ConnectyCubeConfig;
