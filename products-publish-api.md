# RSS Products API contract

The static website uses these server endpoints for the product publisher:

- `POST /api/product-content` — multipart form-data: `image`, optional `offer`, `price`, `category`, `productUrl`. Returns `{ name:{en,si,ta}, short:{en,si,ta}, description:{en,si,ta}, category }`.
- `POST /api/products` — JSON product object after human review. Returns the saved product and its public URL.
- `GET /api/products` — returns the published product array used by the catalogue.

The AI endpoint must use a vision-capable model and must not invent prices, discounts, specifications, certifications, guarantees, or claims not visible in the image or supplied by the publisher. The publisher reviews the three-language result before calling `POST /api/products`.

This contract intentionally keeps AI credentials server-side; no API key belongs in the website JavaScript.
