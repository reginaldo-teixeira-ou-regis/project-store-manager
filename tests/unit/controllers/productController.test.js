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

  describe("Searching for a product by name", function () {
    it("Must respond with status 200 and database data when it exists", async function () {
      const res = {};
      const req = {
        query: { q: 'marte' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "findByName")
        .resolves({ type: null, message: [productList[0]] });

      await productController.findByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([productList[0]]);
    });

    it("By not passing a query", async function () {
      const res = {};
      const req = { query: {q: ''}};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "findByName")
        .resolves({ type: null, message: productList });

      await productController.findByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList);
    });

    it("When passing a query that does not exist", async function () {
      const res = {};
      const req = {
        query: { q: 'abcdefgh' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "findByName").resolves({
          type: "PRODUCT_NOT_FOUND",
          message: "Product not found",
        });

      await productController.findByName(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Product not found" });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe("Registering a new product", function () {
    it("When sending valid data must save successfully", async function () {
      const res = {};
      const req = {
        body: {
          name: "Martelo de Thor",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "create")
        .resolves({ type: null, message: productList[0] });

      await productController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productList[0]);
    });

    it("When sending a name with less than 5 characters, an error should be returned", async function () {
      const res = {};
      const req = {
        body: {
          name: "Ana",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "create")
        .resolves({
          type: "INVALID_VALUE",
          message: '"name" length must be at least 5 characters long',
        });

      await productController.create(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe("Updating an existing product", function () {
    it("When sending valid data must save successfully", async function () {
      const res = {};
      const req = {
        body: {
          name: "Martelo de Thor",
        },
        params: {
          id: 1,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "update")
        .resolves({ type: null, message: productList[0] });

      await productController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList[0]);
    });

    it("When sending a name with less than 5 characters, an error should be returned", async function () {
      const res = {};
      const req = {
        body: {
          name: "Ana",
        },
        params: {
          id: 1,
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "update").resolves({
        type: "INVALID_VALUE",
        message: '"name" length must be at least 5 characters long',
      });

      await productController.update(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe("Deleting a product", function () {
    it("Must delete the product and respond with status 204", async function () {
      const res = {};
      const req = { params: { id: 11111 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      res.end = sinon.stub().returns();
      sinon.stub(productService, "remove")
        .resolves({ type: null, message: '' });

      await productController.remove(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it("When passing an invalid ID it should return an error", async function () {
      const res = {};
      const req = { params: { id: "abc" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "remove")
        .resolves({ type: "INVALID_VALUE", message: '"id" must be a number' });

      await productController.remove(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"id" must be a number',
      });
    });

    it("Should return an error when passing an ID that does not exist in the database", async function () {
      const res = {};
      const req = { params: { id: 11111 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "remove")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      await productController.remove(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
