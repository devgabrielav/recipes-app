import Header from '../Header';
import Recipes, { RouteType } from '../Recipes/Recipes';

function Layout({ recipe }: RouteType) {
  if (recipe === 'meals') {
    return (
      <div>
        <Header title="Meals" />
        <Recipes recipe="meals" />
      </div>
    );
  }
  return (
    <div>
      <Header title="Drinks" />
      <Recipes recipe="drinks" />
    </div>
  );
}

export default Layout;
