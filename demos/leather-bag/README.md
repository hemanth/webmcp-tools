# LUXE LEATHER | WebMCP E-commerce Demo

🚀 Live Demo: https://googlechromelabs.github.io/webmcp-tools/demos/leather-bag

A premium, modern e-commerce storefront for hand-crafted leather bags, built with Angular and WebMCP (Web Model Context Protocol). This project demonstrates how an AI agent can interact with an e-commerce site to search products, check policies, and manage a shopping cart using **declarative** tool definitions.

## 🌟 Key Features

- **WebMCP Declarative Tools**: 
  - `search_store`: Search and filter products.
  - `check_return_policy`: Access site-wide return policy.
  - `view_product`: Navigate to product details by name or index.
  - `add_search_result_to_cart`: Quick add from search results.
  - `add_to_cart`: Add product with options from the detail page.
- **Advanced Product Finding**: Tools support finding products by exact name, partial name, or their position in search results (index).
- **Premium Design System**: Features the "Artisanal Archive" aesthetic with curated color palettes and elegant typography.
- **Actionable Filters**: Dynamic price slider, color swatches, and finish checkboxes on the search page.
- **Cart Management**: A dedicated Cart Page with quantity controls and order summary calculation.

## 🛠 Tech Stack

- **Framework**: Angular 21 (Standalone Components)
- **Protocol**: WebMCP (Declarative Tools via HTML forms)
- **Styling**: Vanilla CSS (BEM-like)
- **Build Tool**: Angular CLI / Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v10 or later)

### Installation

1. Navigate to the project directory:
   ```bash
   cd demos/leather-bag
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start a local development server at `http://localhost:4200/`:

```bash
npm start
```

## 📂 Project Structure

- `src/app/pages`: Core views (Home, Search, Product, Cart)
- `src/app/layout`: Shared layout components (Header, Footer)
- `src/app/services`: Business logic (Cart service, Product discovery)
- `public/assets`: Product images and data files

## 🧪 Testing

Run unit tests with Vitest:

```bash
npm test
```
