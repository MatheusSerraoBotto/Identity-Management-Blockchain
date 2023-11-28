// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IdentityManagement {
    struct Identity {
        string ipfsHash; 
        bool isRegistered;
        mapping(address => bytes) encryptedSymmetricKeys; 
    }

    mapping(address => Identity) private identities;

    event IdentityRegistered(address indexed user);
    event AccessGranted(address indexed user, address grantee);
    event AccessRevoked(address indexed user, address grantee);
    event IdentityUpdated(address indexed user, string ipfsHash);

    modifier onlyRegistered() {
        require(identities[msg.sender].isRegistered, "Not registered");
        _;
    }

    function registerIdentity(string memory _ipfsHash) public {
        require(!identities[msg.sender].isRegistered, "Already registered");
        identities[msg.sender].ipfsHash = _ipfsHash;
        identities[msg.sender].isRegistered = true;
        emit IdentityRegistered(msg.sender);
    }

    function grantAccess(address _grantee, bytes memory _encryptedSymmetricKey) public onlyRegistered {
        identities[msg.sender].encryptedSymmetricKeys[_grantee] = _encryptedSymmetricKey;
        emit AccessGranted(msg.sender, _grantee);
    }

    function revokeAccess(address _grantee) public onlyRegistered {
        delete identities[msg.sender].encryptedSymmetricKeys[_grantee];
        emit AccessRevoked(msg.sender, _grantee);
    }

    function updateIdentity(string memory _ipfsHash) public onlyRegistered {
        identities[msg.sender].ipfsHash = _ipfsHash;
        emit IdentityUpdated(msg.sender, _ipfsHash);
    }

    function getEncryptedSymmetricKey(address _user, address _grantee) public view returns (bytes memory) {
        require(identities[_user].isRegistered, "Not registered");
        return identities[_user].encryptedSymmetricKeys[_grantee];
    }
}
