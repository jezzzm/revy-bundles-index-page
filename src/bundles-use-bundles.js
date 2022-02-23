import { useEffect, useState } from 'https://unpkg.com/htm/preact/standalone.module.js';

const SHOP = 'your-shop.myshopify.com';
const CURRENCY_RATE = '1.0';
const CURRENCY_SYMBOL = 'AUD';

const REVY_API = `https://bundle.revy.io/api/embed?shop=${SHOP}&currency_rate=${CURRENCY_RATE}&currency_symbol=${CURRENCY_SYMBOL}&uuids[]=all`;

const useBundles = () => {
  const [bundles, setBundles] = useState([])
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(REVY_API)
      .then(res => {
        res.json()
          .then(data => {
            setBundles(data.bundles);
            setIsLoading(false);
          })
      })
      .catch(err => {
        console.error(err);
        setIsError(true);
        setIsLoading(false);
      })
  }, [])

  return { bundles, isLoading, isError };
};

export default useBundles;