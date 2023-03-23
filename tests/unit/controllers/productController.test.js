const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require("../../../src/services");
const { productController } = require("../../../src/controllers");
const { productList } = require("./mocks/productController.mock");

describe('Unit test of the productController', function () {
  describe('Product listing', function () {
    it('Should return status 200 and the list', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findAll')
        .resolves({ type: null, message: productList });

      await productController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList);
    });

    it("Returns an ERROR when not finding the product list", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, "findAll")
        .resolves({
          type: "PRODUCT_NOT_FOUND",
          message: "Product not found",
        });

      await productController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Product not found" });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe("Searching for a product by id", function () {
    it("Must respond with status 200 and the database data when it exists", async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, "findById")
        .resolves({ type: null, message: productList[0] });

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList[0]);
    });

    it("When passing an invalid id it should return an error", async function () {
      const res = {};
      const req = {
        params: { id: "abc" },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, "findById")
        .resolves({ type: "INVALID_VALUE", message: '"id" must be a number' });

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
          message: '"id" must be a number',
        });
      });

    it("When passing an id that does not exist in the database, an error should be returned", async function () {
      const res = {};
      const req = {
        params: { id: 1111111 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, "findById")
        .resolves({
          type: "PRODUCT_NOT_FOUND",
          message: "Product not found",
        });

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Product not found" });
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
