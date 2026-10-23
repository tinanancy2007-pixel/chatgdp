# HYSS Jewelry

A static storefront for HYSS Jewelry: hero, shop-by-category, filterable product grid with quick view, a cart drawer saved in the browser, story, reviews, newsletter signup and contact.

## Run locally

No build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Customize

- **Products**: edit `assets/products.js` (name, category, price, material, description).
- **Photos**: product art is generated SVG (`assets/art.js`). To use photos, add an `image` field to each product and render an `<img>` in `assets/app.js` instead of `jewelryArt(...)`.
- **Colors and fonts**: CSS variables at the top of `assets/styles.css`.
- **Checkout**: the Checkout button only shows a notice. Connect Shopify (Buy Button), Stripe Checkout or Square to take real payments.
