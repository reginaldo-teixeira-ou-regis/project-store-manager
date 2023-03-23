const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { productList } = require('./mocks/productModel.mock');

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

  afterEach(function () {
    sinon.restore();
  });
});