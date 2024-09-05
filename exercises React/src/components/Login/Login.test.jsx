import "@testing-library/jest-dom";
import { cleanup, screen, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { render } from "../../../test-utils";
import Login from "./Login";

// poniższa komenda automatycznie czyści dane związane z testami
// dzięki temu nie dojdzie do sytuacji aby jeden z nich mógł wpływac na inny
afterEach(cleanup);

it("LoginPage component should be rendered properly", () => {
  // sprawdzamy tu jedynie poprawne wyrenderowanie komponentu - metoda render z testing-library
});

it('After render "Sign in" button should be disabled', () => {
  // po wyrenderowaniu przycisk powinien być nieaktywny, sprawdzamy to metodą "..... .toBeDisabled()"
});

it('"Sign in" button should enabled after fill both input fields', async () => {
  // po wyrenderowaniu przycisk powinien być nieaktywny
  // uzupełnij dwa pola tekstowe
  // sprawdź czy przycisk jest aktywny
});
