import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeType = event => this.setState({ filters: {type: event.target.value} })

  handleFindPetsFetch = () => {
    fetch(`/api/pets${this.state.filters.type !== "all" ? "?type=" + this.state.filters.type : ""}`)
    .then(res => res.json())
    .then(pets => this.setState({ pets: pets }))
  }

  handleAdoptPet = (petId) => {
    let adopt = this.state.pets.find(pet => pet.id === petId)
    adopt.isAdopted = true
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.handleFindPetsFetch} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
