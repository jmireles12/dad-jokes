import './App.css';
import axios from "axios";
import React, { Component } from 'react';
import ApiContext from './ApiContext';
import config from './config';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {

  state = {
    body: {},
    image: '',
    setup: '',
    punchline: ''
  }

  render() {

    const getJoke = () => {
      axios.get(`${config.API_JOKES}`, { 'headers': { 'x-rapidapi-host': `${config.API_ENDPOINT}`, 'x-rapidapi-key': `${config.API_KEY}`}})
        .then(res => {
          console.log(res.data)
          this.setState({
            body: res.data.body
          });
          console.log(this.state.body)
      }
        )}

    const value = {
      image: this.state.body.image,
      setup: this.state.body.setup,
      punchline: this.state.body.punchline
    }
      return (
        <ApiContext.Provider value={value}>
          <Card className='text-center' bg='dark' text='light'>
            <Card.Body>
              <Card.Title>
                {value.setup}
              </Card.Title>
              <Card.Title>{value.punchline}</Card.Title>
              <Button className='text-center' variant="primary" onClick={getJoke}>Get Joke</Button>
            </Card.Body>
          </Card>
        </ApiContext.Provider>
    );
  }
}
