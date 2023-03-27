const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { saleService } = require("../../../src/services");
const { saleController } = require("../../../src/controllers");
const { salesList, salesIdList } = require("../../mocks/sale.mock");

describe('Unit test of the saleController', function () {
  describe('Listing sales', function () {
    it('Should return status 200 and sale list', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findAll').resolves({ type: null, message: salesList });

      await saleController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesList);
    });

    it("Returns an ERROR when not finding the sale list", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, "findAll")
        .resolves({
          type: "SALE_NOT_FOUND",
          message: "Sale not found",
        });

      await saleController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe("Searching a sale by ID", function () {
    it("Must respond with status 200 and the database data when it exists", async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, "findById")
        .resolves({ type: null, message: [salesIdList] });

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([salesIdList]);
    });

    it("When passing an invalid ID it should return an error", async function () {
      const res = {};
      const req = {
        params: { id: "abc" },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, "findById")
        .resolves({ type: "INVALID_VALUE", message: '"id" must be a number' });

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe("Registering a new sale", function () {
    it("Returns an ERROR when finding nothing", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, "create").resolves({
          type: "SALE_NOT_FOUND",
          message: "Sale not found",
        });

      await saleController.create(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
    });

    it("When sending valid data must save successfully", async function () {
      const res = {};
      const req = {
        body: {
          saleId: 1,
          date: "2021-05-09T09:47:37.000Z",
          productId: 1,
          quantity: 4
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, "create")
        .resolves({ type: null, message: salesList[0] });

      await saleController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(salesList[0]);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
