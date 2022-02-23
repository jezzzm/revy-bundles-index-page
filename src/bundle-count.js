import { html } from 'https://unpkg.com/htm/preact/standalone.module.js';

const BundleCount = ({ bundle, products }) => {
  const originalTotal = products.reduce(
    (sum, product) => sum + Number(product.variants[0].price), 0,
  );
  const saving = Math.round((originalTotal - bundle.discount_value) / originalTotal * 100);

  return html`
    <div class="custom-bundle-count">
      <span>${products.length}</span> items included, saving you <span>${saving}%</span>
    </div>
  `;
}

export default BundleCount;