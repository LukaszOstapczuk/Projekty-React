import React, { createContext, useState, useCallback } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const [shoppingListLoading, setShoppingListLoading] = useState(false);

  const fetchShoppingList = useCallback(async () => {
    setShoppingListLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/shoppingList");
      const data = await response.json();
      setShoppingList(data);
    } catch (error) {
      console.error("Error fetching shopping list:", error);
    } finally {
      setShoppingListLoading(false);
    }
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/productsList");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToShoppingList = async (product) => {
    try {
      await fetch("http://localhost:4000/api/shoppingList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      fetchShoppingList();
    } catch (error) {
      console.error("Error adding to shopping list:", error);
    }
  };

  const removeFromShoppingList = async (productId) => {
    try {
      await fetch(`http://localhost:4000/api/shoppingList/${productId}`, {
        method: "DELETE",
      });
      fetchShoppingList();
    } catch (error) {
      console.error("Error removing from shopping list:", error);
    }
  };

  const filterProducts = useCallback(
    (name = "", category = "", isFood = false) => {
      const filtered = products.filter((product) => {
        const matchesName = product.name
          .toLowerCase()
          .includes(name.toLowerCase());
        const matchesCategory = category ? product.category === category : true;
        const matchesFood = isFood ? product.isFood : true;
        return matchesName && matchesCategory && matchesFood;
      });
      setFilteredProducts(filtered);
    },
    [products]
  );

  const getCategories = useCallback(() => {
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    return categories;
  }, [products]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        filteredProducts,
        setProducts,
        loading,
        setLoading,
        shoppingList,
        addToShoppingList,
        removeFromShoppingList,
        fetchShoppingList,
        shoppingListLoading,
        loadProducts,
        filterProducts,
        getCategories,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
