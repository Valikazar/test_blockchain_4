// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../contracts/ERC20Token.sol";

contract ERC20TokenTest {
    MyToken token;
    address owner;
    address recipient;

    constructor() {
        owner = address(this);
        recipient = address(1);
    }

    function setUp() public {
        token = new MyToken(1000 * 10 ** 18);
    }

    function testInitialSupply() public view {
        require(token.totalSupply() == 1000 * 10 ** 18, "Initial supply mismatch");
    }

    function testTransfer() public {
        token.transfer(recipient, 100 * 10 ** 18);
        require(token.balanceOf(recipient) == 100 * 10 ** 18, "Transfer failed");
        require(token.balanceOf(owner) == 900 * 10 ** 18, "Owner balance incorrect");
    }

    function testTransferFrom() public {
        token.approve(owner, 200 * 10 ** 18);
        token.transferFrom(owner, recipient, 50 * 10 ** 18);
        require(token.balanceOf(recipient) == 50 * 10 ** 18, "TransferFrom failed");
    }

    function testApproval() public {
        token.approve(recipient, 300 * 10 ** 18);
        require(token.allowance(owner, recipient) == 300 * 10 ** 18, "Approval failed");
    }
}