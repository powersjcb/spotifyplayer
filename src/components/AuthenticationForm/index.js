import React from 'react'

class AuthenticationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      access_token: '',
    }
  }

  render() {
    return (
      <form onSubmit={(e) => {
        e.preventDefault()
        this.props.submitForm(
          this.state.access_token,
        )
      }}>
        <p>
          Using the Spotify developer console, request an authorization token
          <br/>
          <a href="https://developer.spotify.com/console/get-search-item">Get Token</a>
        </p>
        <label>
          oauth token
          <input
            type="text"
            onChange={e => this.setState({access_token: e.target.value})}
          />
        </label>
      </form>
    )
  }
}

export default AuthenticationForm