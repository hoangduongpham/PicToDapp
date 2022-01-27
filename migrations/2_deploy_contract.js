const PicToDapp = artifacts.require("PicToDapp.sol");

module.exports = function (deployer) {
  deployer.deploy(PicToDapp);
};