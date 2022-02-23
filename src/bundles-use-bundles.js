import { useState, useEffect } from 'https://unpkg.com/htm/preact/standalone.module.js';

const ALL_BUNDLES = 'https://bundle.revy.io/api/embed?shop=miss-learning-bee.myshopify.com&currency_rate=1.0&currency_symbol=AUD&uuids[]=all';

const useBundles = () => {
  const [bundles, setBundles] = useState([])
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(ALL_BUNDLES)
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