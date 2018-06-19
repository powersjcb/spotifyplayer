import React from 'react'

class AuthenticationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      client_id: '',
      client_secret: '',
    }
  }

  render() {
    return (
      <form onSubmit={() => {
        this.props.submitForm(
          this.state.client_id,
          this.state.client_secret,
        )
      }}>
        <label>
          client_id
          <input
            type="text"
            onChange={e => this.setState({client_id: e.target.value})}
          />
        </label>
        <label>
          client_secret
          <input
            type="password"
            onChange={e => this.setState({client_secret: e.target.value})}
          />
        </label>
      </form>
    )
  }
}

export default AuthenticationForm