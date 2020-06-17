import React from 'react'
<<<<<<< HEAD
import Pokemon from './Pokemon'

function PokemonList(pokedex) {
  const pokeList = pokedex.map((pokemon, index) => 
  { return ( <Pokemon pokemon = {pokemon}/>)
  });

  return (<div> {PokemonList} </div>)

  export default PokemonList
=======

import Pokemon from './Pokemon'

function PokemonList({listOfPokemon, parent}) {
    return (
        <div className="grid-container-2">
            {listOfPokemon.map(pokemon => <Pokemon pokemon={pokemon} grandparent={parent} />)}
        </div>
    )
}

export default PokemonList
>>>>>>> 70557caa5d1a547c47428513e0d4461dfaf309cb
