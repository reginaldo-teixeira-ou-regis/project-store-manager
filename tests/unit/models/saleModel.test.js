const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const { saleModel } = require("../../../src/models");
const {
  salesList,
  salesIdList,
  saleProductsList,
  newSaleProduct
} = require("./mocks/saleModel.mock");

describe("Tests of unit of the Sale Model", function () {
  describe("Tests of unit of the Sale Model", function () {
    it("Retrieving the sales list", async function () {
      sinon.stub(connection, "execute").resolves([salesList]);
      const result = await saleModel.findAll();
      expect(result).to.be.deep.equal(salesList);
    });

    it("Retrieving a sale by its id", async function () {
      sinon.stub(connection, "execute").resolves([salesIdList]);
      const result = await saleModel.findByIdJoinSalesProduct(1);
      expect(result).to.be.deep.equal(salesIdList);
    });

    it("Registering a new sale", async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
      const result = await saleModel.insertDateSale();
      expect(result).to.equal(1);
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe("Tests of unit of the SaleProduct Model", function () {
    it("Retrieving a sale by its id", async function () {
      sinon.stub(connection, "execute").resolves([saleProductsList]);
      const result = await saleModel.findByIdValueSale(1);
      expect(result).to.be.deep.equal(saleProductsList);
    });

    it("Registering a new sale", async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
      const result = await saleModel.insertValueSale(newSaleProduct, 2);
      expect(result).to.be.deep.equal({...newSaleProduct});
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
