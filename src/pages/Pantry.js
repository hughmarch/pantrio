import React, {useEffect, useState} from 'react';
import {supabase} from "../supabaseClient";

function Pantry({ username }) {
  const [allIngredients, setAllIngredients] = useState([])
  const units = ["teaspoons", "tablespoons", "ounces", "cups", "pints", "quarts"]
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    const loadPantry = async () => {
      let { data, error } = await supabase
        .from('Pantries')
        .select('*')
        .eq('username', username)

      if (error) console.error(error)
      else setIngredients(data)
    }

    const loadIngredients = async () => {
      let { data, error } = await supabase
        .from('distinct_ingredients')
        .select('*')

      if (error) console.error(error)
      else setAllIngredients(data.map(entry => entry.ingredient).sort())
    }
    loadPantry()
    loadIngredients()
  }, [username])

  const onChangeHandler = text => {
    let matches = []
    if (text.length > 0) {
      matches = allIngredients.filter(ingredient => {
        const regex = new RegExp(`${text}`, 'gi')
        return ingredient.match(regex)
      })
    }
    setSuggestions(matches)
    setText(text)
  }

  const onSuggestHandler = text => {
    setText(text)
    setSuggestions([])
    addIngredient(text)
  }

  const addIngredient = name => {
    setIngredients([...ingredients, {
      ingredient: name,
      quantity: 1,
      unit: "teaspoons",
      username: username
    }])
  }

  const removeIngredient = i => {
    const newIngredients = [...ingredients];
    newIngredients.splice(i, 1);
    setIngredients(newIngredients);
  }

  const changeQuantity = (i, quantity) => {
    const newIngredients = [...ingredients]
    newIngredients[i].quantity = quantity
    setIngredients(newIngredients)
  }

  const changeUnits = (i, unit) => {
    const newIngredients = [...ingredients]
    newIngredients[i].unit = unit
    setIngredients(newIngredients)
  }

  const save = async () => {
    const { data, error } = await supabase
      .from('Pantries')
      .delete()
      .eq('username', username)

    if (error) {
      console.error(error)
      return
    }

    const { data1, error1 } = await supabase
      .from('Pantries')
      .insert(ingredients)

    if (error1) {
      console.error(error1)
    }
  }

  let ingredientList = []

  for (let i = 0; i < ingredients.length; i++) {
    ingredientList.push(<div className={"ingredient-item"} key={i}>
      <p>{ingredients[i].ingredient}</p>
      <input type="number" value={ingredients[i].quantity} onChange={e => changeQuantity(i, e.target.value)}/>
      <select value={ingredients[i].unit} onChange={e => changeUnits(i, e.target.value)}>
        {units.map(unit => <option value={unit}>{unit}</option>)}
      </select>
      <button onClick={e => removeIngredient(i)}>Remove</button>
    </div>)
  }

  return (
    <div className="pantry-page">
      <input type="text" className="ingredient-input"
             onChange={e => onChangeHandler(e.target.value)} value={text}
             onBlur={() => {
               setTimeout(() => {
                 setSuggestions([])
               }, 100)
             }}
      />

      {suggestions && suggestions.map((suggestion, i) =>
        <div key={i} onClick={e => onSuggestHandler(suggestion)}>{suggestion}</div>)}

      <button onClick={e => addIngredient(text)}>Add</button>

      <div className="ingredients-list">
        {ingredientList}
      </div>

      <button onClick={e => save()}>Save</button>
    </div>
  )
}

export default Pantry;