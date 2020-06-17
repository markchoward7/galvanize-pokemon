import React from 'react'

class Pokemon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grandparent: props.grandparent,
            pokemon: props.pokemon
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

    render() {
        return (
            <div className="poke-card grid-container-3">
                <h4>{CapitalizeFirst(this.state.pokemon.name)}</h4>
                <h5>{this.state.pokemon.types.length === 1 ? CapitalizeFirst(this.state.pokemon.types[0].type.name) : `${CapitalizeFirst(this.state.pokemon.types[0].type.name)} - ${CapitalizeFirst(this.state.pokemon.types[1].type.name)}` }</h5>
                <div className="row-2-4">
                    <img src={this.state.pokemon.sprites.front_default} />
                </div>
                <div className="row-2-4 column-2-3 grid-container-2">
                    <p>{this.state.pokemon.stats[0].base_stat} - HP</p>
                    <p>{this.state.pokemon.stats[1].base_stat} - Attack</p>
                    <p>{this.state.pokemon.stats[2].base_stat} - Defense</p>
                    <p>{this.state.pokemon.stats[3].base_stat} - Special Attack</p>
                    <p>{this.state.pokemon.stats[4].base_stat} - Special Defense</p>
                    <p>{this.state.pokemon.stats[5].base_stat} - Speed</p>
                </div>
                <div className="row-5 column-2 align-right">
                    <h5>Pokedex Number: {this.state.pokemon.id}</h5>
                </div>
                <div className="row-5">
                <br /><button onClick={this.handleCollection.bind(this)}>{this.state.grandparent.state.collection.includes(this.state.pokemon) ? "Remove from collection" : "Add to collection"}</button>
                </div>
            </div>
        )
    }
}

function CapitalizeFirst(string) {
    return string[0].toUpperCase() + string.slice(1)
}

export default Pokemon