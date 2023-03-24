const { expect } = require("chai");
const sinon = require("sinon");
const { saleService } = require("../../../src/services");
const { saleModel } = require("../../../src/models");
const {
  salesList,
  salesIdList,
  newSaleProduct,
  newSale
} = require("./mocks/saleService.mock");

describe("Checking sale service", function () {
  describe("", function () {
    it("Retrieving the sales list", async function () {
      sinon.stub(saleModel, "findAll").resolves(salesList);
      const result = await saleService.findAll();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(salesList);
    });
  });

  describe("Find a sale by ID", function () {
    it("Returns an error if it receives an invalid ID", async function () {
      const result = await saleService.findById("abc");
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal('"id" must be a number');
    });

    it("Returns an error if the product does not exist", async function () {
      sinon.stub(saleModel, "findByIdJoinSalesProduct").resolves([]);
      const result = await saleService.findById(1);
      expect(result.type).to.equal("SALE_NOT_FOUND");
      expect(result.message).to.equal("Sale not found");
    });

    it("Retrieving a sale by its id", async function () {
      sinon.stub(saleModel, "findByIdJoinSalesProduct").resolves([salesIdList]);
      const result = await saleService.findById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal([salesIdList]);
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe("Sales registrations", function () {
    it("Returns an error when passing an invalid name", async function () {
      const result = await saleService.create([
        {
          productId: 0,
          quantity: 1,
        },
      ]);
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal(
        '"productId" must be greater than or equal to 1'
      );
    });

    it("Returns the ID of registered product", async function () {
      sinon.stub(saleModel, "insertValueSale").resolves(1);
      sinon.stub(saleModel, "findByIdValueSale").resolves(3);
      const result = await saleService.create(newSale);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newSaleProduct);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
