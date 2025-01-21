import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server'  // Enable SSR to use middleware
});