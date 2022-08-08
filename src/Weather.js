import React from 'react';
import DailyWeather from './DailyWeather.js';

class Weather extends React.Component {

  render(){
    return(
      <>
      <h3>Weather: </h3>
      {
        this.props.weather.map((day, index) =>
        (
          <DailyWeather key={index} day={day}/>
          
        ))
      }
      </>
    )
  }
}

export default Weather;