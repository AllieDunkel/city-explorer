
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
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;
     const res = await axios.get(API);
     console.log(res.data[0])
     this.setState({cityData:res.data[0]});

    //make a request to the API
    //add onput to input, go down and add the onchange


  
  //add the location IQ and fill it with our information
  let URL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.city}&format=json`;
  //  now lets save city results
  let cityInfo = await axios(URL);
  //add data
  console.log("City Info: ", cityInfo.data[0]);
};
render(){

return(
<form onSubmit={this.submitCityHandler}>
  <label>Pick a City:
    <input type="text" onChange={this.handleCityInput} />
  </label>
  <button type="submit">Explore</button>
</form>
)
};  
} 
export default App;
