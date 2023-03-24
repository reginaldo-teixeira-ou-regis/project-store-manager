const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const { saleProductModel } = require("../../../src/models");
const { saleProductsList, newSaleProduct } = require("./mocks/saleModel.mock");

describe("Tests of unit of the SaleProduct Model", function () {
   it("Retrieving a sale by its id", async function () {
     sinon.stub(connection, "execute").resolves([saleProductsList]);
     const result = await saleProductModel.findById(1);
     expect(result).to.be.deep.equal(saleProductsList);
   });

  it("Registering a new sale", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
    const result = await saleProductModel.create(newSaleProduct);
    expect(result).to.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});
