import React, {useCallback, useEffect, useState} from 'react';
import {supabase} from "../supabaseClient";

function Recipes({ username }) {
  const [recipes, setRecipes] = useState([])

  const [second, setSecond] = useState("")
  const [thesecond, setTheSecond] = useState("")

  useEffect(() => {
    const getRecipes = async () => {
      let { data, error } = await supabase
        .rpc('get_recipes', {
          username1_input: username,
          username2_input: second
        })

      if (error) console.error(error)
      else setRecipes(data)
    }
    getRecipes()
  }, [second, username])

  let recipes_list = []

  for (let i = 0; i < recipes.length; i++) {
    console.log(JSON.parse(recipes[i].ingredients))
    recipes_list.push(<div key={i}>
        <h3>{recipes[i].title}</h3>
        <h4>Ingredients:</h4>
        {JSON.parse(recipes[i].ingredients).map(a => <p>{a}</p>)}
        <h4>Directions:</h4>
      {JSON.parse(recipes[i].directions).map(a => <p>{a}</p>)}
      </div>
    )
  }

  return (
    <div>
      <input type="text" value={thesecond} onChange={e => setTheSecond(e.target.value)} />
      <button onClick={e => setSecond(thesecond)}>Find Recipes</button>

      <div className="recipes-list">
        {recipes_list}
      </div>
    </div>
  )
}

export default Recipes;