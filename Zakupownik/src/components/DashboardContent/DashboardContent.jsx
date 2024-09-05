import "./DashboardContent.css";
import ProductsList from "../zakupownik/ProductsList/ProductsList";
import ShopingList from "../zakupownik/ShopingList/ShopingList";

function DashboardContent() {
  return (
    <div className="dashboardWrapper">
      <div className="mainContent">
        <div className="productsListWrapper">
          <ProductsList />
        </div>
        <div className="shoppingListWrapper">
          <ShopingList />
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;
