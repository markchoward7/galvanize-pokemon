import React from 'react'

import CapitalizeFirst from './CapitalizeFirst'

class Pokemon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grandparent: props.grandparent,
            pokemon: props.pokemon
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

    handleCollection() {
        if (this.state.grandparent.state.collection.includes(this.state.pokemon)) {
            let newCollection = this.state.grandparent.state.collection
            newCollection.splice(newCollection.indexOf(this.state.pokemon), 1)
            this.state.grandparent.setState({collection: newCollection})
        } else {
            this.state.grandparent.setState({collection: [...this.state.grandparent.state.collection, this.state.pokemon]})
        }
    }

    handleBattle() {
        if (this.state.grandparent.state.battle_pokemon.length >= 2) {
            return
        } else {
            this.state.grandparent.setState({battle_pokemon: [...this.state.grandparent.state.battle_pokemon, this.state.pokemon]})
        }
    }

    handleGetDetails() {
        this.state.grandparent.setState({current_detailed_pokemon: this.state.pokemon})
    }

    async handleSearchType(event) {
        let select = document.getElementById("type-select")
        select.value = event.target.innerText
        await this.state.grandparent.setState({
            current_search: event.target.innerText.toLowerCase()
        })
        this.state.grandparent.fetchTwenty(0)
    }

    render() {
        return (
            <div className="poke-card grid-container-3">
                <h4 className="poke-name" onClick={this.handleGetDetails.bind(this)}>{CapitalizeFirst(this.state.pokemon.name)}</h4>
                {this.state.pokemon.types.length === 1 ? <div><h5 className="type-name" onClick={this.handleSearchType.bind(this)}>{CapitalizeFirst(this.state.pokemon.types[0].type.name)}</h5></div> : <div><h5 className="type-name" onClick={this.handleSearchType.bind(this)}>{CapitalizeFirst(this.state.pokemon.types[0].type.name)}</h5> <span>-</span> <h5 className="type-name" onClick={this.handleSearchType.bind(this)}>{CapitalizeFirst(this.state.pokemon.types[1].type.name)}</h5></div> }
                {this.state.grandparent.state.looking_for_battle && this.state.grandparent.state.battle_pokemon.length < 2 ? <button className="battle-button" onClick={this.handleBattle.bind(this)}>Battle</button> : ""}
                <div className="row-2-3">
                    <img onClick={this.handleGetDetails.bind(this)} src={this.state.pokemon.sprites.front_default} />
                </div>
                <div className="row-2-3 column-2-3 grid-container-2">
                    <p>{this.state.pokemon.stats[0].base_stat} - HP</p>
                    <p>{this.state.pokemon.stats[1].base_stat} - Attack</p>
                    <p>{this.state.pokemon.stats[2].base_stat} - Defense</p>
                    <p>{this.state.pokemon.stats[3].base_stat} - Special Attack</p>
                    <p>{this.state.pokemon.stats[4].base_stat} - Special Defense</p>
                    <p>{this.state.pokemon.stats[5].base_stat} - Speed</p>
                </div>
                <div className="row-4 column-3 align-right">
                    <h5>Pokedex Number: {this.state.pokemon.id}</h5>
                </div>
                <div className="row-4">
                <br /><button onClick={this.handleCollection.bind(this)}>{this.state.grandparent.state.collection.includes(this.state.pokemon) ? "Remove from collection" : "Add to collection"}</button>
                </div>
            </div>
        )
    }
}

export default Pokemon