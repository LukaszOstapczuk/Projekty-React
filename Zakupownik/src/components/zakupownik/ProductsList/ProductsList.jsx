import { useContext } from "react";
import { ProductsContext } from "../../../context/ProductsContext";
import CircularIndeterminate from "../../common/CircularIndeterminate";
import Button from "@mui/material/Button";
import "../commonStyles.css";

const ProductsList = () => {
  const { filteredProducts, loading, loadProducts, addToShoppingList } =
    useContext(ProductsContext);

  return (
    <div className="productsListWrapper">
      <h2>Lista produktów:</h2>
      <Button variant="contained" onClick={loadProducts} disabled={loading}>
        Załaduj
      </Button>
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id} onClick={() => addToShoppingList(product)}>
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsList;
