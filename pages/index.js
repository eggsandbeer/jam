import { createClient } from "contentful"

import RecipeCard from '../components/RecipeCard'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  const resp = await client.getEntries({ content_type: 'recipe' })

  return {
    props: {
      recipes: resp.items
     }
  }
}

export default function Recipes({
  recipes
}) {

  console.log(recipes)

  return (
    <>
    <div className="recipe-list">
      {recipes.map((recipe) => {
        return (<RecipeCard key={recipe.sys.id} recipe={recipe} />)
      })}
    </div>

    <style jsx>{`
      .recipe-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px 60px;
      }
    `}
      </style>
      </>
  )
}