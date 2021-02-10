// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./token/ERC20/ERC20.sol";
import "./cryptography/ECDSA.sol";

contract TokenWithManifesto is ERC20 {
  using ECDSA for bytes32;

  string public manifesto;
  string public creator;
  string[3] public witnessDids;

  constructor(
    string memory name,
    string memory symbol,
    uint256 totalSupply,
    string memory _docId,
    bytes32 _docIdHash,
    string memory _creatorDid,
    string[3] memory _witnessDids,
    bytes[3] memory _witnessSigs,
    address[3] memory _witnessAddresses,
    address creatorAddress
  ) ERC20(name, symbol) {
    verifyWitnessSignatures(
      _docIdHash,
      _witnessDids,
      _witnessSigs,
      _witnessAddresses
    );
    manifesto = _docId;
    creator = _creatorDid;
    witnessDids = _witnessDids;
    _mint(creatorAddress, totalSupply);
  }

  function verifyWitnessSignatures(
    bytes32 _docIdHash,
    string[3] memory _witnessDids,
    bytes[3] memory _witnessSigs,
    address[3] memory _witnessAddresses
  ) internal pure {
    for (uint256 i = 0; i < _witnessDids.length; i++) {
      address signer = _docIdHash.recover(_witnessSigs[i]);
      require(signer == _witnessAddresses[i], "Invalid signature");
    }
  }

  function createdBy() external view returns (string memory) {
    return creator;
  }

  function signedBy() external view returns (string[3] memory) {
    return witnessDids;
  }
}
