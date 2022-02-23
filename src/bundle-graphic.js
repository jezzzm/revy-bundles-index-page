import {
  html,
} from 'https://unpkg.com/htm/preact/standalone.module.js';



const BundleGraphic = ({ children, background }) => {
  return html`
    <div class="custom-bundle-graphic">
      <div class="custom-bundle-graphic-inner" style="${background}">
        ${children}
      </div>
    </div>
  `;
}

export default BundleGraphic;