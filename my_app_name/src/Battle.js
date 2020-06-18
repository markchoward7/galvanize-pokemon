import React from 'react'

import CapitalizeFirst from './CapitalizeFirst'

class Battle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parent: props.parent
        }
    }

    handleLookingForBattle() {
        this.state.parent.setState({looking_for_battle: true})
    }

    handleClearBattle() {
        this.state.parent.setState({
            looking_for_battle: false,
            battle_pokemon: []
        })
    }

    handleFight() {
        DisplayWinner(DetermineWinner(this.state.parent.state.battle_pokemon[0], this.state.parent.state.battle_pokemon[1]))
    }

    render() {
        return (
            <div>
                {this.state.parent.state.looking_for_battle ? "" : <button onClick={this.handleLookingForBattle.bind(this)}>Battle Pokemon</button>}
                <br />
                {this.state.parent.state.battle_pokemon[0] ? <div><button onClick={this.handleClearBattle.bind(this)}>Clear Battle</button><p id="first-poke">{CapitalizeFirst(this.state.parent.state.battle_pokemon[0].name)}</p></div> : ""}
                <br />
                {this.state.parent.state.battle_pokemon[1] ? <div><p>vs</p><br /><p id="second-poke">{CapitalizeFirst(this.state.parent.state.battle_pokemon[1].name)}</p><br /><button onClick={this.handleFight.bind(this)}>Determine Winner</button></div> : ""}
            </div>
        )
    }
}

function DetermineWinner(pokemon1, pokemon2) {
    let battleValue = 0
    if (pokemon1.stats[5].base_stat > pokemon2.stats[5].base_stat) {
        battleValue += 50
    } else if (pokemon2.stats[5].base_stat > pokemon1.stats[5].base_stat) {
        battleValue -= 50
    }

    for (var i = 0; i < 5; i++) {
        battleValue += pokemon1.stats[i].base_stat - pokemon2.stats[i].base_stat
    }

    let poke1Advantage = GetTypeAdvantage(pokemon1, pokemon2)
    let poke2Advantage = GetTypeAdvantage(pokemon2, pokemon1)

    battleValue += poke1Advantage
    battleValue -= poke2Advantage

    return battleValue > 0
}

const typeAdvantages = {
    normal: [],
    fire: ["grass", "ice", "bug", "steel"],
    water: ["fire", "ground", "rock"],
    electric: ["water", "flying"],
    grass: ["water", "ground", "rock"],
    ice: ["grass", "ground", "flying", "dragon"],
    fighting: ["normal", "ice", "rock", "dark", "steel"],
    poison: ["grass"],
    ground: ["fire", "electric", "poison", "rock", "steel"],
    flying: ["grass", "fighting", "bug"],
    psychic: ["fighting", "poison"],
    bug: ["grass", "psychic", "dark"],
    rock: ["fire", "ice", "ground", "psychic"],
    ghost: ["psychic", "ghost"],
    dragon: ["dragon"],
    dark: ["psychic", "ghost"],
    steel: ["ice", "rock"]
}
const typeDisadvantages = {
    normal: ["rock", "steel"],
    fire: ["fire", "water", "rock", "dragon"],
    water: ["water", "grass", "dragon"],
    electric: ["electric", "grass", "dragon"],
    grass: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"],
    ice: ["fire", "water", "ice", "steel"],
    fighting: ["poison", "flying", "psychic", "bug"],
    poison: ["poison", "ground", "rock", "ghost"],
    ground: ["grass", "bug"],
    flying: ["electric", "rock", "steel"],
    psychic: ["psychic", "steel"],
    bug: ["fire", "fighting", "poison", "flying", "ghost", "steel"],
    rock: ["fighting", "ground", "steel"],
    ghost: ["dark", "steel"],
    dragon: ["steel"],
    dark: ["fighting", "dark", "steel"],
    steel: ["fire", "water", "electric", "steel"]
}
const typeImmunities = {
    normal: ["ghost"],
    fire: [],
    water: [],
    electric: ["ground"],
    grass: [],
    ice: [],
    fighting: ["ghost"],
    poison: ["steel"],
    ground: ["flying"],
    flying: [],
    psychic: ["dark"],
    bug: [],
    rock: [],
    ghost: ["normal"],
    dragon: [],
    dark: [],
    steel: []
}

function GetTypeAdvantage(pokemon1, pokemon2) {
    let advantageValue = 0
    
    for (const poke1Type of pokemon1.types) {
        let superEffective = 0
        for (const poke2Type of pokemon2.types) {
            if (typeAdvantages[poke1Type.type.name].includes(poke2Type.type.name)) {
                superEffective++
            }
        }
        if (superEffective === 2) {
            advantageValue = 100
            break
        } else if (superEffective === 1) {
            advantageValue = 50
        }
    }
    
    if (advantageValue === 0) {
        for (const poke1Type of pokemon1.types) {
            let notEffective = 0
            for (const poke2Type of pokemon2.types) {
                if (typeDisadvantages[poke1Type.type.name].includes(poke2Type.type.name)) {
                    notEffective++
                }
            }
            if (notEffective === 0) {
                advantageValue = 0
                for(const poke2Type of pokemon2.types) {
                    if (typeImmunities[poke1Type.type.name].includes(poke2Type.type.name)) {
                        advantageValue = -1000
                    }
                }
                if (advantageValue === 0) {
                    break
                }
            } else if(notEffective === 1) {
                advantageValue = -25
            } else if (advantageValue === 0 || advantageValue === -1000) {
                advantageValue = -75
            }
        }
    }

    return advantageValue
}

function DisplayWinner(firstWon) {
    if (firstWon) {
        document.getElementById("first-poke").style.color = "#00ff00"
        document.getElementById("second-poke").style.color = "#ff0000"
    } else {
        document.getElementById("second-poke").style.color = "#00ff00"
        document.getElementById("first-poke").style.color = "#ff0000"
    }
}

export default Battle