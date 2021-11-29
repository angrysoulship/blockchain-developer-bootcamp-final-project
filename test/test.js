const { ethers } = require("hardhat");


const { expect } = require("chai");

describe("Limit Test", function () {
  it("Generation 0 trexes should has a limit of 100", async function () {
    const Trexcontract = await ethers.getContractFactory("Trexcontract");
    const trexcontract = await Trexcontract.deploy();

    expect(await trexcontract.Creation_Limit_Gen0()).to.equal(100);
  });

  
});

describe("Making T-rex test", function () {
  it("Should create a t-rex test", async function () {
    const Trexcontract = await ethers.getContractFactory("Trexcontract");
    const trexcontract = await Trexcontract.deploy();
    await trexcontract.createtrexGen0(1001)
    expect(await trexcontract.gen0Counter()).to.equal(1)
  })

  it("Get the trex by index", async function () {
    const Trexcontract = await ethers.getContractFactory("Trexcontract");
    const trexcontract = await Trexcontract.deploy();

    await trexcontract.createtrexGen0(1001)
    const trexOne = trexcontract.trexes(0)
    // const a = trexOne[2]._hex

    expect(await typeof(trexOne)).to.equal('object')
  })

  it("Check balance of an owner", async function () {
    const [owner] = await ethers.getSigners();
    const Trexcontract = await ethers.getContractFactory("Trexcontract");
    const trexcontract = await Trexcontract.deploy();

    await trexcontract.createtrexGen0(1001)

    expect(await trexcontract.balanceOf(owner.address)).to.equal(1)
  })

  it("Generation 0 trexes should has a limit of 100", async function () {
    const Trexcontract = await ethers.getContractFactory("Trexcontract");
    const trexcontract = await Trexcontract.deploy();

    await trexcontract.createtrexGen0(1001)

    expect(await trexcontract.totalSupply()).to.equal(1);
  });
})

