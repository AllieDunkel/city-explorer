import './App.css';
import axios from "axios";
import React from "react";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: "",
      cityData: {}
    };
  }
  
//add getLocationData
  submitCityHandler = async (event) => {
    event.preventDefault();
    //make a request to my API

    //add locIq and fill it with my info
    let URL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.city}&format=json`;
    //now lets save city results
     let cityInfo = await axios.get(URL);
     //dont forget to add data
     console.log("City Info: ", cityInfo.data[0]);
     
};

handleCityInput = (event) => {
  this.setState({
    city:event.target.value,
  })
};

render(){

return(
  <>
<form onSubmit={this.submitCityHandler}>
  <label>Pick a City:
    <input type="text" onChange={this.handleCityInput} />
  </label>
  <button type="submit">Explore!</button>
</form>
</>
)
};  
} 
export default App;


