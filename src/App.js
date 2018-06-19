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
      bearer_token: 'BQDSZr_4bRFYFIn-Gg9L0wADL793QnPWNc5EOrq6fb1pXBO0pP961G3gsvI8gcl9AG4nJJ9NXV96OUqByUsyhTLBlgmAyJNOHr1vFrmOXy1iavv6vSnuXFh80DO_uj6vPB5OEiiSgZcuRtZ58JI8OvbVSGiZbVTPXK4',
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
