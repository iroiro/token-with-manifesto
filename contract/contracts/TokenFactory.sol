// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./TWM.sol";

contract TokenFactory {
  address[] tokens;
  event CreateToken(address, string, string[3]); // token address, creator did, witness dids

  function createToken(
    string memory name,
    string memory symbol,
    uint256 totalSupply,
    string memory _docId,
    bytes32 _docIdHash,
    string memory _creatorDid,
    string[3] memory _witnessDids,
    bytes[3] memory _witnessSigs,
    address[3] memory _witnessAddresses
  ) external {
    TokenWithManifesto newTWM =
      new TokenWithManifesto(
        name,
        symbol,
        totalSupply,
        _docId,
        _docIdHash,
        _creatorDid,
        _witnessDids,
        _witnessSigs,
        _witnessAddresses
      );

    tokens.push(address(newTWM));
    emit CreateToken(address(newTWM), _creatorDid, _witnessDids);
  }

  function tokensCount() external view returns (uint256) {
    return tokens.length;
  }
}
