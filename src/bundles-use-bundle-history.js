import { useState, useEffect } from 'https://unpkg.com/htm/preact/standalone.module.js';

const getBundleParam = () => {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get('bundle_id')) || null;
}

const setBundleParam = (id) => {
  const params = new URLSearchParams(window.location.search);
  if (id) {
    params.set('bundle_id', id);
  } else {
    params.delete('bundle_id');
  }
  const stringified = params.toString();

  const newUrl = stringified.length > 0
    ? window.location.pathname + '?' + stringified
    : window.location.pathname;

  window.history.pushState({}, '', newUrl);
}

const useBundleHistory = () => {
  const [currentBundle, setCurrentBundle] = useState(getBundleParam());

  const onBundleNavigation = (id) => {
    setCurrentBundle(id);
    setBundleParam(id);
  }

  useEffect(() => {
    const onPop = () => {
      setCurrentBundle(getBundleParam())
    }

    window.addEventListener('popstate', onPop)

    return () => {
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  return { currentBundle, onBundleNavigation };
};

export default useBundleHistory;