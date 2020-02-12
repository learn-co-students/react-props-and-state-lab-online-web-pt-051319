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

  changeType = (type) => {
    this.setState({filters: {...this.state.filters, type: type}})
  }

  findPets = () => {
    fetch(
      this.state.filters.type === "all"
        ? "/api/pets"
        : `/api/pets?type=${this.state.filters.type}`
    )
      .then(resp => resp.json())
      .then(data => this.setState({pets: data}))
  }

  adoptPet = (id) => {
    let adoptee = this.state.pets.find(pet => pet.id === id)
    adoptee.isAdopted = true
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
              <Filters onChangeType={this.changeType} onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
