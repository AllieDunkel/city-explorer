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
      mapImage: '',
      error:false,
      errorMessage: ''
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
     let lat = cityInfo.data[0].lat > 0 ? `${cityInfo.data[0].lat}° N`:`${Math.abs(cityInfo.data[0].lat)}° S`;
     let lon = cityInfo.data[0].lon > 0 ? `${cityInfo.data[0].lon}° E`:`${Math.abs(cityInfo.data[0].lon)}° W`;
     let mapImage = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${cityInfo.data[0].lat},${cityInfo.data[0].lon}&zoom=13&size=1000x1000`

     this.setState({
      cityData:cityInfo.data[0],
      latitude: lat,
      longitude: lon,
      mapImage: mapImage,
      error:false,

      catch (error) {
        console.log("error", error);
        console.log("error.message", error.message);
        this.state({
          error:true,
          errorMessage: `An error occurred: ${error.response.status}`,
        })
      }
      
     })
     //dont forget to add data
     console.log("City Info: ", cityInfo.data[0]);
     
};

render() {
  console.log("City error: ", this.state.errorMessage);

return(
  <>
    <header>
    <h3>Explore Locations</h3>
  </header>
  <form onSubmit={this.submitCityHandler}>
      <label>Pick a City:
        <input type="text" onChange={this.handleCityInput} />
      </label>
      <button type="submit">Explore!</button>
    </form>

       {this.state.error ? (
       <p>{this.state.errorMessage}</p>
     ) : (
      // <p>{this.state.cityData}</p>
      <>
          {/* // <p>{this.state.cityData}</p> */}
          <Card className="card" style={{ width: '18rem' }}>
            <Card.Img className="cardImage" variant="top" src={this.state.mapImage} />
            <Card.Body>
              <Card.Title>{this.state.cityData.display_name}</Card.Title>
              <Card.Text>{this.state.cityData.lat}, {this.state.cityData.lon}</Card.Text>
            </Card.Body>
          </Card><footer>2022, Allie Dunkel</footer></>
      
    )}

   

    </>

)
};  
} 
export default App;


