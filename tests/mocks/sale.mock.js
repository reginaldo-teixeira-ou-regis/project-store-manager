const salesList = [
  {
    saleId: 1,
    date: "2021-05-09T09:47:37.000Z",
    productId: 1,
    quantity: 4
  },
  {
    saleId: 1,
    date: "2021-05-09T09:47:58.000Z",
    productId: 2,
    quantity: 3
  }
];

const salesIdList = [
  {
    date: "2021-05-09T09:47:37.000Z",
    productId: 1,
    quantity: 4
  }
];

const saleProductsList = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSale  = [
  { productId: 1, quantity: 2 },
  { productId: 3, quantity: 4 }
];

const newSaleProduct = {
  id: 2,
  itemsSold: [
    {
      productId: 1,
      quantity: 2,
    },
    {
      productId: 3,
      quantity: 4
    }
  ]
};

const newSaleProductModel = {
  productId: 1,
  quantity: 1,
};

module.exports = {
  salesList,
  salesIdList,
  saleProductsList,
  newSale,
  newSaleProduct,
  newSaleProductModel,
};
