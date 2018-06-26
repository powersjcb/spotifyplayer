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
      bearer_token: 'BQCrBSt-0k-9PQzthvmxl7jBHNQd91UdMhjSxLffXsyUZw7991lHvt0dVFW2Kw_xk5KDGh6pxCyGyRza6T5qz9RJSaJs1Dm5QSm-GRZSpOTZMizUDQSYvI-f2C4yExhk6S669m3BvLsLmStICuE-4CrCjVlgDOdza7g',
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
          handleFinished={() => this.setState({search: ''})}
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
