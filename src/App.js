import React from 'react';
import './App.css';
import Info from "./components/Info";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Error from './components/Error';

const API_KEY = '74dc053fe8d480bd7da8597c42f677db';

class App extends React.Component {

   state = {
      city: undefined,
      temp: undefined,      
      country: undefined,
      pressure: undefined,
      sunrise: undefined,
      sunset: undefined,
      weather: undefined,
      weatherIcon: undefined,
      error: false
   }   

  componentDidMount() {
     this.setWeatherData()
   //   this.sayHi()
  }

   // sayHi = (e) => {

   //    if ( this.state.city === undefined && e === undefined ) {
   //       this.setState({
   //          city: 'Moscow'
   //       })
   //    } else {
   //       e.preventDefault()
   //       this.setState({
   //          city: 'London',
   //          temp: 23,         
   //          country: 'RU',
   //          pressure: '765 мм. рт. ст.',
   //          sunrise: '03:56',
   //          sunset: '20:56',
   //          weather: 'clear',
   //          error: true
   //       });  
   //    }
   // }

   setWeatherData = (e) => {
      let city;
      if (e === undefined ) {
         city = 'Moscow'        
      } else {
         e.preventDefault(); 
         city = e.target.elements.city.value;   
         e.target.elements.city.value = '';                
      }
            
      this.getURL(`https://ru.api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then(data => this.setData(data))
      .catch(this.error);
   }

   error = () => {
      this.setState({
         error: true
      })
   }
  
   getURL = async (url) => {
      const res = await fetch(url);
      if(!res.ok) {
         throw new Error(`Could not fetch ${url}, received ${res.status}`)
      };
      return res.json();
   }

   addZerroToNumber = (num) => {
      if (num < 10) {
         return `0${num}`
      } return num;
   } 
   

   setData = (data) => {
      const
         temperature = `${(data.main.temp - 273.15).toFixed()}`,
         pressure = `${(data.main.pressure / 1.33322).toFixed()} мм рт. ст.`,
         sunrise = data.sys.sunrise,
         sunset = data.sys.sunset,
         dateSunrise = new Date(sunrise * 1000 + data.timezone * 1000),
         dateSunset = new Date(sunset * 1000 + data.timezone * 1000),
         sunriseDate = `${this.addZerroToNumber(dateSunrise.getUTCHours())}: ${this.addZerroToNumber(dateSunrise.getUTCMinutes())}`,
         sunsetDate = `${this.addZerroToNumber(dateSunset.getUTCHours())}: ${this.addZerroToNumber(dateSunset.getUTCMinutes())}`,
         weather = data.weather[0].description;    

      this.setState({
         temp: temperature,
         city: data.name,
         country: data.sys.country,
         pressure: pressure,
         sunrise: sunriseDate,
         sunset: sunsetDate,
         weather: weather,
         weatherIcon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
         error: false
      });        
   }


   render() {
      let weather;
      if ( !this.state.error ) {
         weather = <Weather 
                  city={this.state.city}  
                  temp={this.state.temp}
                  country={this.state.country}
                  pressure={this.state.pressure}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                  weather={this.state.weather}
                  weatherIcon={this.state.weatherIcon}
                  error={this.state.error}
               />
      } else {
         weather = <Error /> 
      };        

      return (
         <div className='App'> 
            <Info />
            <Form setWeatherData={this.setWeatherData} />     
            {weather}     
         </div>
      )
   }
}


export default App;