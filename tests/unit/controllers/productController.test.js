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
  });

  describe("Searching for a product by id", function () {
    it("Must respond with status 200 and the database data when it exists", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "findById")
        .resolves(productList[0]);

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList[0]);
    });

    it("When passing an invalid id it should return an error", async function () {
      const res = {};
      const req = { params: { id: "abc" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, "findById").resolves([[productList[0]]]);
        try {
          await productController.findById("abc");
        } catch (error) {
          expect(error.status).to.have.been.calledWith(200);
          expect(error.json).to.have.been.calledWith({
              status: 404,
              message: 'Product not found',
            });
        }
      });

    afterEach(function () {
      sinon.restore();
    });
  });
});
