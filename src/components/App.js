import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();
    //initial state defined
    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }
  //callback
  //callback will be passed to <Filters />
  //this callback needs to update <App />'s state.filters.type
  //this is used so the user can change the Animal type in the drop down menu
  //to specify the type of animal they want to adopt
  onChangeType = newType => {
    this.setState({
      filters: { type: newType }
    });
  };

  //this is a callback
  //When <Filters /> call, this function (ie. as a callback prop), <App/> will return
  //a list of pets
  //if type is 'all' send request to /api/pets
  //if the type is 'cat' send a request to /api/pets?type=cat
  //use state filters (state.filters.type) to control and update the parameter
  //the if statements are the optional parameters used to grab the data.
  //set state.pets with the results of your fetch request, so you can pass
  //the pet data down as props to <PetBrowser/>
  onFindPetsClick = () => {
    if (this.state.filters.type === "all") {
      fetch("/api/pets")
        .then(resp => resp.json())
        .then(results => {
          this.setState({
            pets: results
          });
        });
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(resp => resp.json())
        .then(results => {
          this.setState({
            pets: results
          });
        });
    }
  };

  //This is a callback that will be used as prop for <PetBrowser />
  //it should take in an id for a pet,find the matching pet in
  //state.pets and set the isAdopted property to true
  onAdoptPet = petId => {
    this.state.pets.find(pet => pet.id === petId).isAdopted = true;
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
                //this is a callback prop passed to Filters from App, to update state.filters.type
                onChangeType={this.onChangeType}
                //this is a callback prop passed from App to Filters, to get a list of pets fetched
                //when onFindPetsClick is called on by Filters
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>

            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
//the onAdoptPet callback prop is passed to <PetBrowser /> from App
//this callback tracks down pets available for adoption by id.
