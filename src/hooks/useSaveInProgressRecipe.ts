import { useEffect, useState } from 'react';

type CheckedsType = {
  [ingredient: string]: boolean;
};
const loadByid = (id: string) => {
  const inProgress = JSON.parse(localStorage
    .getItem('inProgressRecipes') || '{}');

  return inProgress[id] ? inProgress[id] : {} as CheckedsType;
};

const save = (id: string, checkeds: CheckedsType) => {
  const inProgress = JSON.parse(localStorage
    .getItem('inProgressRecipes') || '{}');
  localStorage.setItem('inProgressRecipes', JSON.stringify(
    {
      ...inProgress,
      [id]: checkeds,
    },
  ));
};
function useSaveInProgressRecipe(id = '') {
  const [checkeds, setCheckeds] = useState<CheckedsType>(loadByid(id || ''));
  useEffect(() => {
    setCheckeds(loadByid(id));
  }, [id]);

  const onChange = (ingredient: string) => {
    const newCheckeds = { ...checkeds, [ingredient]: !checkeds[ingredient] };

    setCheckeds(newCheckeds);
    save(id, newCheckeds);
  };
  return { checkeds, onChange };
}

export default useSaveInProgressRecipe;
