import React from 'react'
import Pokemon from './Pokemon'

function PokemonList(pokedex) {
  const pokeList = pokedex.map((pokemon, index) => 
  { return ( <Pokemon pokemon = {pokemon}/>)
  });

  return (<div> {PokemonList} </div>)

  export default PokemonList