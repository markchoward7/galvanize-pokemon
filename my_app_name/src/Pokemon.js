import React from 'react'

function Pokemon({pokemon}) {
    return (
        <div className="poke-card grid-container-3">
            <h4>{CapitalizeFirst(pokemon.name)}</h4>
            <h5>{pokemon.types.length === 1 ? CapitalizeFirst(pokemon.types[0].type.name) : `${CapitalizeFirst(pokemon.types[0].type.name)} - ${CapitalizeFirst(pokemon.types[1].type.name)}` }</h5>
            <div className="row-2-4">
                <img src={pokemon.sprites.front_default} />
            </div>
            <div className="row-2-4 column-2-3 grid-container-2">
                <p>{pokemon.stats[0].base_stat} - HP</p>
                <p>{pokemon.stats[1].base_stat} - Attack</p>
                <p>{pokemon.stats[2].base_stat} - Defense</p>
                <p>{pokemon.stats[3].base_stat} - Special Attack</p>
                <p>{pokemon.stats[4].base_stat} - Special Defense</p>
                <p>{pokemon.stats[5].base_stat} - Speed</p>
            </div>
            <div className="row-5 column-2 align-right">
                <h5>Pokedex Number: {pokemon.id}</h5>
            </div>
            <div className="row-5">
                <br /><button>Add/remove to/from collection</button>
            </div>
        </div>
    )
}

function CapitalizeFirst(string) {
    return string[0].toUpperCase() + string.slice(1)
}

export default Pokemon