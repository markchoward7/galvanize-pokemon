import React from 'react'

import CapitalizeFirst from './CapitalizeFirst'

class PokeDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parent: props.parent,
            pokemon: props.pokemon,
            current_move: {}
        }
    }

    componentDidUpdate() {
        let typeHeaders = document.querySelectorAll(`.poke-card .type-name`)
        let color = ""
        for (const type of typeHeaders) {
            switch (type.innerText) {
                case "Bug":
                    color = "#A8B820"
                    break
                case "Dark":
                    color = "#705848"
                    break
                case "Dragon":
                    color = "#7038F8"
                    break;
                case "Electric":
                    color = "#F8D030"
                    break;
                case "Fairy":
                    color = "#EE99AC"
                    break
                case "Fighting":
                    color = "#C03028"
                    break
                case "Fire":
                    color = "#F08030"
                    break
                case "Flying":
                    color = "#A890F0"
                    break
                case "Ghost":
                    color = "#705898"
                    break
                case "Grass":
                    color = "#78C850"
                    break
                case "Ground":
                    color = "#E0C068"
                    break
                case "Ice":
                    color = "#98D8D8"
                    break
                case "Normal":
                    color = "#A8A878"
                    break
                case "Poison":
                    color = "#A040A0"
                    break
                case "Psychic":
                    color = "#F85888"
                    break
                case "Rock":
                    color = "#B8A038"
                    break
                case "Steel":
                    color = "#B8B8D0"
                    break
                case "Water":
                    color = "#6890F0"
                    break
                default:
                    color = "#68A090"
                    break
            }
            type.style.color = color
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

    async handleSearchType(event) {
        let select = document.getElementById("type-select")
        select.value = event.target.innerText
        await this.state.parent.setState({
            current_search: event.target.innerText.toLowerCase(),
            current_detailed_pokemon: null
        })
        this.state.parent.fetchTwenty(0)
    }

    render() {
        return (
            <div className="poke-card grid-container-3">
                <h4>{CapitalizeFirst(this.state.pokemon.name)}</h4>
                {this.state.pokemon.types.length === 1 ? <div><h5 className="type-name" onClick={this.handleSearchType.bind(this)}>{CapitalizeFirst(this.state.pokemon.types[0].type.name)}</h5></div> : <div><h5 className="type-name" onClick={this.handleSearchType.bind(this)}>{CapitalizeFirst(this.state.pokemon.types[0].type.name)}</h5> <span>-</span> <h5 className="type-name" onClick={this.handleSearchType.bind(this)}>{CapitalizeFirst(this.state.pokemon.types[1].type.name)}</h5></div> }
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
                        <p className="type-name" onClick={this.handleSearchType.bind(this)}>{this.state.current_move.type ? CapitalizeFirst(this.state.current_move.type.name) : "No Type"}</p>
                        <p>{this.state.current_move.pp} - PP</p>
                        <div className="row-2 column-1-3 grid-container-3">
                            <p>{this.state.current_move.power} - Power</p>
                            <p>{this.state.current_move.accuracy} - Accuracy</p>
                            <p>{this.state.current_move.priority} - Priority</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PokeDetails