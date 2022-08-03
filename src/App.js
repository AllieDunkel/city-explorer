import './App.css';
import axios from "axios";
import React from "react";
import Card from 'react-bootstrap/Card';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      cityData: {},
      lat: '',
      lon: '',
    };
  }

  handleCityInput = (event) => {
    this.setState({
      city:event.target.value,
    })
  };
  
//add getLocationData
  submitCityHandler = async (event) => {
    event.preventDefault();
    //make a request to my API

    //add locIq and fill it with my info
    let URL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.city}&format=json`;
    //now lets save city results
     let cityInfo = await axios.get(URL);
     this.setState({
      cityData:cityInfo.data[0],
     })
     //dont forget to add data
     console.log("City Info: ", cityInfo.data[0]);
     
};

render(){
return(
  <>
  <header>
    <h3>Explore Locations</h3>
    </header>
  <main>
<form onSubmit={this.submitCityHandler}>
  <label>Pick a City:
    <input type="text" onChange={this.handleCityInput} />
  </label>
  <button type="submit">Explore!</button>
</form>

<Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={this.state.mapURL} />
      <Card.Body>
        <Card.Title>{this.state.cityData.display_name}</Card.Title>
        <Card.Text>{this.state.cityData.lat}, {this.state.cityData.lon}</Card.Text>
      </Card.Body>
    </Card>
    </main>
    <footer>2022, Allie Dunkel</footer>
</>
)
};  
} 
export default App;


