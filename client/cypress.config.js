const { defineConfig } = require("cypress");
const db = require("./cypress/db");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        'seedDB': () => {
          db.seed();
          return null;
        },
      })
    },
  },
});
