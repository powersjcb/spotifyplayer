import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {query: ''}
  }
  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          this.props.addSearchQuery(this.state.query)
          this.setState({query: ''})
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            this.setState({query: e.target.value})
          }}
        />
      </form>
    )
  }
}

export default Search