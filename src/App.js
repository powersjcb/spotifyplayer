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
      bearer_token: 'BQCsDOKnnx-AWAmXr4osHhiAs5Rj5a3bFilGQWU2OoQcHgClUymA2upbQFdPqgF5PzUfEF2dZvXcDa8FQcRWet1tJe_x5ZB_0vA0wedJnR5HMlZN8ypTi0FPcXU8WuC1tRnDFTYYuYgizEollf64UGidDAlkNrd6tJs',
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
