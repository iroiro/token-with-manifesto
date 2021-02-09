const TokenFactory = artifacts.require("TokenFactory");
module.exports = function (deployer) {
  deployer.deploy(TokenFactory);
};
