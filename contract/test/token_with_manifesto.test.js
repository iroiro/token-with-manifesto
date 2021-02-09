const TokenWithManifesto = artifacts.require("TokenWithManifesto");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("TokenWithManifesto", function (/* accounts */) {
  it("should assert true", async function () {
    await TokenWithManifesto.deployed();
    return assert.isTrue(true);
  });
});
