import React from 'react';
import classes from './Form.module.css';

const Form = props => {
 
    return (
        <form className={classes.Form} onSubmit={props.setWeatherData}>
            <input type="text" name='city' placeholder='Город' list='cities'/>            
            <button>Получить погоду</button>

            <datalist id='cities'>
                <option value='Moscow'></option>
                <option value='Samara'></option>
                <option value='London'></option>
                <option value='New York'></option>
                <option value='San Francisco'></option>
                <option value='Sydney'></option>
                <option value='Tokyo'></option>
            </datalist>
        </form>
    )
}
 

export default Form;