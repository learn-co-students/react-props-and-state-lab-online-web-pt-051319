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

  fetchPets = () => {
    let url = '/api/pets';
    //checks input of scroll and concats to end of default all pets url with exact route descriped in fetch-setup
    if (this.state.filters.type !== 'all') {
      url += `?type=${this.state.filters.type}`;
    }
    //passes in onchangetype url to regular fetch command
    fetch(url)
    .then(response => response.json())
    .then(pets => this.setState({pets: pets}));
  };

  onChangeType = ({ target: { value } }) => {
      //somehow when the user picks type of pet, get the changes value? and set state to the value chosen?
      this.setState({filters: { ...this.state.filters, type: value }});
      // console.log({filters: {...this.state.filters, type: value}})
      // console.log({target: {value}})
  };

  onAdoptPet = petId => {
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets: pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
              pets={this.state.pets} 
              onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
