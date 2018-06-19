import React, { Component } from 'react'
import './App.css'


// login screen -> client_id, client_secret
// splash screen
// playlist

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      client_id: '',
      bearer_token: '',
    }
  }

  render() {
    return (
        <div>
          client_id: {this.state.client_id}
          <br/>
          bearer_token: {this.state.bearer_token}
        </div>
    )
  }
}

export default App
