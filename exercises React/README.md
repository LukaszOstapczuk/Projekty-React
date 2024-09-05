
# PS 10 - 09.06.2024 Testy - Unit / Integration / E2E Tests


# Zadanie 1 - Testy jednostkowe - Unit tests
Dukumentacja Jest - główna biblioteka (runner) do testowania - https://jestjs.io/docs/api - min. wywołuje asercje (excpect(...))

Dokumentacja React Testing Library - queries (wyszukiwanie elementów które są używane w porównaniu / asercji przez bibliotekę Jest) - https://testing-library.com/docs/queries/about/#overview
Dokumentacja jest-dom: https://github.com/testing-library/jest-dom

## Instalacja:

 `npm install react-scripts`
 
 `npm install @testing-library/dom`
 
 `npm install @testing-library/jest-dom`
 
 `npm install @testing-library/react`
 
` npm install @testing-library/user-event`

` npm install global-jsdom`

` npm install jsdom` `

 lub wszystko w jednej operacji

 `npm install react-scripts @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event global-jsdom jsdom`

Do pliku package.json w sekcji "script" dodajemy:
`"test": "react-scripts test"`

Komenda `npm run test` uruchamia automatycznie wszystkie testy zlokalizowane w plikach `... .test.js`

## Dodatkowe informacje
W kodzie zostały dodane dwa pliki pomocnicze:
- components/Login/Login-test.jsx - plik z testami (szablon)
- plik test-utils.tsx - wrapper do testów, w którym definiujemy "środowisko" uruchomieniowe każdego testu

## Cel zadania

W ramach tego zadania, napisz testy jednostkowe dla komponentu LoginPage.js (w pliku LoginPage.test.jsx który znajduje tym samym folderze). Komponent zawieta dwa pola tektowe login / password oraz przycisk do logowania który jest aktywny jeżeli oba pola są wypełnione. Test powinien co najmniej sprawdzać rzeczy opisane na poniższym zrzucie ekranu, który jednocześnie jest szablonem:
![image](https://user-images.githubusercontent.com/9209826/168443422-c8d14082-e8f5-4892-b71f-7a8e52c07e4d.png)

# Zadanie 2 - Automatyzacja - uruchamianie testów jednostkowych przed każdym commitem - git hook pre-commit

Częstą praktyką jest uruchamianie szybkich testów - jednostkowych przy każdym commicie, dzięki temu na bierząco mamy kontrolę, czy nie psujemy danej funkcjonalności. W ramach tego zadania włączymy taką automatyzację, użyjemy do tego git hook'a pre-commit.

Do łatwej integracji pre-commit git hooks użyjemy buiblioteki husky - https://typicode.github.io/husky/get-started.html

Instalacja: postępuj zgodnie z dokumentacją

Konfiguracja: do pliku .husky/pre-commit dodaj `npm  test  --  --watchAll=false`

Aby sprawdzić czy wszystko działa poprawnie, utówrz dowolny commit, testy powinny zostać odpalone automatycznie.
Jeżeli wszystkie testy będą "zielone", commit powinien się zatwierdzić, w przeciwnym wypadku doasnitemy informację o błędnych testach oraz przerwanie dodawania commita.

# Zadanie 3 - Testy E2E - Cypress
Dokumentacja: https://www.cypress.io/

Dukumentacja z listą dostępnych asercji - https://docs.cypress.io/api/commands/and#Syntax
Testy będziemy odpalać komendą `npx cypress open` - https://docs.cypress.io/guides/getting-started/opening-the-app

Po zainstalowaniu cypressa, odpal powyższą komendę i przejdź automatyczną komfigurację. Wygeneruj przykładowe testy aby mieć przykłady składni i asercji, które będziesz wykorzystywał.

W ramach tego zadania utwórz nowy plik `cypress/e2e/myTests.cy.js` w którym będą się znajdować nowo napisane testy.

Szablon z przykładowym testem poniżej :
![image](https://user-images.githubusercontent.com/9209826/168445139-95826247-4a18-4cee-ac58-df0168387efd.png)

W ramach tego zadania napisz tak dużo asercji (scenariuszy testowych) ile uda ci się wymyślić na podstawie tego jak działa aplikacja (weź pod uwagę opóźnienia, wywkakujące okienka, przekierowania itp)

Aby odwoływać się do kolejnych elementów jak poniżej
![image](https://user-images.githubusercontent.com/9209826/168445203-c54a04d5-fdd4-4e5e-8b95-d684fba94f49.png)

będziesz musiał na bierząco dodawać unikatowe właściwości do elementów w komponentach, powodzenia !.

Przykładowy scenariusz do testowania:
- wpisz login
- wpisz hasło
- kliknij na przycisk
- sprawdź url
- sprawdź czy strona zawiera wpisany login
- kliknij na przycisk "Załaduj lotniska"
- sprawdź czy po 2-ch sekundach kręci się spinner
- sprawdź czy po 4-rech sekundach widoczne jest przykładowe lotnisko
- kliknij na przykladowe lotnisko
- ......
