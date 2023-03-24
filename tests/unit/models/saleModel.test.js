const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const { saleModel } = require("../../../src/models");
const { salesList, salesIdList } = require("./mocks/saleModel.mock");

describe("Tests of unit of the Sale Model", function () {
  it("Retrieving the sales list", async function () {
    sinon.stub(connection, "execute").resolves([salesList]);
    const result = await saleModel.findAll();
    expect(result).to.be.deep.equal(salesList);
  });

  it("Retrieving a sale by its id", async function () {
    sinon.stub(connection, "execute").resolves([salesIdList]);
    const result = await saleModel.findById(1);
    expect(result).to.be.deep.equal(salesIdList);
  });

  it("Registering a new sale", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
    const result = await saleModel.create();
    expect(result).to.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});
