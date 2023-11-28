// migrating the appropriate contracts
var IdentityManagement = artifacts.require("./IdentityManagement.sol");

module.exports = function(deployer) {
  deployer.deploy(IdentityManagement);
};
