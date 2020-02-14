import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  onChangeType = event => {
    this.setState({
      filters: {
        type: event.target.value
      }
    });
  };

  onFindPetsClick = event => {
    let type = this.state.filters.type;
    this.setState({
      pets: []
    });
    if (type === "all") {
      fetch("/api/pets")
        .then(r => r.json())
        .then(json => {
          json.map(data =>
            this.setState({
              pets: [
                ...this.state.pets,
                {
                  id: data.id,
                  type: data.type,
                  gender: data.gender,
                  age: data.age,
                  weight: data.weight,
                  name: data.name,
                  isAdopted: data.isAdopted
                }
              ]
            })
          );
        });
    } else {
      fetch("/api/pets?type=" + type)
        .then(r => r.json())
        .then(json => {
          json.map(data =>
            this.setState({
              pets: [
                ...this.state.pets,
                {
                  id: data.id,
                  type: data.type,
                  gender: data.gender,
                  age: data.age,
                  weight: data.weight,
                  name: data.name,
                  isAdopted: data.isAdopted
                }
              ]
            })
          );
        });
    }
  };

  onAdoptPet = petId => {
    let pets = this.state.pets;
    let pet = pets.find(id => petId);
    pet.isAdopted = true;

    this.setState({
      pets: pets
    });
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
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
