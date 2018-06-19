import React, { Component } from 'react'
import './App.css'
import Authenticate from './containers/Authenticate/index'
import Search from './containers/Search/index'
import Playlist from './containers/Playlist/index'


// take bearer_token from user
// splash screen
// playlist

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      // hardcode this value for development
      bearer_token: 'BQDgVuBhZq3YE_6ipJR2W7AYYkXedyHW9kkS0eKQlJBcZ2DuagCmZEPhRSjp7ReUdtCZxccuaTf-xDbv85KDPTJjqe9f4Zcr-PJqqUWgnTH8GVdyxNptOVopDqRKuTg13efRjUVL26rhVZl3uqwUpZJjSLgkvKkLkYs',
      search: '', // added by search container
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
        <Playlist
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
