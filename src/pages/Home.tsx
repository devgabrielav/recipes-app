import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesCategories from '../components/RecipesCategories/RecipesCategories';
import Recipes from '../components/Recipes';

export default function Home() {
  return (
    <>
      <Header />
      <RecipesCategories />
      <Recipes />
      <Footer />
    </>
  );
}
