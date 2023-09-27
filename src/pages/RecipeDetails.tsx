import { Center, Heading, Img, UnorderedList, ListItem, Card,
  Container,
  Text } from '@chakra-ui/react';
import useRecipesDetails from '../components/hooks/useRecipesDetails';

export default function RecipeDetails() {
  const data = useRecipesDetails();
  if (!data) return (<div>Loading...</div>);
  const ingredients = Object.keys(data).filter((key) => (key
    .includes('strIngredient')) || (key
    .includes('strMeasure')))
    .reduce<string[]>((arr, key) => {
    const ingredient = data[key as keyof typeof data];
    if (ingredient) {
      arr.push(ingredient);
    }
    return arr;
  }, []);
  console.log(data);

  return (
    <>
      <Center flexDirection="column">
        <Img
          src={ data.img }
          alt={ data.str }
          height={ 162 }
          data-testid="recipe-photo"
        />
        <Heading data-testid="recipe-title">{ data.str }</Heading>
        <Text data-testid="recipe-category">{ data.strCategory }</Text>
      </Center>
      <Container>
        <Heading>Ingredients</Heading>
        <Card>
          <UnorderedList>
            {ingredients.map((ingredient, index) => (
              <ListItem
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ ingredient }
              >
                {ingredient}
              </ListItem>
            ))}
          </UnorderedList>
        </Card>
        <Heading>Instructions</Heading>
        <Card padding={ 4 }>
          <p data-testid="instructions">{data.strInstructions}</p>
        </Card>
        {data.strYoutube && (
          <>
            <Heading>Video</Heading>
            <Card>
              <Center>
                <iframe
                  title="video"
                  width="352"
                  height="198"
                  src={ data.strYoutube.replace('watch?v=', 'embed/') }
                  data-testid="video"
                />
              </Center>
            </Card>
          </>
        )}

      </Container>
    </>
  );
}
