const productDetails = {
  1: {
    images: [
      'images/shop/products/hmgoepprod31.jpg',
      'images/shop/products/hmgoepprod.jpg',
      'images/shop/products/hmgoepprod2.jpg',
      'images/shop/products/hmgoepprod3.jpg',
      'images/shop/products/hmgoepprod4.jpg',
      'images/shop/products/hmgoepprod5.jpg',
      'images/shop/products/hmgoepprod6.jpg',
      'images/shop/products/hmgoepprod7.jpg',
      'images/shop/products/hmgoepprod8.jpg',
      'images/shop/products/hmgoepprod9.jpg',
    ],
    title: 'Cotton jersey top',
    priceOld: '35.00',
    priceNew: '8.00'

  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getProductDetails(productId) {
  await sleep(Math.random() * 200 + 400);
  return productDetails[1];
}

module.exports = {
  getProductDetails,
};