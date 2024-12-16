import { useContext, useEffect } from "react";
import { ProductsContext } from "../../../context/ProductsContext";
import "../commonStyles.css";
import CircularIndeterminate from "../../common/CircularIndeterminate";

const ShoppingList = () => {
  const {
    shoppingList,
    removeFromShoppingList,
    fetchShoppingList,
    shoppingListLoading,
  } = useContext(ProductsContext);

  useEffect(() => {
    fetchShoppingList(); // Pobierz listę zakupów przy montowaniu komponentu
  }, [fetchShoppingList]);

  // Funkcja obsługująca usunięcie produktu i odświeżenie listy
  const handleRemoveProduct = async (productId) => {
    await removeFromShoppingList(productId); // Usunięcie produktu
    fetchShoppingList(); // Odświeżenie listy zakupów
  };

  return (
    <div className="App">
      <header className="shoppingListWrapper">
        <h2>Lista zakupów:</h2>
        {shoppingListLoading ? (
          <CircularIndeterminate data-testid="loading-spinner" />
        ) : (
          <ul data-testid="shopping-list">
            {shoppingList.map((product) => (
              <li
                key={product.id}
                onClick={() => handleRemoveProduct(product.id)}
                data-testid={`shopping-item-${product.id}`}
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
};

export default ShoppingList;
