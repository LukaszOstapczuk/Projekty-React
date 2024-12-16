describe("ProductsList component", () => {
  beforeEach(() => {
    cy.window().then((window) => {
      window.localStorage.setItem("user", "testUser");
      window.localStorage.setItem("password", "testPass");
    });
    cy.visit("http://localhost:5000/dashboard");
  });

  it("shows a loading spinner while fetching products", () => {
    // Poprawiona ścieżka do pobierania produktów
    cy.intercept("GET", "http://localhost:4000/api/productsList", {
      delay: 500, // Dodanie opóźnienia
      fixture: "products.json", // Użycie mocka danych
    }).as("getProducts");

    // Upewnij się, że przycisk jest widoczny i nie jest zablokowany
    cy.get('[data-testid="load-button"]')
      .should("be.visible")
      .and("not.be.disabled");

    // Kliknij przycisk
    cy.get('[data-testid="load-button"]').click();

    // Sprawdzenie, czy spinner jest widoczny podczas ładowania
    cy.get('[data-testid="loading-spinner"]', { timeout: 10000 }).should(
      "be.visible"
    );

    // Poczekaj na zakończenie ładowania
    cy.wait("@getProducts");

    // Sprawdź, czy spinner znika po zakończeniu ładowania
    cy.get('[data-testid="loading-spinner"]').should("not.exist");
  });
});
