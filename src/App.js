import "./App.css";
import axios from "axios";
import React from "react";
import Card from "react-bootstrap/Card";
import Weather from "./Weather.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      lat: "",
      lon: "",
      mapImage: "",
      displayError: false,
      errorMessage: "",
      weather: [],
    };
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  //add getLocationData
  submitCityHandler = async (event) => {
    event.preventDefault();
    //make a request to my API
    try {
      let URL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.city}&format=json`;
      //now lets save city results
      let cityInfo = await axios.get(URL);
      let lat = cityInfo.data[0].lat;
      let lon = cityInfo.data[0].lon;
      let mapImage = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${cityInfo.data[0].lat},${cityInfo.data[0].lon}&zoom=13&size=1000x1000`;
      this.setState({
        cityData: cityInfo.data[0],
        latitude: lat,
        longitude: lon,
        mapImage: mapImage,
        displayError: false,
      });
      this.displayWeather(lat, lon);
    } catch (error) {
      console.log("Error", error.message);
      this.state({
        displayError: true,
        errorMessage: `An error occurred: ${error.response.status}`,
      });
    }
  };
  displayWeather = async (lat, lon) => {
    try {
      console.log("lat and lon: ", lat, lon);
      const weather = await axios.get(
        `${process.env.REACT_APP_SERVER}/weather`,
        {
          params: {
            lat: lat,
            lon: lon,
            searchQuery: this.state.city,
          },
        }
      );
      this.setState({
        weather: weather.data,
      });
    } catch (error) {
      this.setState({
        map: false,
        errorMessage: `An error has occured: ${error.response.status}`,
      });
    }
  };

  render() {
    console.log("City error: ", this.state.errorMessage);

    return (
      <>
        <header>
          <h3>Explore Locations</h3>
        </header>
        <form onSubmit={this.submitCityHandler}>
          <label>
            Pick a City:
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Explore!</button>
        </form>

        {this.state.error ? (
          <p>{this.state.errorMessage}</p>
        ) : (
          <>
            <Card className="card" style={{ width: "18rem" }}>
              <Card.Img
                className="cardImage"
                variant="top"
                src={this.state.mapImage}
              />
              <Card.Body>
                <Card.Title>{this.state.cityData.display_name}</Card.Title>
                <Card.Text>
                  {this.state.cityData.lat}, {this.state.cityData.lon}
                </Card.Text>
              </Card.Body>
            </Card>
            <footer>2022, Allie Dunkel</footer>
          </>
        )}
      </>
    );
  }
}
export default App;
