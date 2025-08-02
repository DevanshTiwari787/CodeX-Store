# SoundSpace

SoundSpace is a modern React-based e-commerce site for premium audio products. It features animated product showcases, a persistent cart, and smooth navigation, designed for both desktop and mobile experiences.

## VIDEO DEMONSTRATION

https://github.com/user-attachments/assets/363b5ad9-ba9d-4343-ae24-91e81c603923

https://github.com/user-attachments/assets/8627110b-724f-493a-83b6-1d9992e5be65


## Features

- **Animated Home Page:** GSAP-powered scroll animations for product highlights.
- **Product Catalog:** Browse AirPods, Headphones, Speakers, and Neckbands with color options.
- **Cart Functionality:** Add, update, and remove products; persistent across sessions.
- **Responsive Design:** Optimized for desktop and mobile.
- **Custom Cursor & Marquee:** Interactive cursor and infinite product marquee.
- **About & Team:** Horizontal scroll section with team profiles.
- **Contact Page:** Stylish contact form with custom cursor.
- **Deployment Ready:** Configured for Vite, supports SPA routing.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

### Build

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Project Structure

- `src/components/common/` — Navbar, Footer, CartIcon, etc.
- `src/components/sections/` — Product grid and other sections.
- `src/components/ui/` — Loader, GlassCursor, InfiniteMarquee, etc.
- `src/pages/` — HomePage, AboutPage, ProductsPage, ContactPage, CartPage.
- `src/contexts/` — CartContext for global cart state.
- `src/assets/` — Images for products and team.
- `public/` — Static files and favicon.

## Routing

- `/home` — Animated landing page
- `/products` — Product catalog
- `/about` — About & team section
- `/contact` — Contact form
- `/cart` — Shopping cart

## Deployment

- SPA routing is supported. For Netlify/Vercel, add a `_redirects` file with:
  ```
  /* /index.html 200
  ```
- For Vite, see [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html).

## Customization

- Edit product data in `src/components/sections/Products.tsx` and `src/pages/HomePage.tsx`.
- Update team info in `src/pages/AboutPage.tsx`.
- Change styles in CSS files under `src/components/common/`, `src/components/ui/`, and `src/pages/`.

## License

MIT

---

Made with ❤️ by Devansh Tiwari & Anushka Yadav.
