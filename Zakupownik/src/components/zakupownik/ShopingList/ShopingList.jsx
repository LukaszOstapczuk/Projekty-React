import { useContext, useEffect } from "react";
import { ProductsContext } from "../../../context/ProductsContext";
import "../commonStyles.css";
import CircularIndeterminate from "../../common/CircularIndeterminate";

const ShopingList = () => {
  const {
    shoppingList,
    removeFromShoppingList,
    fetchShoppingList,
    shoppingListLoading,
  } = useContext(ProductsContext);

  useEffect(() => {
    fetchShoppingList();
  }, []);

  return (
    <div className="App">
      <header className="shoppingListWrapper">
        <h2>Lista zakupów:</h2>
        {shoppingListLoading ? (
          <CircularIndeterminate />
        ) : (
          <ul>
            {shoppingList.map((product) => (
              <li
                key={product.id}
                onClick={() => removeFromShoppingList(product.id)}
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

export default ShopingList;
