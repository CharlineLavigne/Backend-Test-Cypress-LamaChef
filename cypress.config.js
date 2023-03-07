const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://18fe-142-117-151-209.ngrok.io',
    supportFile: false
  },
})
