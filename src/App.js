import React, { Component } from 'react'
import Authenticate from './containers/Authenticate/index'
import Search from './containers/Search/index'
import Player from './containers/Player/index'

// take bearer_token from user
// splash screen
// playlist

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      // hardcode this value for development
      bearer_token: 'BQCLYU3RuC9roT0o7J-b8iaZ_X58ge5lFB2YJ03C9b9hcRAF5vJkRuqCCvt9EKyldgoEWh0P7ZjWArm2o4by22v-uDH6W3lORJQa3fihehhzg9F3ncxQW3sHgKAZ15iKAkAVi4MYWhrGgd3A18cXKpXF4gx1hmDnRqE',
      search: 'bach', // added by search container
    }
  }

  render() {
    if (!this.state.bearer_token) {
      return (
        <Authenticate
          clientAuthenticated={(bearer_token) => {
            this.setState({bearer_token})
          }}
        />
      )
    }

    if (this.state.search) {
      return (
        <Player
          search={this.state.search}
          bearer_token={this.state.bearer_token}
        />
      )
    }
    return (
      <Search
        addSearchQuery={(search) => {
          this.setState({search})
        }}
      />
    )
  }
}

export default App
