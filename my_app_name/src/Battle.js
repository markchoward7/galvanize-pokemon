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

function GetTypeAdvantage(pokemon1, pokemon2) {
    let advantageValue = 0

    // if 2x supereffective
    // advantageValue += 100
    // if supereffective
    // advantageValue += 50
    // if effective
    // no change
    // if resisted
    // advantageValue -= 25
    // if 2x resisted
    // advantageValue -= 75

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