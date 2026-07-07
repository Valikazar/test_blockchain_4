const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20Token", function () {
  let MyToken;
  let token;
  let owner;
  let recipient;

  beforeEach(async () => {
    [owner, recipient] = await ethers.getSigners();
    MyToken = await ethers.getContractFactory("MyToken");
    token = await MyToken.deploy(1000 * 10 ** 18);
    await token.deployed();
  });

  it("Should assign initial supply to owner", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(1000 * 10 ** 18);
  });

  it("Should transfer tokens between accounts", async function () {
    await token.transfer(recipient.address, 100 * 10 ** 18);
    const recipientBalance = await token.balanceOf(recipient.address);
    expect(recipientBalance).to.equal(100 * 10 ** 18);
  });

  it("Should allow approved transfers", async function () {
    await token.approve(owner.address, 200 * 10 ** 18);
    await token.connect(owner).transferFrom(owner.address, recipient.address, 50 * 10 ** 18);
    const recipientBalance = await token.balanceOf(recipient.address);
    expect(recipientBalance).to.equal(50 * 10 ** 18);
  });

  it("Should update allowances", async function () {
    await token.approve(recipient.address, 300 * 10 ** 18);
    const allowance = await token.allowance(owner.address, recipient.address);
    expect(allowance).to.equal(300 * 10 ** 18);
  });
});
