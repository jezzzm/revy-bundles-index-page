import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import Single from './bundle-single.js'
import useBundleHistory from './bundles-use-bundle-history.js';
import useBundles from './bundles-use-bundles.js';

const App = () => {
  const { currentBundle, onBundleNavigation } = useBundleHistory();
  const { bundles, isLoading, isError } = useBundles()


  return html`
    <div class=custom-bundles-wrapper>
      ${isLoading
      ? html`<div className="loader" />`
      : isError
        ? html`<p>Uh oh, something went wrong fetching the bundles! Please reload the page to try again.</p>`
        : bundles.map((bundle) => html`
          <${Single} 
            fullBundle=${bundle} 
            isActive=${bundle.bundle.id === currentBundle}
            onOpen=${() => { onBundleNavigation(bundle.bundle.id) }}
            onClose=${() => { onBundleNavigation(null) }}
            />`)}
    </div>
  `;
}

render(html`<${App} />`, document.getElementById('spa-root'));
