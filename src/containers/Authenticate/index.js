import React from 'react'
import AuthenticationForm from '../../components/AuthenticationForm/index'


class Authenticate extends React.Component {

  render() {
    return (
      <div>
        <AuthenticationForm
          submitForm={(client_id, client_secret) => {

          }}
        />
      </div>
    )
  }
}