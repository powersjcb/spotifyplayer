import React from 'react'

const Song = ({title, url}) => {

}

class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: []
    }
  }

  render() {
    return (
      <ul>
        <li></li>
      </ul>
    )
  }
}

export default Playlist