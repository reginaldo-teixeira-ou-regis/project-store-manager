const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const { saleModel } = require("../../../src/models");
const {
  salesList,
  salesIdList,
  saleProductsList,
  newSaleProductModel,
  saleUpdate,
  saleUpdateDate,
} = require("../mocks/sale.mock");

describe("Tests of unit of the sale", function () {
  describe("Tests of unit of the sale", function () {
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

  describe("Tests of unit of the sale product", function () {
    it("Retrieving a sale by its id", async function () {
      sinon.stub(connection, "execute").resolves([saleProductsList]);
      const result = await saleModel.findByIdValueSale(1);
      expect(result).to.be.deep.equal(saleProductsList);
    });

    it("Registering a new sale", async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
      const result = await saleModel.insertValueSale(newSaleProductModel, 2);
      expect(result).to.be.deep.equal({...newSaleProductModel,});
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Updating a sale', function () {
    it('Updating an existing sale', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await saleModel.update(saleUpdate);
      expect(result).to.equal(1);
    });
  });

  describe('Remove a sale', function () {
    it('Deleting an existing sale', async () => {
      const result = await saleModel.removeValueIdSale(saleUpdateDate);
      expect(result).to.equal(undefined);
    });

    it('Deleting an existing sale product', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }])
      const result = await saleModel.removeSalesProduct(saleUpdate);
      expect(result).to.equal(undefined);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
