import React from 'react';
import './App.css';

import PokemonList from './PokemonList'
import Battle from './Battle';
import CapitalizeFirst from './CapitalizeFirst'

const types = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "ice", "dragon", "dark", "fairy"]
class App extends React.Component {

  state = {
    pokemon_links_all: [],
    current_pokemon: [],
    pokemon_links_by_type: {},
    current_search: "all",
    current_end_index: 0,
    collection: [],
    looking_for_battle: false,
    battle_pokemon: []
  }

  async componentDidMount() {
    const responseAll = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
    const jsonAll = await responseAll.json()
    this.setState({pokemon_links_all: jsonAll.results})
    
    this.fetchTwenty(0)
    
    const responseByType = await fetch("https://pokeapi.co/api/v2/type")
    const jsonByType = await responseByType.json()
    const resultsByType = jsonByType.results
    for (const type of resultsByType) {
      const typeResponse = await fetch(type.url)
      const typeJson = await typeResponse.json()
      let typeObject = {}
      typeObject[type.name] = typeJson.pokemon
      this.setState({pokemon_links_by_type : Object.assign(this.state.pokemon_links_by_type, typeObject)})
    }
  }

  async fetchTwenty(index) {
    await this.setState({current_pokemon: []})
    let itemsToFetch = []
    if (this.state.current_search === "all") {
      itemsToFetch = this.state.pokemon_links_all.slice(index, index+20)
    } else if (types.includes(this.state.current_search)) {
      itemsToFetch = this.state.pokemon_links_by_type[this.state.current_search].slice(index, index+20)
    } else if (this.state.current_search === "collection") {
      itemsToFetch = this.state.collection.slice(index, index+20)
      this.setState({current_pokemon: itemsToFetch})
      return
    } else {
      for (var i = 0; i < this.state.pokemon_links_all.slice(index).length; i++) {
        if (this.state.pokemon_links_all.slice(index)[i].name.includes(this.state.current_search)) {
          itemsToFetch.push(this.state.pokemon_links_all.slice(index)[i])
          if (itemsToFetch.length >= 20) {
            index = i - 19
            break
          }
        }
      }
    }
    for (const item of itemsToFetch) {
      let response = ""
      if (item.url) {
        response = await fetch(item.url)
      } else {
        response = await fetch(item.pokemon.url)
      }
      const json = await response.json()
      this.setState({current_pokemon: [...this.state.current_pokemon, json], current_end_index: index+20})
    }
  }

  handleNext() {
    this.fetchTwenty(this.state.current_end_index)
  }

  handlePrevious() {
    this.fetchTwenty(this.state.current_end_index-40)
  }

  async handleCollectionSearch() {
    await this.setState({current_search: "collection"})
    this.fetchTwenty(0)
  }

  async handleSelectChange(event) {
    event.preventDefault()
    let value = event.target.value
    if (value !== "---") {
      await this.setState({current_search: value.toLowerCase()})
    } else {
      await this.setState({current_search: "all"})
    }
    this.fetchTwenty(0)
  }

  async handleTextChange(event) {
    if (event.target.value === "") {
      await this.setState({current_search: "all"})
    } else {
      await this.setState({current_search: event.target.value.toLowerCase()})
    }
    this.fetchTwenty(0)
  }

  render() {
    return (
      <div className="App">
        <div className="side-bar">
          Search
          <select id="type-select" onChange={this.handleSelectChange.bind(this)}>
            <option>---</option>
            {types.map(type => <option>{CapitalizeFirst(type)}</option>)}
          </select>
          <input type="search" className="search-field" placeholder="name..." onChange={this.handleTextChange.bind(this)}/>
          <button onClick={this.handleCollectionSearch.bind(this)}>View Collection</button>
          <br /><Battle parent={this} />
        </div>
        <div className="main">
          Pokemon   
          <PokemonList listOfPokemon={this.state.current_pokemon} parent={this}/>
        </div>
        <div className="bottom-bar">
          <button onClick={this.handlePrevious.bind(this)}>Previous</button>
          <button onClick={this.handleNext.bind(this)}>Next</button>
        </div>
      </div>
    );
  }
}

export default App;
