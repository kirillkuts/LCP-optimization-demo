const productStock = {
  1: {
    'xxs': 10,
    'xs': 15,
    's': 21,
    'm': 1,
    'l': 4,
    'xl': 9,
    'xxl': 1,
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getProductStock(productId) {
  await sleep(Math.random() * 200 + 400);
  return productStock[1];
}

module.exports = {
  getProductStock,
};