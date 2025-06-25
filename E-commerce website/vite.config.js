import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    rollupOptions: {
      input: {
        main: 'index.html',
        products: 'products.html',
        product: 'product.html',
        cart: 'cart.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});