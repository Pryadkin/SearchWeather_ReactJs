import React from 'react';
import classes from './Weather.module.css';


const Weather = props => {
    return(
        <div className={classes.Weather}>  
            <div className={classes.city} >
                <h1>{props.city}</h1>
                <img src={props.weatherIcon} alt='weather icon' title={props.weather}></img>
            </div>               
            <hr />
            <div className={classes.dataWeather}>            
                <p>Местоположение: <span>{props.country}</span></p>
                <p>Температура: <span>{props.temp}&deg;</span></p>
                <p>Давление: <span>{props.pressure}</span></p>
                <p>Восход солнца: <span>{props.sunrise}</span></p>
                <p>Заход солнца: <span>{props.sunset}</span></p>                
            </div>        
        </div>
    )
}


export default Weather;