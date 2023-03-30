const { expect } = require("chai");
const sinon = require("sinon");
const { saleService } = require("../../../src/services");
const { saleModel, productModel } = require("../../../src/models");

const {
  salesList,
  salesIdList,
  newSaleProduct,
  newSale,
  newSaleProductModel,
} = require("../mocks/sale.mock");

const validations = require('../../../src/services/validations/validationsInputValues')

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

    it("Returns an error if the sales does not exist", async function () {
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

    it("When sending valid data must save successfully", async function () {
      sinon.stub(saleModel, "insertValueSale")
        .callsFake(async ({ productId, quantity }) => ({
        productId, quantity
      }));
      sinon.stub(saleModel, "insertDateSale").resolves(2);
      sinon.stub(validations, "validateNewSale").resolves({ type: false });
      const result = await saleService.create(newSale);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newSaleProduct);
    });

    it("Returns an error if the sales does not exist", async function () {
      sinon.stub(saleModel, "insertValueSale")
        .callsFake(async ({ productId, quantity }) => ({
        productId, quantity
      }));
      sinon.stub(saleModel, "insertDateSale").resolves(2);
      sinon.stub(productModel, "findById").resolves(undefined);
      const result2 = await saleService.create([{ productId: 999999, quantity: 1 }]);
      expect(result2.type).to.equal("PRODUCT_NOT_FOUND");
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Updating an existing product', function () {
    it("Returns an edited product since it already exists", async function () {
      sinon.stub(saleModel, "update").resolves(1);
      sinon.stub(saleModel, "findByIdJoinSalesProduct").resolves(salesList[0]);
      sinon.stub(saleModel, "findByIdValueSale")
        .resolves([newSaleProductModel]);
      const result = await saleService
        .update([newSaleProductModel], salesList[0].saleId);
      expect(result.message).to.deep.equal({saleId: salesList[0].saleId ,itemsUpdated: [newSaleProductModel]});
    });

    it("Returns an error when trying to update a product that does not exist", async function () {
      sinon.stub(saleModel, "update").resolves(1);
      sinon.stub(saleModel, "findByIdJoinSalesProduct").resolves([]);
      const result = await saleService.update([newSaleProductModel], 1);
      expect(result.type).to.equal("SALE_NOT_FOUND");
      expect(result.message).to.equal("Sale not found");
    });

    it('Returns an error if the "quantity" is not filled in', async function () {
      sinon.stub(saleModel, "update").resolves(1);
      sinon.stub(saleModel, "findByIdJoinSalesProduct").resolves([]);
      const result = await saleService.update([{productId: 1}], 1);
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal('The filed "quantity" is required');
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Deleting an existing sale', function () {
    it('Delete a sale successfully', async function () {
      sinon.stub(saleModel, "findByIdValueSale").resolves([salesList[0]]);
      sinon.stub(saleModel, "removeValueIdSale").resolves();
      const result = await saleService.remove(1);
      expect(result.message).to.deep.equal('Sale not found');
    })

    it("Returns an error because the ID does not exist", async function () {
      sinon.stub(saleModel, "findByIdValueSale").resolves(undefined);
      const result = await saleService.remove(99);
      expect(result.type).to.equal("SALE_NOT_FOUND");
      expect(result.message).to.deep.equal("Sale not found");
    });

    it("Returns an error when passing an invalid ID", async function () {
      const result = await saleService.remove("abc");
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal('"id" must be a number');
    });

    it('Delete a sale product successfully', async function () {
      sinon.stub(saleModel, "findByIdJoinSalesProduct").resolves([salesList[0]]);
      sinon.stub(saleModel, "removeSalesProduct").resolves();
      const result = await saleService.remove(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal('');
    })

    afterEach(function () {
      sinon.restore();
    });
  });
});
