import React from 'react';
import './App.css';

import Pokemon from './Pokemon'

const testPoke1 = {
  name: "ditto",
  id: 132,
  stats: [
    {base_stat: 48},
    {base_stat: 48},
    {base_stat: 48},
    {base_stat: 48},
    {base_stat: 48},
    {base_stat: 48},
  ],
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
  },
  types: [
    {
      type: {
        name: "normal"
      }
    }
  ]
}

const testPoke2 = {
  name: "bulbasaur",
  id: 1,
  stats: [
    {base_stat: 45},
    {base_stat: 49},
    {base_stat: 49},
    {base_stat: 65},
    {base_stat: 65},
    {base_stat: 45},
  ],
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  },
  types: [
    {
      type: {
        name: "grass"
      }
    },
    {
      type: {
        name: "poison"
      }
    }
  ]
}



class App extends React.Component {

  render() {
    return (
      <div className="App">
        Pokemon
        <div className="grid-container-3">
          <Pokemon pokemon={testPoke1}/>
          <Pokemon pokemon={testPoke2}/>
        </div>
  
      </div>
    );
  }
}

export default App;
