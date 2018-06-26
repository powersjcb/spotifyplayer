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
    this.state = {
      // hardcode this value for development
      bearer_token: 'BQCJe1OkBvSpRUgpSquo_GTG2qrZueJ_Iue7ds6K7DmpXN805vy0uh8pFc1cAxhbRBbfYb5glauqQB-_QRT1EOAE8QqqXaiOHN3F06RBqw3uAaR8DtycRt72HHRgqovHsSlp6SiblCCOczkInYWOwIBcW5ihlDGHpqY',
      search: 'haydn', // added by search container
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
