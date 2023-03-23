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
      const result = await productService.findById("a");
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal('"id" must be a number');
    });

    it("Returns an error if the product does not exist", async function () {
      sinon.stub(productModel, "findById").resolves(undefined);
      const result = await productService.findById(1);
      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("Returns the product if the ID exists", async function () {
      sinon.stub(productModel, "findById").resolves(productList[0]);
      const result = await productService.findById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productList[0]);
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe("Search product by name", function () {
    it("Returns the list of all products if the 'q' does not exist", async function () {
      sinon.stub(productModel, "findAll").resolves(productList);
      const result = await productService.findByName();
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(productList);
    });

    it("Returns the product if the ID exists", async function () {
      sinon.stub(productModel, "findByName").resolves([productList[0]]);
      const result = await productService.findByName('marte');
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal([productList[0]]);
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe("Register a new product", function () {
    it("Returns an error when trying to register an invalid name", async function () {
      const result = await productService.create('abc');
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal(
        '"name" length must be at least 5 characters long'
      );
    });

    it("Returns the ID of registered product", async function () {
      sinon.stub(productModel, "create").resolves(1);
      sinon.stub(productModel, "findById").resolves(productList[0]);
      const result = await productService.create("Martelo de Thor");
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productList[0]);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
