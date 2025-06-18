const express = require('express');
const spdy = require('spdy');
const fs = require('fs');
const path = require('path');

const { getProductDetails } = require('./api/productInfo');
const { getProductStock } = require('./api/inventory');
const { staticResourceMiddleware } = require('./static-resources');

const app = express();
const PORT = 3000;


// Serve static files from /public
app.use(staticResourceMiddleware);
app.use(express.static(path.join(__dirname, 'public')));


// Dynamic HTML injection
app.get('/:page', async (req, res) => {
  const file = req.params.page;
  const filePath = path.join(__dirname, 'templates', `${file}.html`);
  
  fs.readFile(filePath, 'utf8', async (err, html) => {
    if (err) {
      res.status(500).send('Error loading HTML template');
      return;
    }

    const id = req.params.id;
    const productDetails = await getProductDetails(id);

    let output = html.replace('{{ gallery }}', `
        <div dir="ltr" class="swiper tf-product-media-main" id="gallery-swiper-started">
            <div class="swiper-wrapper">
                ${productDetails.images.map((img, i) => `
                    <div class="swiper-slide" data-color="beige">
                        <a href="${img}" target="_blank" class="item" data-pswp-width="770px" data-pswp-height="1075px">
                            <img 
                                class="tf-image-zoom ${i > 0 ? 'lazyload' : ''}" 
                                data-zoom="${img}" 
                                ${
                                    i === 0 ?
                                        `
                                            src="${img}" fetchpriority="high"
                                        ` :
                                        `data-src="${img}"`
                                }
                                alt="">
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
    `);

    output = output.replace('{{ priceOld }}', `$${productDetails.priceOld}`);
    output = output.replace('{{ priceNew }}', `$${productDetails.priceNew}`);
    output = output.replace('{{ title }}', `${productDetails.title}`);

    const productStock = await getProductStock(id);

    output = output.replace('{{ sizes }}', `
        <div class="variant-picker-values">
            ${Object.keys(productStock).map(option => `
                <input type="radio" name="size1" id="values-${option}" checked>
                <label class="style-text size-btn" for="values-${option}" data-value="S">
                    <p>${option.toUpperCase()}</p>
                </label>
            `).join('')}
        </div>
    `);

    res.write(output);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});