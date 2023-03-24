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

const newSale  = [
  { productId: 1, quantity: 2 },
  { productId: 3, quantity: 4 }
];

const newSaleProduct = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 2,
    }
  ]
};

module.exports = {
  salesList,
  salesIdList,
  newSale,
  newSaleProduct,
};
