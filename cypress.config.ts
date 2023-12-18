import { defineConfig } from "cypress";

export default defineConfig({

  e2e: {
    baseUrl: 'http://test.ljragusa.com.ar/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
