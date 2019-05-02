import React from 'react';
import logo from './logo.svg';
import './App.css';
import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY="b36cf8d79435bec604455c1d7ab75df5";

class App extends React.Component {

  state={
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e)=>{
    e.preventDefault();
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;

    const api_call=await fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+',&appid='+API_KEY+'&units=metric');

    const data=await api_call.json();
    console.log(data);

    if(city && country){
      this.setState({
        temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: "",
      })
    }else{
      this.setState({
        temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: "Please enter value",
      })
    }

  }

  render(){
    return (
      <div >
        <Title/>
        <Form getWeather={this.getWeather} /> 
        <Weather 
        temperature={this.state.temperature}
        city={this.state.city}
        country= {this.state.country}
        humidity= {this.state.humidity}
        description= {this.state.description}
        error={this.state.error}
         />
      </div>
    )
  }

  
}

export default App;
