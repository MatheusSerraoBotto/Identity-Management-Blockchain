// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IdentityManagement {

    struct Access {
        bool isGranted;
        string encryptedPoint;
        string encryptedBeta;
    }

    struct Identity {
        string ipfsHash; 
        bool isRegistered;
        string alpha;
        mapping(address => Access) userAccess;
    }

    mapping(address => Identity) private identities;

    event IdentityRegistered(address indexed user);
    event IdentityUpdated(address indexed user, string ipfsHash);
    event AccessGranted(address indexed user, address grantee);
    event AccessRevoked(address indexed user, address grantee);
    event AccessRequested(address indexed user, address grantee);
    event AccessDenied(address indexed user, address grantee);

    modifier onlyRegistered(address _user) {
        require(identities[_user].isRegistered, "Not registered");
        _;
    }

    modifier onlyIfHasAccess(address _user) {
        require(identities[_user].userAccess[msg.sender].isGranted, "No access");
        _;
    }

    modifier onlyIfHasNotAccess(address _user) {
        require(!identities[_user].userAccess[msg.sender].isGranted, "Already has access");
        _;
    }

    function registerIdentity(string memory _ipfsHash, string memory _alpha) public {
        require(!identities[msg.sender].isRegistered, "Already registered");
        identities[msg.sender].ipfsHash = _ipfsHash;
        identities[msg.sender].isRegistered = true;
        identities[msg.sender].alpha = _alpha;
        emit IdentityRegistered(msg.sender);
    }

    function requestAccess(address _user, string memory _encryptedBeta) public onlyRegistered(_user) onlyIfHasNotAccess(_user) {
        identities[_user].userAccess[msg.sender].isGranted = false;
        identities[_user].userAccess[msg.sender].encryptedBeta = _encryptedBeta;
        emit AccessRequested(_user, msg.sender);
    }

    function grantAccess(address _grantee, string memory _encryptedPoint) public onlyRegistered(msg.sender) onlyIfHasNotAccess(_grantee){
        identities[msg.sender].userAccess[_grantee].isGranted = true;
        identities[msg.sender].userAccess[_grantee].encryptedPoint = _encryptedPoint;
        emit AccessGranted(msg.sender, _grantee);
    }

    function denyAccess(address _grantee) public onlyRegistered(msg.sender) onlyIfHasNotAccess(_grantee){
        identities[msg.sender].userAccess[_grantee].isGranted = false;
        identities[msg.sender].userAccess[_grantee].encryptedPoint = "";
        emit AccessDenied(msg.sender, _grantee);
    }

    function revokeAccess(address _grantee) public onlyRegistered(msg.sender) {
        identities[msg.sender].userAccess[_grantee].isGranted = false;
        identities[msg.sender].userAccess[_grantee].encryptedPoint = "";
        emit AccessRevoked(msg.sender, _grantee);
    }

    function getIdentity(address _user) public onlyRegistered(_user) onlyIfHasAccess(_user) view returns (string memory) {
        return identities[_user].ipfsHash;
    }

    function getAlpha(address _user) public onlyRegistered(_user) onlyIfHasAccess(_user) view returns (string memory) {
        return identities[_user].alpha;
    }

    function getEncryptedPoint(address _user) public onlyRegistered(_user) onlyIfHasAccess(_user) view returns (string memory) {
        return identities[_user].userAccess[msg.sender].encryptedPoint;
    }

    function getEncryptedBeta(address _user) public onlyRegistered(msg.sender) view returns (string memory) {
        return identities[msg.sender].userAccess[_user].encryptedBeta;
    }
}