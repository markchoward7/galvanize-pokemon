import React from 'react'

import CapitalizeFirst from './CapitalizeFirst'

class PokeDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon: props.pokemon,
            current_move: {}
        }
    }
    async componentDidMount() {
        const response = await fetch(`https://pokeapi.co/api/v2/move/${this.state.pokemon.moves[0].move.name}`)
        const json = await response.json()
        this.setState({current_move: json})
    }

    async handleSelectChanged(event) {
        const response = await fetch(`https://pokeapi.co/api/v2/move/${event.target.value.toLowerCase()}`)
        const json = await response.json()
        this.setState({current_move: json})
    }

    render() {
        return (
            <div className="poke-card grid-container-3">
                <h4>{CapitalizeFirst(this.state.pokemon.name)}</h4>
                <h4 className="column-3">Pokedex Number: {this.state.pokemon.id}</h4>
                <div className="row-2-3">
                    <img src={this.state.pokemon.sprites.front_default} />
                </div>
                <div className="row-2-3 column-2-3 grid-container-2">
                    <p>{this.state.pokemon.stats[0].base_stat} - HP</p>
                    <p>{this.state.pokemon.stats[1].base_stat} - Attack</p>
                    <p>{this.state.pokemon.stats[2].base_stat} - Defense</p>
                    <p>{this.state.pokemon.stats[3].base_stat} - Special Attack</p>
                    <p>{this.state.pokemon.stats[4].base_stat} - Special Defense</p>
                    <p>{this.state.pokemon.stats[5].base_stat} - Speed</p>
                </div>
                <div className="row-4 column-1-3 grid-container-4">
                    Abilities:
                    {this.state.pokemon.abilities.map(ability => <p>{CapitalizeFirst(ability.ability.name)}</p>)}
                </div>
                <div className="row-5 column-1-3 grid-container-3">
                    <p>Available Moves:</p>
                    <select onChange={this.handleSelectChanged.bind(this)}>
                        {this.state.pokemon.moves.map(move => <option>{CapitalizeFirst(move.move.name)}</option>)}
                    </select>
                    <div className="grid-container-3">
                        <p>{this.state.current_move.power} - Power</p>
                        <p>{this.state.current_move.accuracy} - Accuracy</p>
                        <p>{this.state.current_move.priority} - Priority</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default PokeDetails