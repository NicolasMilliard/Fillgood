// SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.17;

contract SimpleStorage {
    string message = "Hello!";

    function setMessage(string calldata _msg) external {
        message = _msg;
    }

    function getMessage() external view returns(string memory) {
        return message;
    }
}