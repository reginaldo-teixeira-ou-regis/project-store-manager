const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { productList, searchProductByName, newProduct } = require('./mocks/productModel.mock');

describe('Tests of unit of the Model of the products', function () {
  it('Retrieving the product list', async function () {
    sinon.stub(connection, 'execute').resolves([productList]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(productList);
  });

  it('Retrieving a product by your id', async function () {
    sinon.stub(connection, 'execute').resolves([[productList[0]]]);
    const result = await productModel.findById(1);
    expect(result).to.be.deep.equal(productList[0]);
  });

  it("Retrieving a product by name", async function () {
    sinon.stub(connection, "execute").resolves([searchProductByName]);
    const result = await productModel.findByName('arma');
    expect(result).to.be.deep.equal(searchProductByName);
  });

  it("Registering new product", async function () {
   sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);
   const result = await productModel.create(newProduct);
   expect(result).to.equal(4);
  });

  afterEach(function () {
    sinon.restore();
  });
});
