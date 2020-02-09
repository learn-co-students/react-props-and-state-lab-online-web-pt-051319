import React from "react"

import Filters from "./Filters"
import PetBrowser from "./PetBrowser"

class App extends React.Component {

  state = {
    pets: [],
    filters: {
      type: "all"
    }
  }

  handleChangeType = event => this.setState({ filters: { type: event.target.value }})

  handleFindPetsClick = (event) => {
    fetch(`/api/pets${ this.state.filters.type === "all" ? "" : "?type=" + this.state.filters.type}`)
    .then(r => r.json())
    .then(rj => this.setState({ pets: rj }))
  }

  handleAdoptPet = (petId) =>  {
    this.setState({
      pets: this.state.pets.map(pet => {
        return {
          ...pet,
          isAdopted: pet.isAdopted || petId === pet.id
        }
      })
    })
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
              <Filters onChangeType={ this.handleChangeType } onFindPetsClick={ this.handleFindPetsClick } />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={ this.state.pets } onAdoptPet={ this.handleAdoptPet } />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App