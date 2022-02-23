### reqs
Shopify

Revy Bundles

### how
1. clone then run `npm run build`

2. copy the `custom-bundles.modern.js` and `custom-bundles.css` files to your theme assets folder

3. pick a page/collection where you'd like to render. probably a custom liquid template.

4. at the top of the liquid template, add snippet:
```liquid
{{ 'custom-bundles.css' | asset_url | stylesheet_tag: preload: true }}
<script type="module" src="{{ 'custom-bundles.modern.js' | asset_url }}" ></script>
```

5. add an empty `<div id="spa-root" />` to this template, which will be the render target

6. add a page/collection which uses this template, navigate to it, and see the output!

