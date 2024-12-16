import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Ustawienia Cypress dla testów e2e
    setupNodeEvents(on, config) {
      // implementacja listenerów zdarzeń Node (jeśli potrzebne)
    },
    baseUrl: "http://localhost:5000", // URL podstawowy dla testów
    specPattern: "cypress/integration/**/*.cy.{js,jsx,ts,tsx}", // Wzorzec dla plików testowych
    supportFile: false, // Plik wsparcia dla testów
    fixturesFolder: "cypress/fixtures", // Ścieżka do fixtures
    screenshotsFolder: "cypress/screenshots", // Ścieżka do screenshotów
    videosFolder: "cypress/videos", // Ścieżka do filmów z testów
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Wzorzec dla plików testowych
  },
});
