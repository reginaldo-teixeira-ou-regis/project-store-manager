const { expect } = require("chai");
const sinon = require("sinon");
const { productService } = require("../../../src/services");
const { productModel } = require("../../../src/models");

const { productList } = require("./mocks/productService.mock");

describe("Checking product service", function () {
  describe("Product listing", function () {
    it("Returns the complete list of products", async function () {
      sinon.stub(productModel, "findAll").resolves(productList);
      const result = await productService.findAll();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(productList);
    });
  });

  describe("Search for a product by id", function () {
    it("Returns an error if it receives an invalid ID", async function () {
      sinon.stub(productModel, "findById").resolves(undefined);
      try {
        await productService.findById("abc");
      } catch (error) {
        expect(error.status).to.equal(404);
        expect(error.message).to.equal('Product not found');
      }
    });

    it("Returns the product if the ID exists", async function () {
      sinon.stub(productModel, "findById").resolves(productList[0]);
      const result = await productService.findById(1);
      expect(result).to.deep.equal(productList[0]);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
