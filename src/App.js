import React, { Component } from 'react'
import Authenticate from './containers/Authenticate/index'
import Search from './containers/Search/index'
import PlayerContainer from './containers/Player/index'

// take bearer_token from user
// splash screen
// playlist

class App extends Component {
  constructor(props){
    super(props)
    let bearer_token = ''
    if (window) {
        bearer_token = window.sessionStorage.getItem('bearer_token')
    }
    this.state = {
      search: 'haydn',
      bearer_token,
    }
  }

  render() {
    if (!this.state.bearer_token) {
      return (
        <Authenticate
          clientAuthenticated={(bearer_token) => {
            if (window) {
              window.sessionStorage.setItem('bearer_token', bearer_token)
            }
            this.setState({bearer_token})
          }}
        />
      )
    }

    if (this.state.search) {
      return (
        <PlayerContainer
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
