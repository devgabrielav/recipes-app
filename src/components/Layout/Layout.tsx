import { Outlet } from 'react-router-dom';
import Header from '../Header';
import { RouteType } from '../Recipes/Recipes';
import RecipesCategories from '../RecipesCategories/RecipesCategories';

function Layout({ recipe }: RouteType) {
  if (recipe === 'meals') {
    return (
      <div>
        <Header title="Meals" />
        <RecipesCategories />
        <Outlet />
      </div>
    );
  }
  return (
    <div>
      <Header title="Drinks" />
      <RecipesCategories />
      <Outlet />
    </div>
  );
}

export default Layout;
