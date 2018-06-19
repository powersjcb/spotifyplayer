import React from 'react'
import AuthenticationForm from '../../components/AuthenticationForm/index'

const Authenticate = ({clientAuthenticated}) => (
  <div>
    <AuthenticationForm
      submitForm={(bearer_token) => {
        clientAuthenticated(bearer_token)
      }}
    />
  </div>
)

export default Authenticate
