/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  Component, html, render, useState
} from 'https://unpkg.com/htm/preact/standalone.module.js';
// import htm from 'https://unpkg.com/htm?module'

let hasLoaded = false;

// const html = html.bind(h);

const formatPrice = (num) => {
  const formatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  });

  return formatter.format(num);
};

const Bundle = ({ index, fullBundle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const { bundle_products: products, bundle } = fullBundle;

  const originalTotal = products.reduce(
    (sum, product) => sum + Number(product.variants[0].price), 0,
  );
  const saving = originalTotal - bundle.discount_value;

  return html`
      <div class="custom-bundle-item">
        <div class="custom-bundle-graphic">
          <div class="custom-bundle-graphic-inner">
            <h3 class="grid-product__title grid-product__title--body">
              ${bundle.title}
            </h3>
          </div>
        </div>
        <div class="custom-bundle-meta">
          <div class="custom-bundle-price-buy-container">
            <div class="custom-bundle-price">
              ${formatPrice(bundle.discount_value)}
            </div>
            <div class="custom-bundle-buy-container">
              <button class="btn custom-bundle-buy">
                Add to cart
              </button>
            </div>
          </div>
          <div class="custom-bundle-count">
            <span>${products.length}</span> items included, saving you <span>${formatPrice(saving)}</span>
          </div>
          <div 
            class="custom-bundle-product-list" 
            id="cbsm-target-${index}" 
            style="height: ${isOpen ? 'auto' : '58px'}"
          >
            ${products.map((product) => html`
            <div class="custom-bundle-product">
              ${product.title}
            </div>
            `)}
          </div>
          <div class="custom-bundle-see-more-container">
            <button 
              class=custom-bundle-see-more
              id=cbsm-trigger-${index}
              onclick=${toggleOpen} 
            >
              See more
            </button>
          </div>
        </div>
      </div>
    `;
};

class App extends Component {
  render({ bundles }) {
    return html`
      <div class="custom-bundles-wrapper">
        ${bundles.map((bundle, index) => html`
        <${Bundle} fullBundle=${bundle} index=${index} />`)}
      </div>
    `;
  }
}

const onLoad = () => {
  if (!hasLoaded) {
    hasLoaded = true;
    const root = document.getElementById('revy-bundles-wrapper');
    root.textContent = ''; // don't show default revy html
    render(html`<${App} bundles=${window.RevyBundle.embedData.bundles} />`, root);
  }
};

window.revyBundleDataLayer = window.revyBundleDataLayer || [];
window.revyBundleDataLayer.push({ onLoad });
