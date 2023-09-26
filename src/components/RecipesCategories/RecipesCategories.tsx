import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { layoutContext } from '../../context/layout/layoutContext';
import {
  fetchAllRecipes,
  fetchByCategory,
  fetchCategories,
} from '../../helper/helpersAPI';

interface Category {
  strCategory: string;
}

function RecipesCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { pathname } = useLocation();
  const [layout, setLayout] = useContext(layoutContext);
  const [category, setCategory] = useState<string>();

  useEffect(() => {
    (async () => setCategories(await fetchCategories(pathname)))();
  }, [pathname]);

  const fetchRecipes = async (newCategory: string) => {
    const ternary = newCategory === category ? '' : newCategory;
    setCategory(ternary);
    const data = ternary === '' ? await fetchAllRecipes(pathname)
      : await fetchByCategory(pathname, newCategory);

    setLayout({
      searchResults: {
        ...layout.searchResults,
        [pathname.replace('/', '')]: data,
      },
    });
  };

  const buttonAll = async () => {
    const data = await fetchAllRecipes(pathname);
    setLayout({
      searchResults: {
        ...layout.searchResults,
        [pathname.replace('/', '')]: data,
      },
    });
  };

  return (
    <div>
      <div>
        {categories.map((currCategory) => (
          <button
            onClick={ () => fetchRecipes(currCategory.strCategory) }
            key={ currCategory.strCategory }
            data-testid={ `${currCategory.strCategory}-category-filter` }
          >
            {currCategory.strCategory}
          </button>
        ))}
      </div>
      <button
        onClick={ buttonAll }
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
  );
}

export default RecipesCategories;
