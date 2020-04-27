import React from 'react'

class Pet extends React.Component {
  constructor(props){
    super()
    this.state = {
      isAdopted: props.pet.isAdopted
    }
  }
  
  adoptPet = () => {
    this.props.onAdoptPet(this.props.id)
    this.setState({isAdopted: true})
  }
  
  
  render() {
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {this.props.pet.gender === "female" ? '♀' : '♂'}
            {this.props.pet.name}
          </a>
          <div className="meta">
          <span className="date">{this.props.pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {this.props.pet.age}</p>
            <p>Weight: {this.props.pet.weight}</p>
          </div>
        </div>
        <div className="extra content">
          {this.state.isAdopted ?
          <button className="ui disabled button">Already adopted</button> :
          <button onClick={() => this.props.onAdoptPet(this.props.pet.id)}className="ui primary button">Adopt pet</button>
  }
        </div>
      </div>
    )
  }
}

export default Pet
