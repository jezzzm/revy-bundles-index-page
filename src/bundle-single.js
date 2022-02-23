import {
  html, useState
} from 'https://unpkg.com/htm/preact/standalone.module.js';
import Count from './bundle-count.js';
import Graphic from './bundle-graphic.js';
import Modal, { formatPrice } from './bundle-modal.js';

const colors = [
  '#bbfcf7',
  '#ee34b0',
  '#00ada7',
  '#ffffb0'
];

const corners = [
  'top left',
  'top right',
  'bottom left',
  'bottom right'
];

const getColorScheme = (bundleId) => {
  const reversed = bundleId.toString().split('').reverse();
  const firstFour = reversed.slice(0, 4);
  const fifth = reversed[4];
  const hexes = firstFour.map(char => colors[Math.floor((Number(char)) * 2 / 5)]);
  hexes.push(hexes[0]);
  const position = corners[Math.floor(Number(fifth) * 2 / 5)];
  return { hexes, position };
}

const buildConic = (bundleId) => {
  const { hexes, position } = getColorScheme(bundleId);

  return `background: conic-gradient(at ${position}, 
    ${hexes.join(',')}
  );`
}

const Single = ({ fullBundle, isActive, onOpen, onClose }) => {
  const [bg] = useState(() => buildConic(fullBundle.bundle.id))

  const { bundle_products: products, bundle } = fullBundle;

  return html`
      <div class=custom-bundle-item>
        <button onclick=${onOpen}>
          <${Graphic} background=${bg}>
            <div class=custom-bundle-meta>
              <div class=custom-bundle-meta-upper>
                <h3>${bundle.title}</h3>
                <span>${formatPrice(bundle.discount_value)}</span>
              </div>
              <${Count} bundle=${bundle} products=${products} />
            </div>
          </${Graphic}>
        </button>
      </div>
      ${isActive && html`
        <${Modal} 
          onClose=${onClose}
          products=${products}  
          bundle=${bundle}
          imageBackground=${bg}
        />
      `}
    `;
};

export default Single;