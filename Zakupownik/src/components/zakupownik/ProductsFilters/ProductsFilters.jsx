import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../../../context/ProductsContext";
import "../commonStyles.css";

const ProductFilters = () => {
  const { filterProducts, getCategories } = useContext(ProductsContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isFood, setIsFood] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(getCategories());
  }, [getCategories]);

  useEffect(() => {
    filterProducts(name, category, isFood);
  }, [name, category, isFood, filterProducts]);

  const handleCheckboxChange = () => {
    setIsFood((prevIsFood) => !prevIsFood);
  };

  return (
    <div className="Wrapper">
      <input
        type="text"
        placeholder="Nazwa"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Wszystkie kategorie</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <label>
        Tylko produkty spożywcze
        <input
          type="checkbox"
          checked={isFood}
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
};

export default ProductFilters;
