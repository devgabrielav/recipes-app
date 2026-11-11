import { useState } from 'react';
import { getCheckedIngredients, setCheckedIngredients } from '../helper/storage';
import { RecipeKind } from '../utils/types';

type CheckedsType = Record<string, boolean>;

const toMap = (list: string[]): CheckedsType => list
  .reduce<CheckedsType>((acc, ingredient) => ({ ...acc, [ingredient]: true }), {});

const load = (kind: RecipeKind, id: string) => (id ? toMap(getCheckedIngredients(kind, id)) : {});

/** Ingredientes marcados de uma receita em andamento, persistidos no localStorage. */
function useSaveInProgressRecipe(id = '', kind: RecipeKind = 'meals') {
  const key = `${kind}:${id}`;
  const [state, setState] = useState(() => ({ key, map: load(kind, id) }));
  // Quando o id muda (a receita terminou de carregar), lê do storage na mesma renderização:
  // evita um frame com os ingredientes desmarcados.
  const checkeds = state.key === key ? state.map : load(kind, id);

  const onChange = (ingredient: string) => {
    const next = { ...checkeds, [ingredient]: !checkeds[ingredient] };
    setState({ key, map: next });
    if (id) {
      setCheckedIngredients(kind, id, Object.keys(next).filter((name) => next[name]));
    }
  };
  return { checkeds, onChange };
}

export default useSaveInProgressRecipe;
