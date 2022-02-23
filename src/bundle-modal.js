import {
  html, useEffect, useRef, useState
} from 'https://unpkg.com/htm/preact/standalone.module.js';
import Count from './bundle-count.js';
import Graphic from './bundle-graphic.js';

export const formatPrice = (num) => {
  const formatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  });

  return formatter.format(num);
};

const Modal = ({ products, onClose, bundle, imageBackground }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isError, setIsError] = useState(false);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const onCartAdd = () => {
    setIsAdding(true);
    fetch('/cart/add.js',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: products.map((product) => ({
          quantity: 1,
          id: product.variants[0].id,
        }))
      })
    }).then(() => {
      if (window.theme?.CartDrawer) {
        const drawer = new window.theme.CartDrawer();
        drawer.open();
      } else {
        window.location.href = '/cart';
      }
      setIsAdding(false);
    }).catch(() => {
      setIsAdding(false);
      setIsError(true);
    })
  }

  useEffect(() => {
    if (containerRef?.current) {
      const handleOutsideClick = (event) => {
        if (wrapperRef?.current) {
          if (!wrapperRef.current.contains(event.target)) {
            event.preventDefault();
            onClose();
          }
        }
      }

      const handleEscPress = (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      }
      containerRef.current.addEventListener('click', handleOutsideClick);
      document.addEventListener('keydown', handleEscPress);
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscPress);
        containerRef.current.removeEventListener('click', handleOutsideClick);
      }
    }
  }, [])

  return html`
    <div class=custom-bundle-modal-container ref=${containerRef}>
      <div class=custom-bundle-modal-wrapper ref=${wrapperRef}>
        <div class=custom-bundle-modal-close>
          <button onclick=${onClose}>×</button>
        </div>
        <div class=custom-bundle-modal-content>
          <div class=custom-modal-upper>
            <div class=custom-modal-image>
              <${Graphic} background=${imageBackground} />
            </div>
            <div class=custom-bundle-description>
              <h2 class="h2 product-single__title">${bundle.message}</h2>
              <span class=product__price>${formatPrice(bundle.discount_value)}</span>
              <${Count} bundle=${bundle} products=${products} />
              <p>${bundle.title}</p>
            </div>
          </div>
          <div class=custom-modal-lower>
            <p class=custom-bundle-product-includes>Includes:</p>
            <div 
              class="custom-bundle-product-list" 
            >
              ${products.map((product) => html`
                <div class="custom-bundle-product">
                  <a href=/products/${product.handle} target=_blank class="custom-bundle-product-link">
                    <img src=${product.image} alt="${product.title} cover image" />
                    <span>${product.title}</span>
                  </a>
                </div>
              `)}
            </div>
          </div>
        </div>
        <div class=custom-bundle-modal-footer>
          <div class="custom-bundle-buy-container">
            <button class="btn custom-bundle-buy ${isAdding ? 'btn--loading' : ''}" onclick=${onCartAdd}>
              Add to cart
            </button>
            ${isError && html`
              <span>
                We couldn't add this bundle to the cart, oops!
                Please reload the page and try again. 
                If it still doesn't work, please get in touch with us at info@misslearningbee.com and we'll  lend a hand.
              </span>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
};

export default Modal;