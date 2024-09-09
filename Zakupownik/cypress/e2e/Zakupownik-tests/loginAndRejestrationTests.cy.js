describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5000/signOut");
  });

  afterEach(() => {
    // Czyszczenie localStorage po każdym teście
    cy.window().then((win) => {
      win.localStorage.removeItem("availableUsers");
    });
  });

  it("registers a new user", () => {
    // Testuje formularz rejestracji
    cy.get('[data-testid="register-username-input"]').type("Jacek");
    cy.get('[data-testid="register-password-input"]').type("123");
    cy.get('[data-testid="register-submit"]').click();

    // Sprawdzenie przekierowania na dashboard po rejestracji
    cy.url().should("include", "/dashboard");

    // Sprawdzenie zapisania użytkownika w localStorage
    cy.window().then((win) => {
      const availableUsers = JSON.parse(
        win.localStorage.getItem("availableUsers")
      );
      expect(availableUsers).to.deep.include({
        username: "Jacek",
        password: "123",
      });
    });
  });

  it("logs in an existing user", () => {
    // Dodaj użytkownika do localStorage przed testem
    cy.window().then((win) => {
      win.localStorage.setItem(
        "availableUsers",
        JSON.stringify([{ username: "Jacek", password: "123" }])
      );
    });

    // Testuje formularz logowania
    cy.get('[data-testid="login-username-input"]').type("Jacek");
    cy.get('[data-testid="login-password-input"]').type("123");
    cy.get('[data-testid="login-submit"]').click();

    // Sprawdzenie przekierowania na dashboard po logowaniu
    cy.url().should("include", "/dashboard");
  });

  it("shows error for wrong credentials", () => {
    // Testuje formularz logowania z błędnymi danymi
    cy.get('[data-testid="login-username-input"]').type("Nieznany");
    cy.get('[data-testid="login-password-input"]').type("błędnehasło");
    cy.get('[data-testid="login-submit"]').click();

    // Sprawdzenie, czy pojawia się komunikat o błędzie
    cy.contains("Niepoprawna nazwa użytkownika lub hasło").should("be.visible");
  });

  it("shows error for existing user in registration", () => {
    // Dodaj użytkownika do localStorage przed testem
    cy.window().then((win) => {
      win.localStorage.setItem(
        "availableUsers",
        JSON.stringify([{ username: "Jacek", password: "123" }])
      );
    });

    // Testuje formularz rejestracji
    cy.get('[data-testid="register-username-input"]').type("Jacek");
    cy.get('[data-testid="register-password-input"]').type("123");
    cy.get('[data-testid="register-submit"]').click();

    // Sprawdzenie, czy pojawia się komunikat o błędzie
    cy.contains("Użytkownik już istnieje").should("be.visible");
  });
});
