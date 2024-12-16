describe("ShoppingList component", () => {
  beforeEach(() => {
    // Ustawienie lokalnego użytkownika i przejście do dashboardu
    cy.window().then((win) => {
      win.localStorage.setItem("user", "testUser");
      win.localStorage.setItem("password", "testPass");
    });
    cy.visit("http://localhost:5000/dashboard");
  });

  it("fetches and displays shopping list on mount", () => {
    // Intercept dla pobrania listy zakupów
    cy.intercept("GET", "http://localhost:4000/api/shoppingList", {
      fixture: "shoppingList.json",
    }).as("getShoppingList");

    // Czekamy na załadowanie listy zakupów
    cy.wait("@getShoppingList", { timeout: 10000 });

    // Sprawdzamy, że spinner zniknął po zakończeniu ładowania
    cy.get('[data-testid="loading-spinner"]').should("not.exist");

    // Sprawdzamy, czy wyświetla się poprawna liczba produktów na liście
    cy.get('[data-testid="shopping-list"]')
      .children()
      .should("have.length", 3)
      .each(($item, index) => {
        const productNames = ["Product 1", "Product 2", "Product 3"];
        cy.wrap($item).should("contain.text", productNames[index]);
      });
  });

  it("removes a product from the shopping list", () => {
    // Intercept dla pobrania początkowej listy zakupów
    cy.intercept("GET", "http://localhost:4000/api/shoppingList", {
      fixture: "shoppingList.json",
    }).as("getShoppingList");

    // Intercept dla usunięcia elementu z listy
    cy.intercept("DELETE", "http://localhost:4000/api/shoppingList/*", {
      statusCode: 200,
    }).as("deleteProduct");

    // Intercept dla odświeżonej listy po usunięciu elementu
    cy.intercept("GET", "http://localhost:4000/api/shoppingList", {
      fixture: "updatedShoppingList.json",
    }).as("refreshShoppingList");

    // Czekamy na załadowanie listy zakupów
    cy.wait("@getShoppingList", { timeout: 10000 });

    // Upewniamy się, że początkowo na liście są 3 elementy
    cy.get('[data-testid="shopping-list"]').children().should("have.length", 3);

    // Klikamy na pierwszy element, aby go usunąć
    cy.get('[data-testid="shopping-list"]').children().first().click();

    // Czekamy na zakończenie operacji DELETE
    cy.wait("@deleteProduct");

    // Czekamy na odświeżenie listy po usunięciu elementu
    cy.wait("@refreshShoppingList", { timeout: 10000 });

    // Sprawdzamy, czy liczba elementów w liście zmniejszyła się do 2
    cy.get('[data-testid="shopping-list"]').children().should("have.length", 2);
  });

  it("displays a loading spinner while fetching shopping list", () => {
    // Intercept z opóźnieniem dla symulacji wolnego połączenia
    cy.intercept("GET", "http://localhost:4000/api/shoppingList", {
      delay: 500,
      fixture: "shoppingList.json",
    }).as("getShoppingListWithDelay");

    cy.reload();

    // Sprawdzamy, czy spinner ładowania jest widoczny podczas ładowania
    cy.get('[data-testid="loading-spinner"]').should("be.visible");

    // Czekamy na zakończenie ładowania
    cy.wait("@getShoppingListWithDelay", { timeout: 10000 });

    // Sprawdzamy, czy spinner znika po zakończeniu ładowania
    cy.get('[data-testid="loading-spinner"]').should("not.exist");
  });
});
