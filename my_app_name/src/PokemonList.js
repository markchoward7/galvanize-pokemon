import React from 'react'

import Pokemon from './Pokemon'

function PokemonList({listOfPokemon, parent}) {
    return (
        <div className="grid-container-2">
            {listOfPokemon.map(pokemon => <Pokemon pokemon={pokemon} grandparent={parent} />)}
        </div>
    )
}

export default PokemonList