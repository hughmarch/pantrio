import React, {useEffect, useState} from 'react';

function Pantry() {
  const allIngredients = ["apple", "apricot", "banana", "carrot"]
  const units = ["teaspoons", "tablespoons", "ounces", "cups", "pints", "quarts"]
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [ingredients, setIngredients] = useState([])

  // useEffect(() => {
  //   loadUsers();
  // }, [])

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
      name: name,
      quantity: 1,
      unit: "teaspoons"
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

  let ingredientList = []

  for (let i = 0; i < ingredients.length; i++) {
    ingredientList.push(<div className={"ingredient-item"} key={i}>
      <p>{ingredients[i].name}</p>
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

      <button>Save</button>
    </div>
  )
}

export default Pantry;